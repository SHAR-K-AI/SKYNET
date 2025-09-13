'use client';

import {useTranslations, useLocale} from 'next-intl';
import React, {useEffect, useState} from 'react';
import CardGrid, {CardData} from "@/components/CardGrid";
import {AnimatePresence} from "framer-motion";

import Spinner from "@/components/Spinner";

export default function MainPage() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(false);

    const t = useTranslations("MainPage");
    const locale = useLocale();

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/resources?lang=${locale}`);
                const data = await res.json();
                setCards(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [locale]);

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 relative transition-colors duration-500">
            <AnimatePresence>
            </AnimatePresence>
            <section className="md:p-6 mt-6">
                <h2 className="text-4xl font-extrabold mb-4 text-blue-700 dark:text-blue-400 drop-shadow-md">{t('title')}</h2>
                {loading ? <Spinner/> : <CardGrid cards={cards}/>}
            </section>
        </div>
    );
}
