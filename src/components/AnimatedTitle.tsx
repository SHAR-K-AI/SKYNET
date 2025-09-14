'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import SoundWrapper from "@/components/SoundWrapper";

export default function AnimatedTitle() {
    const [hovered, setHovered] = useState(false);

    const colors = [
        'text-blue-500',
        'text-red-500',
        'text-yellow-400',
        'text-blue-500',
        'text-green-500',
        'text-red-500'
    ];

    const googleText = '️☁️☁️☁️'.split('');
    const hoverText = 'SkyNet'.split('');
    const letters = hovered ? googleText  : hoverText;

    return (
        <SoundWrapper playOn="hover">
            <h1
                className="text-6xl md:text-8xl font-extrabold text-center mt-12 flex justify-center gap-1 cursor-pointer select-none"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        className={colors[index % colors.length] + ' inline-block'}
                        animate={{y: [0, -10, 0], rotate: [0, 5, -5, 0]}}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 1,
                            delay: index * 0.1,
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </h1>
        </SoundWrapper>
    );
}
