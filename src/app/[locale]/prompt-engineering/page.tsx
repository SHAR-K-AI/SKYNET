"use client";

import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

interface PromptItem {
    title: string;
    text: string;
}

export default function PromptEngineeringPage() {
    const locale = useLocale();
    const [loading, setLoading] = useState(true);
    const [prompts, setPrompts] = useState<PromptItem[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const t = useTranslations("PromptEngineering");

    useEffect(() => {
        fetch(`/api/prompts?lang=${locale}`)
            .then((res) => res.json())
            .then((data) => setPrompts(data || []))
            .catch(() => setPrompts([]))
            .finally(() => setLoading(false));
    }, [locale]);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    if (loading) return <Spinner />;

    return (
        <main className="min-h-screen transition-colors duration-700">
            <div className="max-w-6xl mx-auto py-20 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight"
                >
                    {t("title")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-xl mb-12 text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t("description") }}
                />

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl font-semibold mb-10 text-gray-900 dark:text-gray-100"
                >
                    {t("subtitle")}
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                    {prompts.map((prompt, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative group transform transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 z-0 scale-101">
                                <div className="h-full w-full rounded-3xl
                                    bg-gradient-to-tr
                                    from-blue-400 to-indigo-500
                                    dark:from-blue-600 dark:to-indigo-700
                                    blur-[4px]" />
                            </div>

                            <div className="relative z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-3xl p-6 shadow-xl flex flex-col h-full">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {prompt.title}
                                    </h3>
                                    <button
                                        onClick={() => copyToClipboard(prompt.text, i)}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                                    >
                                        {copiedIndex === i ? (
                                            <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <ClipboardIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                                    {prompt.text}
                                </p>
                            </div>

                            <div className="absolute inset-0 pointer-events-none rounded-3xl
                                bg-white/10 dark:bg-white/5
                                group-hover:bg-white/20 dark:group-hover:bg-white/10
                                opacity-0 group-hover:opacity-30 animate-shine
                                transition-opacity duration-500 z-20" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
