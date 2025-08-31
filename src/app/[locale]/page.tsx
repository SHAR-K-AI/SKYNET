'use client';

import { useEffect, useState } from 'react';
import CardGrid, { CardData } from '../../components/CardGrid';
// import { useTranslations } from 'next-intl';

export default function Home() {
    const [cards, setCards] = useState<CardData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/getData');
            const data = await res.json();
            setCards(data);
        };
        fetchData();
    }, []);

    // const t = useTranslations('HomePage');
    // return <h1>{t('title')}</h1>;

    return (
        <div className="min-h-screen ">
            <CardGrid cards={cards} />
        </div>
    );
}
