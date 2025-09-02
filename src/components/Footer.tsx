'use client';

import dynamic from 'next/dynamic';

const DinoGameNoSSR = dynamic(() => import('react-chrome-dino-ts'), { ssr: false });

export default function DinoGameFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative">
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative mx-auto z-0 -mb-4">
                <DinoGameNoSSR />
            </div>

            <div className="w-full py-8 footer-pixel-light z-10">
                <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-2">

                    <div className="text-sm mb-4 md:mb-0
                text-gray-700 dark:text-gray-300
                bg-white/20 dark:bg-black/40
                backdrop-blur-md rounded-xl px-4 py-1
                shadow-md drop-shadow-lg">
                        &copy; {currentYear}. Створено з любов'ю та кавою.  ☕
                    </div>

                    <div className="text-sm text-center md:text-right
                                    text-gray-700 dark:text-gray-300
                                    bg-white/20 dark:bg-black/40
                                    backdrop-blur-md rounded-xl px-4 py-1
                                    shadow-md drop-shadow-lg">
                        Політика конфіденційності | Умови використання
                    </div>

                </div>
            </div>
        </footer>
    );
}
