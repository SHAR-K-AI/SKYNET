import {getTranslations} from 'next-intl/server';
import CardGrid, {CardData} from '@/components/CardGrid';

export default async function MainPage({params}: { params: { locale: string } }) {
    const {locale} = params;
    const t = await getTranslations({locale, namespace: 'MainPage'});
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/resources?lang=${locale}`, {
        next: {revalidate: 60},
    });

    let cards: CardData[] = [];

    if (!res.ok) {
        const errorText = await res.text();
        console.error("API error:", res.status, res.statusText, errorText);
    } else {
        cards = await res.json();
    }

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <section className="md:p-6 mt-6">
                <h1 className="md:text-6xl text-xl font-extrabold mb-6">
                    {t('title')}
                </h1>
                <p className="md:text-xl mb-12">
                    {t('description')}
                </p>
                <CardGrid cards={cards}/>
            </section>
        </div>
    );
}
