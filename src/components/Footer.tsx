'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import AppImage from "@/components/Image";

const DinoGameNoSSR = dynamic(() => import('react-chrome-dino-ts'), { ssr: false });

interface Heart {
    id: string;
    x: number;
}

export default function DinoGameFooter() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();
    const [hearts, setHearts] = useState<Heart[]>([]);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        if (isVideoOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isVideoOpen]);

    const createHearts = (count = 5) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const id = Math.random().toString(36).slice(2, 11);
                setHearts(prev => [...prev, { id, x: Math.random() * 250 - 25 }]);
                setTimeout(() => {
                    setHearts(prev => prev.filter(h => h.id !== id));
                }, 1500);
            }, i * 500);
        }
    };

    return (
        <footer>
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative mx-auto z-20 -mb-3.5">
                <DinoGameNoSSR />
            </div>

            <div className="w-full py-8 footer-pixel-light z-10 relative">
                <AppImage
                    alt="ILG"
                    width={250}
                    src="/images/footer-img.png"
                    className="object-cover rounded-lg absolute md:-top-25 hidden md:block md:left-30 opacity-85 cursor-pointer hover:scale-110 hover:animate-bounce"
                    onClick={() => setIsVideoOpen(true)}
                />

                {isVideoOpen && (
                    <div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <div
                            className="relative w-full max-w-3xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/3KtWfp0UopM?autoplay=1"
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute -top-4 -right-4 border border-white text-white bg-black/50 hover:bg-black rounded-full p-2 focus:outline-none cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-2">
                    <div
                        className="relative text-sm mb-4 md:mb-0
                                   text-gray-700 dark:text-gray-300
                                   bg-white/20 dark:bg-black/40
                                   backdrop-blur-md rounded-xl px-4 py-1
                                   shadow-md drop-shadow-lg cursor-pointer"
                        onMouseEnter={() => createHearts(8)}
                    >
                        &copy; {currentYear}. {t('madeWithLove')}
                        {hearts.map((heart) => (
                            <motion.span
                                key={heart.id}
                                className="absolute text-pink-500 text-lg"
                                style={{ left: `50%` }}
                                initial={{ y: 0, scale: 1, opacity: 1, x: heart.x }}
                                animate={{ y: -60 - Math.random() * 20, scale: 1.2, opacity: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                ❤️
                            </motion.span>
                        ))}
                    </div>

                    <div className="text-sm text-center md:text-right
                                    text-gray-700 dark:text-gray-300
                                    bg-white/20 dark:bg-black/40
                                    backdrop-blur-md rounded-xl px-4 py-1
                                    shadow-md drop-shadow-lg space-x-2">
                        <Link href="/privacy" className="hover:underline">
                            {t('privacyPolicy')}
                        </Link>
                        <span className="px-1">|</span>
                        <Link href="/terms" className="hover:underline">
                            {t('termsOfUse')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
