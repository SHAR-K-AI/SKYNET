'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import React, {useState} from "react";
import {motion} from "framer-motion";
import AppImage from "@/components/Image";

const DinoGameNoSSR = dynamic(() => import('react-chrome-dino-ts'), {ssr: false});

interface Heart {
    id: string;
    x: number;
}

export default function DinoGameFooter() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();
    const [hearts, setHearts] = useState<Heart[]>([]);

    const createHearts = (count = 5) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const id = Math.random().toString(36).slice(2, 11);
                setHearts(prev => [...prev, {id, x: Math.random() * 250 - 25}]);

                setTimeout(() => {
                    setHearts(prev => prev.filter(h => h.id !== id));
                }, 1500);
            }, i * 500);
        }
    };

    return (
        <footer className="relative">


            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative mx-auto z-0 -mb-4">
                <DinoGameNoSSR/>
            </div>

            <div className="w-full py-8 footer-pixel-light z-10 relative">
                <AppImage
                    alt="ILG"
                    width={250}
                    src="/images/footer-img.png"
                    className="object-cover rounded-lg absolute md:-top-25 invisible md:visible md:left-30 opacity-85"
                />
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
                                style={{left: `50%`}}
                                initial={{y: 0, scale: 1, opacity: 1, x: heart.x}}
                                animate={{y: -60 - Math.random() * 20, scale: 1.2, opacity: 0}}
                                transition={{duration: 1, ease: 'easeOut'}}
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
