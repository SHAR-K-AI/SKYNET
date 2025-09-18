import React from 'react';
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({ params }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <div className="space-y-10 p-6 rounded-2xl mx-auto max-w-4xl transition-all duration-500 ease-in-out border-2 border-dashed border-white">
            <h1 className="md:text-6xl text-xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                {t('title')}
            </h1>

            <p className="text-lg sm:text-xl leading-relaxed">
                {t('intro')}
            </p>

            <Image
                width={1000}
                height={500}
                alt="About Image"
                src="/images/about.png"
                className="object-contain rounded-md mx-auto w-full opacity-90"
            />

            <p className="text-lg sm:text-xl leading-relaxed">
                {t('responsibility')}
            </p>

            <p className="text-lg sm:text-xl leading-relaxed">
                {t('friendly')}
            </p>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t('whyTitle')}</h2>
                <ul className="list-disc list-inside text-lg space-y-1">
                    <li>{t('whyList.one')}</li>
                    <li>{t('whyList.two')}</li>
                    <li>{t('whyList.three')}</li>
                    <li>{t('whyList.four')}</li>
                </ul>
            </div>
        </div>
    );
}
