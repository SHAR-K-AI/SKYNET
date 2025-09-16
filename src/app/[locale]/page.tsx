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
            <AnimatePresence/>
            <section className="md:p-6 mt-6">
                <h1 className="md:text-6xl text-xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">{t('title')}</h1>
                <p className="md:text-xl mb-12 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t("description")}
                </p>
                {loading ? <Spinner/> : <CardGrid cards={cards}/>}
            </section>
        </div>
    );
}
