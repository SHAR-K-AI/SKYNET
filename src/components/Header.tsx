'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useTranslations, useLocale } from 'next-intl';
import LocaleSwitcher from "@/components/LocaleSwitcher";

const menuItems = [
    'home', 'about', 'contact', 'questions',
    'cloud-map', 'links', 'arcade-calculator'
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Menu');

    const toggleMenu = () => setIsOpen(!isOpen);

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -50 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05, type: 'spring', stiffness: 100 },
        }),
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
    };

    return (
        <header className="w-full relative p-4 flex items-center z-50">
            <button
                className="flex flex-col justify-between w-6 h-6 mr-4 relative z-50"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <motion.span
                    className="block h-0.5 w-full bg-black dark:bg-white"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.span
                    className="block h-0.5 w-full bg-black dark:bg-white"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.span
                    className="block h-0.5 w-full bg-black dark:bg-white"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </button>

            <div className="flex-1 flex justify-center">
                <AnimatedTitle />
            </div>

            <div className="flex items-center md:flex-row flex-col gap-4 space-x-4 ml-4">
                <LocaleSwitcher />
                <ThemeToggleButton />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={toggleMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.nav
                            className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl z-50 p-6 flex flex-col justify-center"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', stiffness: 80 }}
                        >
                            <ul className="flex flex-col gap-6 text-2xl font-bold">
                                {menuItems.map((key, i) => {
                                    const letters = (t(key) || key.charAt(0).toUpperCase() + key.slice(1)).split('');
                                    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']; // Google Colors
                                    return (
                                        <motion.li
                                            key={key}
                                            custom={i}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <a
                                                href={`/${locale}/${key === 'home' ? '' : key}`}
                                                onClick={toggleMenu}
                                                className="inline-block transform transition-transform duration-300 hover:scale-110"
                                            >
                                                {letters.map((letter, idx) => (
                                                    <span
                                                        key={idx}
                                                        style={{ color: colors[idx % colors.length] }}
                                                        className="inline-block"
                                                    >
                                                        {letter}
                                                    </span>
                                                ))}
                                            </a>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
