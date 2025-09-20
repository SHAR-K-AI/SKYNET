"use client";

import { motion } from "framer-motion";
import { useRef, useState, ReactNode, useEffect, MouseEvent, TouchEvent } from "react";

interface FramerProps {
    children: ReactNode;
}

export default function Magnetic({ children }: FramerProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const strength = 0.25;

    const updatePos = (clientX: number, clientY: number) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const mx = clientX - (rect.left + rect.width / 2);
        const my = clientY - (rect.top + rect.height / 2);
        setPos({ x: mx * strength, y: my * strength });
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => updatePos(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0) {
            updatePos(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const resetPos = () => setPos({ x: 0, y: 0 });

    useEffect(() => {
        const handleOutsideClick = (e: Event) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                resetPos();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(() => resetPos());
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            onMouseUp={resetPos}
            onTouchEnd={resetPos}
            className="inline-flex"
            onMouseLeave={resetPos}
            onTouchCancel={resetPos}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ position: "relative" }}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {children}
        </motion.div>
    );
}
