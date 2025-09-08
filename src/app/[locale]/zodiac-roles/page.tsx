'use client';

import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {useLocale, useTranslations} from "next-intl";

interface Role {
    id: number;
    name: string;
    category: string;
    description?: string;
    responsibilities?: string[];
    links?: {
        documentation: string;
        bestPractices: string;
        tutorials: string;
    };
    requirements: {
        services: string[];
        tools: string[];
        platforms: string[];
        languages: string[];
    };
}

export default function RolesConstellation() {
    const locale = useLocale();
    const t = useTranslations("RolePage");
    const canvasRef = useRef<HTMLDivElement>(null);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    useEffect(() => {
        fetch(`/api/roles?lang=${locale}`)
            .then(res => res.json())
            .then((data: Role[]) => setRoles(data))
            .catch(err => console.error(err));
    }, [locale]);

    const categoryColors: Record<string, number> = {
        Developer: 0x4285F4,
        Cloud: 0x34A853,
        Data: 0xFBBC05,
        Leadership: 0xEA4335,
        Admin: 0x4285F4,
        'AI/ML': 0xFBBC05,
        Security: 0xEA4335,
    };

    const categoryPositions: Record<string, THREE.Vector3> = {
        Developer: new THREE.Vector3(0, 0, 0),
        Cloud: new THREE.Vector3(70, 0, 0),
        Data: new THREE.Vector3(-70, 0, 0),
        Leadership: new THREE.Vector3(0, 70, 0),
        Admin: new THREE.Vector3(0, -70, 0),
        'AI/ML': new THREE.Vector3(70, 70, 0),
        Security: new THREE.Vector3(-70, -70, 0),
    };

    useEffect(() => {
        if (!canvasRef.current || roles.length === 0) return;
        const container = canvasRef.current;

        const scene = new THREE.Scene();
        scene.background = null;
        scene.fog = new THREE.FogExp2(0x000000, 0.002);

        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 120;

        const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 500);
        pointLight.position.set(0, 0, 150);
        scene.add(pointLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 50;
        controls.maxDistance = 300;
        controls.enableZoom = true;

        const interactiveObjects: THREE.Object3D[] = [];
        const originalColors = new Map<string, number>();
        const originalScales = new Map<string, THREE.Vector3>();
        const spheres: { [key: string]: THREE.Mesh[] } = {};

        roles.forEach((role) => {
            const basePos = categoryPositions[role.category] || new THREE.Vector3(0, 0, 0);
            let pos: THREE.Vector3;

            if (role.category === "Cloud") {
                const distance = 30 + Math.random() * 50;
                const angle1 = Math.random() * Math.PI * 2;
                const angle2 = Math.random() * Math.PI;
                pos = basePos.clone().add(new THREE.Vector3(
                    Math.sin(angle2) * Math.cos(angle1) * distance,
                    Math.sin(angle2) * Math.sin(angle1) * distance,
                    Math.cos(angle2) * distance
                ));
            } else {
                const radius = 50;
                pos = basePos.clone().add(new THREE.Vector3(
                    Math.random() * radius - radius / 2,
                    Math.random() * radius - radius / 2,
                    Math.random() * radius - radius / 2
                ));
            }

            const geometry = new THREE.SphereGeometry(1.5, 32, 32);
            const material = new THREE.MeshBasicMaterial({color: categoryColors[role.category] || 0x00ff00});
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.copy(pos);
            sphere.userData = {role, isSphere: true};
            scene.add(sphere);
            interactiveObjects.push(sphere);
            originalColors.set(sphere.uuid, material.color.getHex());
            originalScales.set(sphere.uuid, sphere.scale.clone());

            if (!spheres[role.category]) spheres[role.category] = [];
            spheres[role.category].push(sphere);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d')!;
            const fontSize = 32;
            context.font = `${fontSize}px Arial`;
            const textMetrics = context.measureText(role.name);
            canvas.width = textMetrics.width + 20;
            canvas.height = fontSize + 20;
            context.font = `${fontSize}px Arial`;
            context.fillStyle = 'rgba(0,0,0,0.6)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#ffffff';
            context.fillText(role.name, 10, fontSize + 5);
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({map: texture, transparent: true});
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(canvas.width / 10, canvas.height / 10, 1);
            sprite.position.copy(pos.clone().add(new THREE.Vector3(0, 3, 0)));
            sprite.userData = {role, isSprite: true};
            scene.add(sprite);
            interactiveObjects.push(sprite);
            originalScales.set(sprite.uuid, sprite.scale.clone());
        });

        Object.keys(spheres).forEach(category => {
            const spheresForCategory = spheres[category];
            if (spheresForCategory.length < 2) return;

            spheresForCategory.forEach((sphere, i) => {
                const connectedUUIDs = new Set<string>();
                for (let j = 0; j < spheresForCategory.length; j++) {
                    if (i === j) continue;
                    const otherSphere = spheresForCategory[j];
                    if (connectedUUIDs.has(otherSphere.uuid)) continue;

                    if (category === "Cloud" && connectedUUIDs.size >= 3) break;

                    const startPoint = sphere.position;
                    const endPoint = otherSphere.position;

                    const material = new THREE.LineBasicMaterial({
                        color: categoryColors[category],
                        opacity: 0.3,
                        transparent: true,
                    });
                    const geometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
                    const line = new THREE.Line(geometry, material);
                    scene.add(line);

                    connectedUUIDs.add(otherSphere.uuid);
                }
            });
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let intersectedObject: THREE.Object3D | null = null;

        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
            mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(interactiveObjects);

            if (intersects.length > 0) {
                document.body.style.cursor = 'pointer';
                const obj = intersects[0].object;
                if (intersectedObject !== obj) {
                    if (intersectedObject) {
                        const origColor = originalColors.get(intersectedObject.uuid);
                        if (origColor !== undefined && (intersectedObject as THREE.Mesh).material) {
                            ((intersectedObject as THREE.Mesh).material as THREE.MeshBasicMaterial).color.setHex(origColor);
                        }
                        const origScale = originalScales.get(intersectedObject.uuid);
                        if (origScale) intersectedObject.scale.copy(origScale);
                    }
                    intersectedObject = obj;
                    const material = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
                    if (material) material.color.setHex(0xffffff);
                    const origScale = originalScales.get(obj.uuid);
                    if (origScale) obj.scale.copy(origScale).multiplyScalar(1.5);
                }
            } else {
                document.body.style.cursor = 'auto';
                if (intersectedObject) {
                    const origColor = originalColors.get(intersectedObject.uuid);
                    if (origColor !== undefined && (intersectedObject as THREE.Mesh).material) {
                        ((intersectedObject as THREE.Mesh).material as THREE.MeshBasicMaterial).color.setHex(origColor);
                    }
                    const origScale = originalScales.get(intersectedObject.uuid);
                    if (origScale) intersectedObject.scale.copy(origScale);
                    intersectedObject = null;
                }
            }
        };

        const onClick = (event: MouseEvent) => {
            mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
            mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(interactiveObjects);
            if (intersects.length > 0) {
                const role = intersects[0].object.userData.role;
                if (role) setSelectedRole(role);
            } else {
                setSelectedRole(null);
            }
        };

        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('click', onClick);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            scene.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('click', onClick);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            scene.clear();
        };
    }, [roles]);

    return (
        <div className="relative w-full h-[430px] overflow-hidden">
            <div
                className="absolute bottom-2 left-2 text-xs text-gray-300 bg-gray-900/70 px-2 py-1 rounded-md pointer-events-none">
                {t("instruction")}
            </div>

            <div ref={canvasRef} className="absolute inset-0 w-full h-full"/>

            <div
                className={`
          absolute top-10 right-10 max-w-md p-4 text-white rounded-lg shadow-lg overflow-y-auto max-h-[400px]
          transition-all duration-500 ease-in-out 
          ${selectedRole
                    ? 'translate-x-0 opacity-100 pointer-events-auto bg-gray-900/80'
                    : 'translate-x-[100%] opacity-0 pointer-events-none bg-gray-900/0'}
        `}
            >
                {selectedRole && (
                    <>
                        <h2 className="text-xl font-bold">{selectedRole.name}</h2>
                        <p className="mt-1 text-sm text-gray-400">
                            {t("category")}: {selectedRole.category}
                        </p>

                        {selectedRole.description && (
                            <p className="mt-3 text-sm text-gray-200">{selectedRole.description}</p>
                        )}

                        <div className="mt-4">
                            <h3 className="font-semibold">{t("requirements")}:</h3>
                            <ul className="list-disc list-inside text-sm mt-1 text-gray-300 space-y-1">
                                <li>{t("services")}: {selectedRole.requirements.services.join(', ')}</li>
                                <li>{t("tools")}: {selectedRole.requirements.tools.join(', ')}</li>
                                <li>{t("platforms")}: {selectedRole.requirements.platforms.join(', ')}</li>
                                <li>{t("languages")}: {selectedRole.requirements.languages.length > 0 ? selectedRole.requirements.languages.join(', ') : t("none")}</li>
                            </ul>
                        </div>

                        {selectedRole.responsibilities && selectedRole.responsibilities.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold">{t("responsibilities")}:</h3>
                                <ul className="list-disc list-inside text-sm mt-1 text-gray-300 space-y-1">
                                    {selectedRole.responsibilities.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedRole.links && (
                            <div className="mt-4">
                                <h3 className="font-semibold">{t("links")}:</h3>
                                <ul className="list-disc list-inside text-sm mt-1 text-blue-400 space-y-1">
                                    <li><a href={selectedRole.links.documentation} target="_blank"
                                           rel="noopener noreferrer">{t("documentation")}</a></li>
                                    <li><a href={selectedRole.links.bestPractices} target="_blank"
                                           rel="noopener noreferrer">{t("bestPractices")}</a></li>
                                    <li><a href={selectedRole.links.tutorials} target="_blank"
                                           rel="noopener noreferrer">{t("tutorials")}</a></li>
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
