import { getTranslations } from "next-intl/server";

export default async function TermsPage({ params }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Terms' });

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
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
            </div>
        </div>
    );
}
