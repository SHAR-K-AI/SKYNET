'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AppImage from "@/components/Image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Question {
    question: string;
    image: string;
    options: { text: string; categories: string[]; hint: string }[];
}

export const roleToRIASEC: Record<string, string[]> = {
    "API Developer": ["I", "R"],
    "Citizen Developer": ["A", "C"],
    "Cloud Digital Leader": ["E", "S"],
    "Cloud Engineer": ["R", "I"],
    "Cloud Architect": ["I", "E", "R"],
    "Cloud Developer": ["R", "I"],
    "Contact Center Engineer": ["S", "R"],
    "Data Analyst": ["I", "C"],
    "Data Engineer": ["I", "R", "C"],
    "Database Engineer": ["R", "C"],
    "DevOps Engineer": ["R", "I"],
    "Google Workspace Administrator": ["C", "S"],
    "Hybrid and Multi-Cloud Architect": ["I", "E", "R"],
    "Machine Learning Engineer": ["I", "A"],
    "Network Engineer": ["R", "C"],
    "Security Engineer": ["R", "C", "I"],
    "Startup Cloud Engineer": ["E", "R"],
    "Generative AI Leader": ["A", "E"],
};

export default function GcpRoleQuiz() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useLocale();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(-1);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Record<string, number> | null>(null);

    // Завантаження питань
    useEffect(() => {
        setLoading(true);
        fetch(`/api/test?lang=${locale}`)
            .then(res => res.json())
            .then(data => setQuestions(data))
            .catch(() => setQuestions([]))
            .finally(() => setLoading(false));
    }, [locale]);

    // Завантаження результату з URL (якщо є)
    useEffect(() => {
        const encodedResult = searchParams.get("result");
        if (encodedResult) {
            try {
                const decoded: Record<string, number> = JSON.parse(atob(encodedResult));
                setResult(decoded);
            } catch (e) {
                console.error("Помилка декодування результату", e);
            }
        }
    }, [searchParams]);

    const handleAnswer = (categories: string[]) => {
        const updatedAnswers = [...answers, ...categories];
        setAnswers(updatedAnswers);

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            calculateResult(updatedAnswers);
        }
    };

    const calculateResult = (categories: string[]) => {
        const riasecCounts: Record<string, number> = {};
        categories.forEach(c => {
            riasecCounts[c] = (riasecCounts[c] || 0) + 1;
        });

        const roleScores: Record<string, number> = {};
        Object.entries(roleToRIASEC).forEach(([role, cats]) => {
            let score = 0;
            cats.forEach(c => {
                score += riasecCounts[c] || 0;
            });
            roleScores[role] = score;
        });

        setResult(roleScores);

        const encoded = btoa(JSON.stringify(roleScores));
        router.replace(`?result=${encoded}`);
    };

    const startQuiz = () => {
        setCurrent(0);
    };

    const restartQuiz = () => {
        setCurrent(-1);
        setAnswers([]);
        setResult(null);
        router.replace("/test");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loader"></span>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center p-6">
                    <p className="text-xl font-semibold">Немає доступних питань.</p>
                </div>
            </div>
        );
    }

    // Якщо результат вже розрахований
    if (result) {
        const labels = Object.keys(result);
        const data = Object.values(result);

        const chartData = {
            labels,
            datasets: [
                {
                    label: "Ваші бали по ролях",
                    data,
                    backgroundColor: "rgba(99, 102, 241, 0.7)",
                    borderRadius: 8,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Ваш результат',
                    color: '#4b5563', // light theme
                    font: {
                        size: 18,
                        weight: 'bold' as const, // Corrected line
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#4b5563',
                        font: {
                            weight: 'bold' as const, // Corrected line
                        }
                    },
                },
                y: {
                    grid: {
                        color: 'rgba(209, 213, 219, 0.4)',
                    },
                    ticks: {
                        color: '#4b5563',
                    },
                },
            },
        };

        return (
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8">
                <motion.h1
                    className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    🎉 Ваші результати!
                </motion.h1>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Нижче показано, до яких ролей GCP ви найбільше підходите. Використовуйте це для орієнтації у кар’єрі.
                </p>
                <div className="h-96">
                    <Bar id="result-chart" data={chartData} options={chartOptions} />
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                    >
                        Пройти ще раз
                    </button>
                </div>
            </div>
        );
    }

    // Вступний екран
    if (current === -1) {
        return (
            <div className="max-w-xl mx-auto p-6 text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8">
                <motion.h1
                    className="text-3xl md:text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    GCP Career Matchmaker: Знайди свою ідеальну роль!
                </motion.h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Ви коли-небудь замислювалися, яка роль у світі Google Cloud Platform підходить вам найбільше?
                </p>
                <AppImage
                    src="/images/test.png"
                    alt="cloud career quiz"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-xl shadow-md mb-6"
                />
                <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
                    Цей тест базується на моделі **RIASEC**, яка допомагає визначити ваші професійні інтереси. Пройдіть тест, щоб знайти свою ідеальну роль!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">R:</span> Реалістичний
                        <p className="text-sm text-gray-500 dark:text-gray-400">Практичні завдання, робота руками.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">I:</span> Дослідницький
                        <p className="text-sm text-gray-500 dark:text-gray-400">Аналіз, дослідження, вирішення проблем.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">A:</span> Артистичний
                        <p className="text-sm text-gray-500 dark:text-gray-400">Креативність, візуалізація, інновації.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">S:</span> Соціальний
                        <p className="text-sm text-gray-500 dark:text-gray-400">Спілкування, допомога, командна робота.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">E:</span> Підприємливий
                        <p className="text-sm text-gray-500 dark:text-gray-400">Лідерство, управління, досягнення цілей.</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">C:</span> Традиційний
                        <p className="text-sm text-gray-500 dark:text-gray-400">Організація, систематизація, структурованість.</p>
                    </div>
                </div>
                <button
                    onClick={startQuiz}
                    className="w-full cursor-pointer sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                    Почати тест
                </button>
            </div>
        );
    }

    const q = questions[current];
    const progress = Math.round(((current + 1) / questions.length) * 100);

    return (
        <div className="max-w-xl mx-auto">
            <motion.h1
                className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                GCP Career Quiz
            </motion.h1>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="text-right text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                {current + 1} з {questions.length}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 border rounded-3xl shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        {q.question}
                    </h2>

                    <div className="mb-6 overflow-hidden rounded-2xl shadow-inner">
                        <AppImage
                            src={q.image}
                            alt="quiz"
                            width={400}
                            height={200}
                            className="w-full object-cover rounded-2xl"
                        />
                    </div>

                    <div className="space-y-4">
                        {q.options.map((opt, i) => (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                key={i}
                                onClick={() => handleAnswer(opt.categories)}
                                className="w-full text-left p-5 rounded-xl border-2 shadow-sm cursor-pointer
                  hover:bg-blue-50 dark:hover:bg-gray-700
                  bg-white dark:bg-gray-900
                  border-gray-200 dark:border-gray-700
                  text-gray-900 dark:text-gray-100"
                            >
                                <div className="font-medium text-lg">{opt.text}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {opt.hint}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}