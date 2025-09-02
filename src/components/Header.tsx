'use client';

import { useState } from 'react';
import {  AnimatePresence } from 'framer-motion';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useTranslations, useLocale } from 'next-intl';

import MenuNav from "@/components/MenuNav";
import MenuButton from "@/components/MenuButton";
import MenuOverlay from "@/components/MenuOverlay";
import HeaderActions from "@/components/HeaderActions";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations('Menu');
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="w-full relative p-4 flex items-center z-50">
            <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
            <div className="flex-1 flex justify-center">
                <AnimatedTitle />
            </div>
            <HeaderActions className="hidden fixed top-10 right-5 md:flex items-center justify-center flex-col gap-4"/>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <MenuOverlay toggleMenu={toggleMenu} />
                        <MenuNav locale={locale} t={t} toggleMenu={toggleMenu} />
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}