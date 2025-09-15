'use client';

import {Bar} from "react-chartjs-2";
import {ChartOptions} from "chart.js";
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

import Badge from "@/components/Bage";
import {useTranslations} from "next-intl";
import {useState} from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface QuizResultProps {
    result: Record<string, number>;
    restartQuiz: () => void;
}

const rolesData = [
    {
        role_key: "CloudDigitalLeader",
        role_name: "Cloud Digital Leader",
        persona: "Dino",
        image: "/images/test/cdl.png"
    },
    {
        role_key: "GenerativeAILeader",
        role_name: "Generative AI Leader",
        persona: "Dino",
        image: "/images/test/gal.png"
    },
    {
        role_key: "GoogleWorkspaceAdministrator",
        role_name: "Google Workspace Administrator",
        persona: "Dino",
        image: "/images/test/ws.png"
    },
    {
        role_key: "CloudDeveloper",
        role_name: "Cloud Developer",
        persona: "Shark",
        image: "/images/test/cd.png"
    },
    {
        role_key: "StartupCloudEngineer",
        role_name: "Startup Cloud Engineer",
        persona: "Shark",
        image: "/images/test/sp.png"
    },
    {
        role_key: "DataAnalyst",
        role_name: "Data Analyst",
        persona: "Robot",
        image: "/images/test/daan.png"
    },
    {
        role_key: "DevOpsEngineer",
        role_name: "DevOps Engineer",
        persona: "Robot",
        image: "/images/test/deop.png"
    },
    {
        role_key: "APIDeveloper",
        role_name: "API Developer",
        persona: "Shark",
        image: "/images/test/ad.png"
    },
    {
        role_key: "ContactCenterEngineer",
        role_name: "Contact Center Engineer",
        persona: "Elf",
        image: "/images/test/cce.png"
    },
    {
        role_key: "SecurityEngineer",
        role_name: "Security Engineer",
        persona: "Knight",
        image: "/images/test/se.png"
    },
    {
        role_key: "NetworkEngineer",
        role_name: "Network Engineer",
        persona: "Knight",
        image: "/images/test/ne.png"
    },
    {
        role_key: "DatabaseEngineer",
        role_name: "Database Engineer",
        persona: "Knight",
        image: "/images/test/dbe.png"
    },
    {
        role_key: "CloudArchitect",
        role_name: "Cloud Architect",
        persona: "Robot",
        image: "/images/test/ca.png"
    },
    {
        role_key: "HybridMultiCloudArchitect",
        role_name: "Hybrid and Multi-Cloud Architect",
        persona: "Elf",
        image: "/images/test/gm.png"
    },
    {
        role_key: "MachineLearningEngineer",
        role_name: "Machine Learning Engineer",
        persona: "Elf",
        image: "/images/test/mle.png"
    },
    {
        role_key: "CloudEngineer",
        role_name: "Cloud Engineer",
        persona: "Superman-like Man",
        image: "/images/test/ce.png"
    },
    {
        role_key: "CitizenDeveloper",
        role_name: "Citizen Developer",
        persona: "Superman-like Man",
        image: "/images/test/cide.png"
    },
    {
        role_key: "DataEngineer",
        role_name: "Data Engineer",
        persona: "Superman-like Man",
        image: "/images/test/daen.png"
    }
];

const getRoleData = (role: string) => rolesData.find(item => item.role_name === role);

export default function QuizResult({result, restartQuiz}: QuizResultProps) {
    const labels = Object.keys(result);
    const data = Object.values(result);
    const [copied, setCopied] = useState(false);

    const t = useTranslations('QuizResult');

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
            legend: {display: false},
            title: {
                display: true,
                color: '#1F2937',
                font: {size: 18, weight: 'bold' as const},
            },
        },
        scales: {
            x: {
                type: 'category',
                grid: {display: false},
                ticks: {
                    font: {weight: 'bold' as const},
                    color: barColors,
                },
            },
            y: {
                type: 'linear',
                grid: {color: 'rgba(209, 213, 219, 0.4)'},
                ticks: {color: '#1F2937'},
            },
        },
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // повідомлення зникне через 3 сек
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white/60 dark:bg-gray-900/60 rounded-xl shadow-lg mt-8 transition-colors duration-500">
            <motion.h1
                className="text-3xl md:text-4xl text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                🎉 <span className="font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    {t('congratulations')}
                </span>
            </motion.h1>

            <p className="font-extrabold mb-6 text-center text-2xl text-gray-600 my-5">
                {t('yourResult')}
            </p>

            <div className="h-96 mb-6">
                <Bar id="result-chart" data={chartData} options={chartOptions} />
            </div>

            <span className="text-xl font-medium z-20 text-gray-700 dark:text-gray-300">{t('mainProfile')}:</span>
            <div className="flex flex-col items-center mb-6">
                <Badge
                    role={mainRole}
                    imageSrc={getRoleData(mainRole)?.image}
                />
                <h2 className="mt-4 text-center">{mainRole}</h2>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-300 text-sm max-w-xs">
                    { t(`roles.${getRoleData(mainRole)?.role_key}.description`) || t('descriptionUnavailable')}
                </p>
            </div>

            <span className="text-xl font-medium z-20 text-gray-700 dark:text-gray-300">{t('additionalRoles')}:</span>
            <div className="flex flex-wrap justify-center gap-12 mt-4">
                {additionalRoles.length > 0 ? (
                    additionalRoles.map((role, i) => (
                        <div key={i} className="flex flex-col items-center w-44 sm:w-56">
                            <Badge
                                role={role}
                                imageSrc={getRoleData(role)?.image}
                                size="w-44 h-44 sm:w-56 sm:h-56"
                            />
                            <h2 className="mt-4 text-center">{role}</h2>
                            <p className="mt-2 text-center text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                                {t(`roles.${getRoleData(mainRole)?.role_key}.description`) || t('descriptionUnavailable')}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noAdditionalRoles')}</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 mt-12">
                <button
                    onClick={restartQuiz}
                    className="cursor-pointer px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                    {t('retry')}
                </button>
                <div className="relative flex flex-col items-center">
                    <button
                        onClick={handleCopy}
                        className="cursor-pointer px-8 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                    >
                        {t('shareResult')}
                    </button>
                    {copied && (
                        <span className="absolute top-full mt-2 text-sm text-green-600 dark:text-green-400">
                            ✅ {t('linkCopied')}
                        </span>
                    )}
                </div>
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm my-6">
                {t('copyLink')}
            </p>
        </div>
    );}
