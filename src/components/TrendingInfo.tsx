'use client';

import {useTranslations} from 'next-intl';

export default function TrendingInfo() {
    const t = useTranslations('GoogleTrends');

    return (
        <div className="mb-6">
            <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700 dark:text-blue-400 drop-shadow-md">
                {t("title")}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">
                {t("description_short")}

            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
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

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {t("description_long")}
            </p>
        </div>
    );
}
