'use client';

import DinoGame from 'react-chrome-dino-ts'

export default function DinoGameFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative">
            <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative mx-auto z-0">
                <DinoGame />
            </div>
            <div className="w-full py-8 footer-pixel-light dark:footer-pixel-dark z-10">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-gray-700 dark:text-gray-300 text-sm mb-4 md:mb-0">
                        &copy; {currentYear} YourCompany
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 text-sm text-center md:text-right">
                        Політика конфіденційності | Умови використання
                    </div>
                </div>
            </div>
        </footer>
    );
}
