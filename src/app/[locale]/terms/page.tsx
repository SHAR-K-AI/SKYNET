'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function TermsPage() {
    const t = useTranslations('Terms');

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 px-6 py-12">
            <motion.div
                className="max-w-3xl mx-auto space-y-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center">{t('title')}</h1>

                <p className="leading-relaxed">
                    {t('intro', { site: 'SkyNet' })}
                </p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t('sec1.title')}</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t('sec1.p1')}</li>
                        <li>{t('sec1.p2')}</li>
                        <li>{t('sec1.p3')}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t('sec2.title')}</h2>
                    <p className="leading-relaxed">{t('sec2.text')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t('sec3.title')}</h2>
                    <p className="leading-relaxed">{t('sec3.text')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t('sec4.title')}</h2>
                    <p className="leading-relaxed">{t('sec4.text')}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t('sec5.title')}</h2>
                    <p className="leading-relaxed">{t('sec5.text')}</p>
                </section>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                    {t('confirmation')}
                </p>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                    {t('lastUpdated', { date: new Date().toLocaleDateString('uk-UA') })}
                </p>
            </motion.div>
        </div>
    );
}
