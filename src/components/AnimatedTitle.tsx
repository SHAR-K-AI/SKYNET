'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTitle() {
    const [hovered, setHovered] = useState(false);

    // Google кольори
    const colors = ['text-blue-500', 'text-red-500', 'text-yellow-400', 'text-blue-500', 'text-green-500', 'text-red-500'];

    // Текст до hover: "Google"
    const googleText = 'Google'.split('');

    // Текст після hover: "SkyNet 😎"
    const hoverText = 'SkyNet'.split('');

    // Вибираємо текст відповідно до hover
    const letters = hovered ? hoverText : googleText;

    return (
        <h1
            className="text-6xl md:text-8xl font-extrabold text-center mt-12 flex justify-center gap-1 cursor-pointer select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    className={colors[index % colors.length] + ' inline-block'}
                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        delay: index * 0.1,
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </h1>
    );
}
