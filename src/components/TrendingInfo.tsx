'use client';

import {useTranslations} from 'next-intl';

export default function TrendingInfo() {
    const t = useTranslations('GoogleTrends');

    return (
        <div className="mb-6">
            <h1 className="md:text-6xl text-xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                {t("title")}
            </h1>

            <p className="md:text-xl text-gray-700 dark:text-gray-400 mb-2 font-medium">
                {t("description_short")}
                {t("about")}
                <a
                    href="https://trends.google.com/trending?geo=UA&hl=uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-medium"
                >
                    {t("link_text")}
                </a>.
            </p>

            <p className="md:text-xl text-gray-700 dark:text-gray-400 mb-4">

            </p>

            <p className="md:text-xl text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">
                {t("description_long")}
            </p>
        </div>
    );
}
