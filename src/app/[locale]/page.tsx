'use client';

import { useTranslations, useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import CardGrid, { CardData } from "@/components/CardGrid";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SoundWrapper from "@/components/SoundWrapper";
import AppImage from "@/components/Image";
import { XMarkIcon } from "@heroicons/react/24/outline";

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
};

const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

function WelcomeModal({
                          t,
                          onClose,
                      }: {
    t: ReturnType<typeof useTranslations>;
    onClose: () => void;
}) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-3xl w-full p-8 space-y-6 text-center relative transition-colors duration-500 max-h-[90vh] overflow-y-auto"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
                <button
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    onClick={onClose}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <motion.h1
                    className="text-4xl font-bold text-blue-800 dark:text-blue-400 mb-4"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                    {t("welcomeTitle")}
                </motion.h1>

                <motion.p
                    className="text-lg relative"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    {t("welcomeText")}
                </motion.p>

                <AppImage
                    src="/images/click.png"
                    alt="welcome"
                    width={150}
                    style={{ objectFit: 'contain' }}
                    className="m-auto"
                />

                <motion.div
                    className="text-left space-y-4 mt-6"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1, duration: 1 }}
                >
                    <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
                        {t("whatYouWillFind")}
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t("resourcesAndGuides")}</li>
                        <li>{t("funContent")}</li>
                        <li>{t("usefulLinks")}</li>
                    </ul>
                </motion.div>

                <motion.p
                    className="text-gray-600 dark:text-gray-300 mt-6 italic"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    {t("fanInitiative")}
                </motion.p>

                <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <SoundWrapper>
            <span
                onClick={onClose}
                className="inline-block  cursor-pointer bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              {t("joinAndLearn")}
            </span>
                    </SoundWrapper>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default function MainPage() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const t = useTranslations("MainPage");
    const locale = useLocale();

    useEffect(() => {
        const checkModal = () => {
            const visited = localStorage.getItem('welcomeModalShown');
            if (!visited) {
                setShowModal(true);
                localStorage.setItem('welcomeModalShown', 'true');
            }
        };

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

        checkModal();
        fetchCards();
    }, [locale]);

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 relative transition-colors duration-500">
            <AnimatePresence>
                {showModal && <WelcomeModal t={t} onClose={() => setShowModal(false)}/>}
            </AnimatePresence>
            <section className="md:p-6 mt-6">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t('title')}</h2>
                {loading ? <p>Loading...</p> : <CardGrid cards={cards}/>}
            </section>
        </div>
    );
}
