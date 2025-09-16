'use client';

import React from 'react';
import Image from "next/image";
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('About');

    return (
        <div className="space-y-10 p-6 rounded-2xl mx-auto max-w-4xl transition-all duration-500 ease-in-out border-2 border-dashed border-white">
            <motion.h1
                className="md:text-6xl text-xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
            >
                {t('title')}
            </motion.h1>

            <motion.p className="text-lg sm:text-xl leading-relaxed">
                {t('intro')}
            </motion.p>

            <Image
                width={1000}
                height={500}
                alt="About Image"
                src="/images/about.png"
                className="object-contain rounded-md mx-auto w-full opacity-90"
            />

            <motion.p className="text-lg sm:text-xl leading-relaxed">
                {t('responsibility')}
            </motion.p>

            <motion.p className="text-lg sm:text-xl leading-relaxed">
                {t('friendly')}
            </motion.p>

            <motion.div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('whyTitle')}</h2>
                <ul className="list-disc list-inside text-lg space-y-1">
                    <li>{t('whyList.one')}</li>
                    <li>{t('whyList.two')}</li>
                    <li>{t('whyList.three')}</li>
                    <li>{t('whyList.four')}</li>
                </ul>
            </motion.div>
        </div>
    );
}
