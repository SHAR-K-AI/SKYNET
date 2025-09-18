"use client";

import { motion } from "framer-motion";
import { useRef, useState, ReactNode, useEffect } from "react";

interface MagneticProps {
    children: ReactNode;
}

export default function Magnetic({ children }: MagneticProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const strength = 0.25;

    const resetPos = () => setPos({ x: 0, y: 0 });

    const updatePos = (clientX: number, clientY: number) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({
            x: (clientX - (rect.left + rect.width / 2)) * strength,
            y: (clientY - (rect.top + rect.height / 2)) * strength,
        });
    };

    const handleMove = (clientX: number, clientY: number) => updatePos(clientX, clientY);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) resetPos();
        };

        document.addEventListener("pointerdown", handlePointerMove, true);
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerMove);

        return () => {
            document.removeEventListener("pointerdown", handlePointerMove, true);
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerMove);
        };
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new ResizeObserver(resetPos);
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            className="inline-flex relative"
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={resetPos}
            onTouchCancel={resetPos}
        >
            {children}
        </motion.div>
    );
}
