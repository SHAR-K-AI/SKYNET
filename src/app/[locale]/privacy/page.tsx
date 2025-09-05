'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
    const typingVariants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { delay: i * 0.2, type: 'spring', stiffness: 50 },
        }),
    };

    return (
        <div className="min-h-screen max-w-4xl mx-auto text-gray-900 dark:text-gray-100 p-8 sm:p-12 space-y-8">
            <motion.h1
                className="text-4xl sm:text-5xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Політика конфіденційності
            </motion.h1>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
                Цей фан-сайт <strong>Skynet</strong> не збирає особисті дані користувачів. Ми не зберігаємо email, IP-адреси чи будь-яку іншу персональну інформацію.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={2}
            >
                Ми використовуємо лише сторонні бібліотеки для візуалізації та анімацій, які не передають персональні дані. Всі дані, що вводяться у навчальні приклади (наприклад, в інтерактивних демо), залишаються лише на вашому пристрої.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={3}
            >
                Використовуючи цей сайт, ви погоджуєтесь із тим, що ваша активність на сайті не передається третім особам і не використовується для маркетингових цілей.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={4}
            >
                Ця політика може час від часу оновлюватися, тому радимо переглядати її перед новими візитами на сайт.
            </motion.p>
        </div>
    );
}
