"use client";
import {useRef, useState, ReactNode, MouseEvent} from "react";
import {motion} from "framer-motion";

interface FramerProps {
    children: ReactNode;
}

export default function Magnetic({children}: FramerProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState({x: 0, y: 0});

    const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        const strength = 0.25;
        setPos({x: mx * strength, y: my * strength});
    };

    return (
        <motion.div
            ref={ref}
            className="inline-flex"
            onMouseMove={handleMouse}
            animate={{x: pos.x, y: pos.y}}
            style={{position: 'relative'}}
            onMouseLeave={() => setPos({x: 0, y: 0})}
            transition={{type: 'spring', stiffness: 200, damping: 20}}
        >
            {children}
        </motion.div>
    );
}
