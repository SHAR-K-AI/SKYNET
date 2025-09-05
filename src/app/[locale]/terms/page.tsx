'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfUsePage() {
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
                Умови використання
            </motion.h1>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={1}
            >
                Цей фан-сайт <strong>Skynet</strong> створено для навчальних та розважальних цілей. Усі матеріали на сайті є неофіційними та не пов’язані з комерційними компаніями або правовласниками.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={2}
            >
                Всі користувачі погоджуються використовувати сайт відповідально. Не рекомендується застосовувати отримані знання для незаконних дій.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={3}
            >
                Власники сайту не несуть відповідальності за будь-які наслідки, пов’язані з використанням інформації та матеріалів на сайті.
            </motion.p>

            <motion.p
                className="text-lg sm:text-xl leading-relaxed"
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                custom={4}
            >
                Використовуючи сайт, ви підтверджуєте, що ознайомились із цими умовами і погоджуєтесь їх дотримуватися.
            </motion.p>
        </div>
    );
}
