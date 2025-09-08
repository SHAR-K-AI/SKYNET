'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen max-w-4xl mx-auto text-gray-900 dark:text-gray-100 p-8 sm:p-12 space-y-8">

            <motion.h1
                className="text-4xl sm:text-5xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Про проект 🌌
            </motion.h1>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                initial="hidden"
                animate="visible"
                custom={1}
            >
                Цей неофіційний фан-сайт створено для того, щоб допомогти розібратися у <strong>GCP, AI та суміжних технологіях</strong> у веселій та невимушеній формі. Він розроблений у вигляді зоряного та хмарного неба, адже новітні технології природно асоціюються з хмарами – хмарні сервіси. Вони ніби “пливуть” у нашому цифровому небі, відкриваючи безліч нових можливостей для навчання та експериментів.
            </motion.p>

            <motion.div
                className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <Image
                    src="/images/no-image.png"
                    fill
                    alt="Footer Image"
                    className="object-cover"
                />
            </motion.div>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                initial="hidden"
                animate="visible"
                custom={2}
            >
                Жартівлива назва <strong>Skynet</strong> сюди сама проситься: сучасні технології та відкриття все більше відбуваються з використанням AI, і варто пам’ятати про відповідальне використання – адже без належного контролю штучний інтелект може призвести до непередбачуваних наслідків. 😎
            </motion.p>


            <motion.div
                className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >

                <Image
                    src="/images/no-image.png"
                    fill
                    alt="Footer Image"
                    className="object-contain"
                />
            </motion.div>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                initial="hidden"
                animate="visible"
                custom={3}
            >
                Тому наш Skynet лишається дружнім та навчальним: він допомагає розбиратися у GCP, AI та хмарних технологіях, створює цікаві експерименти та веселу атмосферу для навчання. І пам’ятай: кадри з фільму <strong>“Термінатор”</strong> можуть залишитися лише у кіно, якщо ми користуємося AI розумно та безпечно.
            </motion.p>

            <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                custom={4}
            >
                <h2 className="text-2xl font-semibold">Чому цей сайт існує:</h2>
                <ul className="list-disc list-inside text-lg space-y-1">
                    <li>Це фан-проект, щоб робити навчання приємним і цікавим.</li>
                    <li>Підбірка ресурсів, гайдів та інструментів для будь-якого користувача.</li>
                    <li>Місце, де можна знайти відповіді на часті питання та поради.</li>
                    <li>Неофіційний сайт, просто щоб навчання було легким і веселим 😉</li>
                </ul>
            </motion.div>
        </div>
    );
}
