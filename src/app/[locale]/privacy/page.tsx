import { getTranslations } from "next-intl/server";

export default async function PrivacyPage({ params }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200 px-6 py-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center">{t("title")}</h1>
                <p>{t("intro", { site: "SkyNet" })}</p>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section1.title")}</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>{t("section1.point1")}</li>
                        <li>{t("section1.point2")}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section2.title")}</h2>
                    <p>{t("section2.text")}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section3.title")}</h2>
                    <p>{t("section3.text")}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section4.title")}</h2>
                    <p>{t("section4.text")}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section5.title")}</h2>
                    <p>{t("section5.text")}</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">{t("section6.title")}</h2>
                    <p>{t("section6.text")}</p>
                </section>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
                    {t("lastUpdated", { date: new Date().toLocaleDateString() })}
                </p>
            </div>
        </div>
    );
}
