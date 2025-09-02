"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MagnifyingGlassIcon,
    TagIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

interface FAQItem {
    level: string;
    questionUA: string;
    answerUA: string;
    questionEN: string;
    answerEN: string;
}

export default function FAQPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [level, setLevel] = useState("Beginner");
    const [questionUA, setQuestionUA] = useState("");
    const [answerUA, setAnswerUA] = useState("");
    const [questionEN, setQuestionEN] = useState("");
    const [answerEN, setAnswerEN] = useState("");
    const [faqs, setFaqs] = useState<FAQItem[]>([]);

    useEffect(() => {
        fetch('/api/faqs')
            .then(res => res.json())
            .then(data => setFaqs(data));
    }, []);

    const categories = Array.from(new Set(faqs.map(f => f.level)));

    const filteredFaqs = faqs.filter(
        f => (f.questionUA.toLowerCase().includes(search.toLowerCase()) || f.questionEN.toLowerCase().includes(search.toLowerCase())) &&
            (!selectedCategory || f.level === selectedCategory)
    );

    const handleAddFAQ = async () => {
        if (!questionUA.trim() && !questionEN.trim()) return;
        const newItem: FAQItem = {
            level,
            questionUA,
            answerUA,
            questionEN,
            answerEN
        };

        const res = await fetch('/api/faqs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        });

        if (res.ok) {
            setFaqs([...faqs, newItem]);
            setQuestionUA("");
            setAnswerUA("");
            setQuestionEN("");
            setAnswerEN("");
            setLevel("Beginner");
        }
    };

    const levels = ["Beginner", "Intermediate", "Expert"];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            <motion.div className="space-y-3 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                    Питання та відповіді двома мовами
                </h1>
            </motion.div>

            <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Пошук запитань..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
            </motion.div>

            <motion.div className="flex gap-2 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full border flex items-center gap-1 transition-all duration-300 shadow-sm hover:scale-105 ${!selectedCategory ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    <TagIcon className="h-4 w-4" /> Всі
                </button>
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`px-4 py-2 rounded-full border flex items-center gap-1 transition-all duration-300 shadow-sm hover:scale-105 ${selectedCategory === c ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        <TagIcon className="h-4 w-4" /> {c}
                    </button>
                ))}
            </motion.div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <AnimatePresence>
                    {filteredFaqs.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="border rounded-2xl p-5 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h2 className="font-semibold text-lg text-gray-900">[{f.level}] {f.questionUA}</h2>
                            <p className="text-gray-600 mt-2 leading-relaxed">{f.answerUA}</p>
                            <h2 className="font-semibold text-lg text-gray-900 mt-4">[{f.level}] {f.questionEN}</h2>
                            <p className="text-gray-600 mt-2 leading-relaxed">{f.answerEN}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div className="border rounded-2xl p-6 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-semibold mb-3 text-lg text-gray-800">Додати/Редагувати питання</h2>

                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full border rounded-xl p-3 mb-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>

                <textarea
                    placeholder="Питання українською"
                    value={questionUA}
                    onChange={(e) => setQuestionUA(e.target.value)}
                    className="w-full border rounded-xl p-3 min-h-[60px] focus:ring-2 focus:ring-blue-500 shadow-sm mb-2"
                />
                <textarea
                    placeholder="Відповідь українською"
                    value={answerUA}
                    onChange={(e) => setAnswerUA(e.target.value)}
                    className="w-full border rounded-xl p-3 min-h-[60px] focus:ring-2 focus:ring-blue-500 shadow-sm mb-2"
                />
                <textarea
                    placeholder="Question in English"
                    value={questionEN}
                    onChange={(e) => setQuestionEN(e.target.value)}
                    className="w-full border rounded-xl p-3 min-h-[60px] focus:ring-2 focus:ring-blue-500 shadow-sm mb-2"
                />
                <textarea
                    placeholder="Answer in English"
                    value={answerEN}
                    onChange={(e) => setAnswerEN(e.target.value)}
                    className="w-full border rounded-xl p-3 min-h-[60px] focus:ring-2 focus:ring-blue-500 shadow-sm mb-2"
                />
                <button
                    onClick={handleAddFAQ}
                    className="mt-3 px-5 py-2 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                    Надіслати <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </motion.div>
        </div>
    );
}
