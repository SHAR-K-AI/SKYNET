'use client';

import {Bar} from "react-chartjs-2";
import { ChartOptions } from "chart.js";

import {motion} from "framer-motion";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface QuizResultProps {
    result: Record<string, number>;
    restartQuiz: () => void;
}

interface BadgeProps {
    role: string;
    imageSrc: string;
    size?: string;
}

// Словник описів ролей
const roleDescriptions: Record<string, string> = {
    "API Developer": "Ви спеціаліст з інтеграцій та API, який любить вирішувати складні технічні завдання.",
    "Citizen Developer": "Ви створюєте рішення без коду та допомагаєте автоматизувати процеси для бізнесу.",
    "Cloud Digital Leader": "Ви лідер цифрової трансформації, керуєте командами та впроваджуєте інновації.",
    "Cloud Engineer": "Ви практичний інженер хмарних систем, налаштовуєте та підтримуєте інфраструктуру.",
    "Cloud Architect": "Ви проєктуєте хмарні архітектури, оптимізуєте системи та керуєте масштабуванням.",
    "Cloud Developer": "Ви розробляєте хмарні додатки, пишете код та створюєте функціональні рішення.",
    "Contact Center Engineer": "Ви забезпечуєте стабільну роботу контакт-центрів та комунікаційних систем.",
    "Data Analyst": "Ви аналізуєте дані, створюєте звіти та допомагаєте бізнесу приймати рішення.",
    "Data Engineer": "Ви будуєте потоки даних та забезпечуєте їх якість для аналітики та ML.",
    "Database Engineer": "Ви управляєте базами даних, оптимізуєте продуктивність та надійність.",
    "DevOps Engineer": "Ви автоматизуєте процеси розробки та доставки, інтегруєте CI/CD.",
    "Google Workspace Administrator": "Ви керуєте сервісами Google Workspace для команди чи організації.",
    "Hybrid and Multi-Cloud Architect": "Ви проектуєте гібридні та мультихмарні рішення для складних систем.",
    "Machine Learning Engineer": "Ви створюєте ML-моделі та інтегруєте їх у продукти.",
    "Network Engineer": "Ви налаштовуєте мережі, забезпечуєте безпеку та стабільність з’єднань.",
    "Security Engineer": "Ви захищаєте системи, шукаєте вразливості та впроваджуєте безпеку.",
    "Startup Cloud Engineer": "Ви швидко впроваджуєте хмарні рішення для стартапів та інновацій.",
    "Generative AI Leader": "Ви керуєте проектами зі штучного інтелекту та генеративних моделей."
};

const Badge = ({role, imageSrc, size = "w-44 h-44"}: BadgeProps) => (
    <div className="relative inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400">
        <div
            className={`relative ${size} rounded-full bg-gray-100 dark:bg-gray-800 shadow-2xl flex items-center justify-center overflow-hidden transform transition hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.7)] cursor-pointer`}>
            <div
                className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 via-transparent to-transparent z-0"></div>
            <img src={imageSrc} alt={role} className="w-full h-full object-cover absolute inset-0 z-10"/>
            <svg className="absolute w-full h-full z-30" viewBox="0 0 100 100">
                <defs>
                    <path id="circlePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                </defs>
                <text fill="white" fontSize="8" fontWeight="bold">
                    <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                        {role} • {role} • {role}
                    </textPath>
                </text>
            </svg>
            <div className="absolute w-full h-full top-0 left-0 bg-white opacity-10 animate-shimmer z-40"></div>
            <div
                className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-[starRotate_4s_linear_infinite] top-5 left-10 z-50"></div>
            <div
                className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-[starRotate_5s_linear_infinite] bottom-5 right-10 z-50"></div>
            <div
                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-[starRotate_6s_linear_infinite] top-10 right-20 z-50"></div>
            <div
                className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-[starRotate_7s_linear_infinite] bottom-15 left-15 z-50"></div>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes starRotate {
                    0% {
                        transform: rotate(0deg) translateX(20px) rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg) translateX(20px) rotate(-360deg);
                    }
                }
            `}</style>
        </div>
    </div>
);

export default function QuizResult({result, restartQuiz}: QuizResultProps) {
    const labels = Object.keys(result);
    const data = Object.values(result);

    const sortedRoles = Object.entries(result).sort((a, b) => b[1] - a[1]).map(([role]) => role);
    const mainRole = sortedRoles[0];

    const googleColors = ["#DB4437", "#F4B400", "#4285F4", "#0F9D58"];
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue;

    const getLevelColor = (val: number) => {
        if (range === 0) return googleColors[3];
        const level = Math.floor(((val - minValue) / range) * 4);
        return googleColors[Math.min(level, 3)];
    };

    const barColors = data.map(getLevelColor);
    const roleColors: Record<string, string> = {};
    labels.forEach((role, i) => roleColors[role] = barColors[i]);
    const additionalRoles = labels.filter(role => role !== mainRole && roleColors[role] === "#0F9D58");

    const chartData = {
        labels,
        datasets: [
            {
                label: "Ваші бали по ролях",
                data,
                backgroundColor: barColors,
                borderRadius: 8,
            },
        ],
    };


    const chartOptions: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                color: '#1F2937',
                font: { size: 18, weight: 'bold' as const },
            },
        },
        scales: {
            x: {
                type: 'category',  // <- важливо: конкретний літерал
                grid: { display: false },
                ticks: {
                    font: { weight: 'bold' as const },
                    color: barColors,
                },
            },
            y: {
                type: 'linear',  // <- також конкретний літерал
                grid: { color: 'rgba(209, 213, 219, 0.4)' },
                ticks: { color: '#1F2937' },
            },
        },
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
        <div
            className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-8 transition-colors duration-500">
            <motion.h1
                className="text-3xl md:text-4xl text-center"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                🎉 <span
                className=" font-extrabold  mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Вітаємо!</span>
            </motion.h1>

            <div className="h-96 mb-6">
                <Bar id="result-chart" data={chartData} options={chartOptions}/>
            </div>

            <span className="text-sm font-medium z-20 text-gray-700 dark:text-gray-300">Ваш основний профіль:</span>
            <div className="flex flex-col items-center mb-6">
                <Badge role={mainRole} imageSrc={`/images/test/q-1.png`}/>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-300 text-sm max-w-xs">
                    {roleDescriptions[mainRole] || "Опис недоступний."}
                </p>
            </div>

            <span className="text-sm font-medium z-20 text-gray-700 dark:text-gray-300">Ваші додаткові ролі:</span>
            <div className="flex flex-wrap justify-center gap-12 mt-4">
                {additionalRoles.length > 0 ? (
                    additionalRoles.map((role, i) => (
                        <div key={i} className="flex flex-col items-center w-36 sm:w-44">
                            <Badge role={role} imageSrc={`/images/test/q-${i + 2}.png`}
                                   size="w-36 h-36 sm:w-44 sm:h-44"/>
                            <p className="mt-2 text-center text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                                {roleDescriptions[role] || "Опис недоступний."}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Додаткових ролей немає</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 mt-8">
                <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                    Пройти ще раз
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                    Поділитися результатом
                </button>
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                Скопіюйте посилання або поділіться з друзями!
            </p>
        </div>
    );
}
