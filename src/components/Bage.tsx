import {useState} from "react";
import AppImage from "@/components/Image";
import FullscreenImage from "@/components/FullscreenImage";

interface BadgeProps {
    role: string;
    imageSrc?: string;
    size?: string;
}

const stars = [
    {size: "w-2 h-2", opacity: "opacity-70", anim: "animate-[starRotate_4s_linear_infinite]", pos: "top-5 left-10"},
    {size: "w-2 h-2", opacity: "opacity-70", anim: "animate-[starRotate_5s_linear_infinite]", pos: "bottom-5 right-10"},
    {
        size: "w-1.5 h-1.5",
        opacity: "opacity-60",
        anim: "animate-[starRotate_6s_linear_infinite]",
        pos: "top-10 right-20"
    },
    {
        size: "w-1.5 h-1.5",
        opacity: "opacity-50",
        anim: "animate-[starRotate_7s_linear_infinite]",
        pos: "bottom-15 left-15"
    },
];

const Badge = ({role, imageSrc, size = "w-56 h-56"}: BadgeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const id = `circlePath-${role.replace(/\s+/g, "-")}`;

    return (
        <>
            <div
                className="relative inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400">
                <div
                    className={`relative ${size} rounded-full bg-gray-100 dark:bg-gray-800 shadow-2xl flex items-center justify-center overflow-hidden transform transition hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.7)] cursor-pointer`}
                    onClick={() => setIsOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (["Enter", " "].includes(e.key) ? setIsOpen(true) : null)}
                >
                    <div
                        className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 via-transparent to-transparent z-0"/>

                    <AppImage
                        src={imageSrc}
                        alt={role}
                        fill
                        sizes="(max-width: 768px) 100vw, 224px"
                        className="object-cover absolute inset-0 z-10"
                        draggable={false}
                    />

                    <svg className="absolute w-full h-full z-30" viewBox="0 0 100 100" aria-hidden>
                        <defs>
                            <path id={id} d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                        </defs>
                        <text fill="white" fontSize="10" fontWeight="bold">
                            <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                                {role}
                            </textPath>
                        </text>
                    </svg>

                    {stars.map((s, i) => (
                        <div
                            key={i}
                            className={`absolute ${s.size} bg-white rounded-full ${s.opacity} ${s.anim} ${s.pos} z-10`}
                        />
                    ))}

                    <style jsx>{`
                        @keyframes starRotate {
                            0% {
                                transform: rotate(0deg) translateX(20px) rotate(0deg);
                            }
                            100% {
                                transform: rotate(360deg) translateX(20px) rotate(-360deg);
                            }
                        }
                    `}</style>
                </div>
            </div>

            {isOpen && (
                <FullscreenImage
                    alt={role}
                    role={role}
                    src={imageSrc || "/images/placeholder.png"}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Badge;
