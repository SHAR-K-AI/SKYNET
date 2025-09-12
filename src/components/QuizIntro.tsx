'use client';

import AppImage from "@/components/Image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface QuizIntroProps {
    startQuiz: () => void;
}

const RIASEC_COLORS: Record<string, string> = {
    R: "text-blue-500",
    I: "text-red-500",
    A: "text-yellow-500",
    S: "text-blue-500",
    E: "text-green-500",
    C: "text-red-500",
};

const RIASECLetters = () => (
    <>
        {["R", "I", "A", "S", "E", "C"].map((letter) => (
            <span key={letter} className={`${RIASEC_COLORS[letter]} font-extrabold mr-2`}>
                {letter}
            </span>
        ))}
    </>
);

interface RIASECCardProps {
    type: string;
    title: string;
    description: string;
}

const RIASECCard = ({ type, title, description }: RIASECCardProps) => (
    <article className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition duration-300">
        <div className="flex items-center mb-2">
            <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${RIASEC_COLORS[type]} bg-gray-200 dark:bg-gray-100  font-extrabold mr-3`}
            >
                {type}
            </div>

            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-left">{description}</p>
    </article>
);


export default function QuizIntro({ startQuiz }: QuizIntroProps) {
    const t = useTranslations("QuizIntro");

    const RIASEC_KEYS = ["R", "I", "A", "S", "E", "C"];

    return (
        <section className="max-w-4xl mx-auto p-6 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl mt-10">
            <motion.h1
                className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-green-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {t("title")}
            </motion.h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{t("intro")}</p>

            <AppImage
                src="/images/test.png"
                alt="cloud career quiz"
                width={700}
                height={400}
                className="w-full h-auto object-cover rounded-xl shadow-lg mb-6"
            />

            <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
                {t.rich("about-1")}
                <a
                    href="https://en.wikipedia.org/wiki/Holland_Codes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                >
                    <RIASECLetters />
                </a>
                {t.rich("about-2")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {RIASEC_KEYS.map((key) => (
                    <RIASECCard
                        key={key}
                        type={key}
                        title={t(`riasec.${key}.title`)}
                        description={t(`riasec.${key}.description`)}
                    />
                ))}
            </div>

            <button
                onClick={startQuiz}
                className="cursor-pointer w-full sm:w-auto px-12 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
                {t("start")}
            </button>
        </section>
    );
}