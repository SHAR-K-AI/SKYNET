"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MagnifyingGlassIcon, TagIcon } from "@heroicons/react/24/outline";

interface FAQItem {
    id: string;
    level: string;
    question: string;
    answer: string;
}

const levelColors: Record<string, string> = {
    Beginner: "text-blue-500",
    Intermediate: "text-red-500",
    Advanced: "text-yellow-500",
    Expert: "text-green-500",
};

const levelOrder: Record<string, number> = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
};

export default function FAQPage() {
    const locale = useLocale();
    const t = useTranslations("FAQ");

    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/faqs?lang=${locale}`)
            .then(res => res.json())
            .then(setFaqs)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [locale]);

    const categories = useMemo(() => Array.from(new Set(faqs.map(f => f.level))), [faqs]);

    const filteredAndSortedFaqs = useMemo(() => {
        const filtered = faqs
            .filter(
                f =>
                    f.question.toLowerCase().includes(search.toLowerCase()) ||
                    f.answer.toLowerCase().includes(search.toLowerCase())
            )
            .filter(f => !selectedCategory || f.level === selectedCategory);

        return filtered.sort((a, b) => (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0));
    }, [faqs, search, selectedCategory]);

    const CategoryButton = ({
                                category,
                                active,
                                onClick,
                            }: {
        category: string;
        active: boolean;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full cursor-pointer flex items-center gap-1 transition-all duration-300 shadow-sm hover:scale-105
      ${active
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
            }`}
        >
            <TagIcon className="h-4 w-4" /> {category}
        </button>
    );

    const highlightText = (text: string, highlight: string) => {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-yellow-200 dark:bg-yellow-600 rounded px-1">{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500">
            <div className="space-y-10 p-4 md:p-6 rounded-2xl mx-auto max-w-4xl transition-all duration-500 ease-in-out border-2 border-dashed border-white">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 text-center">
                    <h1 className="md:text-6xl text-xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                        ✨ {t("Title")} ✨
                    </h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="leading-relaxed mx-auto text-gray-600 dark:text-gray-300"
                >
                    {t("Description")}
                </motion.p>

                <div className="mt-4 p-4 rounded-xl text-sm text-right text-gray-700 dark:text-gray-300">
                    <strong>{t("OriginalArticle")}</strong>
                    <br/>
                    <a
                        href="https://medium.com/google-cloud/mastering-google-cloud-platform-a-list-of-questions-to-consider-for-beginners-intermediates-and-82c02d9f2e2b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                    >
                        Mastering Google Cloud Platform:
                        <br/>
                        A List of Questions to Consider for Beginners, Intermediates, and Experts
                    </a>
                </div>

                <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300" />
                    <input
                        type="text"
                        placeholder={t("SearchPlaceholder")}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm
              bg-white text-gray-900 placeholder-gray-400 border-gray-200
              dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-700
              transition-colors duration-300"
                    />
                </motion.div>

                <motion.div className="flex gap-2 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CategoryButton category={t("All")} active={!selectedCategory} onClick={() => setSelectedCategory(null)} />
                    {categories.map(c => (
                        <CategoryButton key={c} category={c} active={selectedCategory === c} onClick={() => setSelectedCategory(c)} />
                    ))}
                </motion.div>

                <motion.div className="space-y-4">
                    {loading && <p className="animate-pulse text-center">{t("Loading")}</p>}

                    {!loading && filteredAndSortedFaqs.map(f => (
                        <motion.div
                            key={f.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl p-5 shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer
                bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        >
                            <h2 className="font-semibold text-lg">
                                <span className={levelColors[f.level] || "text-gray-700 dark:text-gray-300"}>[{f.level}]</span>{" "}
                                {highlightText(f.question, search)}
                            </h2>
                            <p className="mt-2 leading-relaxed break-words">{highlightText(f.answer, search)}</p>
                        </motion.div>
                    ))}

                    {!loading && filteredAndSortedFaqs.length === 0 && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4 text-gray-500 dark:text-gray-400">
                            {t("NothingFound")}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
