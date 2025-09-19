import {getTranslations} from "next-intl/server";
import RolesConstellation from "@/components/RolesConstellation/RolesConstellation";

export default async function RolePage({params}: {
    params: Promise<{ locale: string }>;
}) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'RolePage'});

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
            <p className="mb-6 text-gray-700">{t("description")}</p>
            <RolesConstellation/>
        </main>
    );
}
