'use client';

import { motion } from 'framer-motion';
import {useTheme} from "next-themes";

export default function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()
    const isLight = theme === 'light';

    const iconClass = isLight
        ? 'w-6 h-6 text-yellow-500'
        : 'w-6 h-6 text-gray-200 dark:text-gray-400';

    return (
        <motion.button
            onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg cursor-pointer hover:scale-110 transition-transform"
            whileTap={{ scale: 0.9 }}
            title="Перемкнути тему"
        >
            <motion.svg
                key={isLight ? 'sun' : 'moon'}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={iconClass}
                initial={{ rotate: isLight ? 0 : 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {isLight ? (
                    <>
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
                        <line x1="12" y1="20" x2="12" y2="23" stroke="currentColor" strokeWidth="2" />
                        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2" />
                        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" />
                        <line x1="1" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2" />
                        <line x1="20" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" />
                        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2" />
                        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" />
                    </>
                ) : (
                    <path
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                    />
                )}
            </motion.svg>
        </motion.button>
    );
}
