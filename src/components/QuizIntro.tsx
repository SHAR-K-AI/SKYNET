'use client';

import AppImage from "@/components/Image";
import { motion } from "framer-motion";

interface QuizIntroProps {
    startQuiz: () => void;
}

export default function QuizIntro({ startQuiz }: QuizIntroProps) {
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
            {/* RIASEC cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
                {["R","I","A","S","E","C"].map(type => (
                    <div key={type} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-bold text-blue-500">{type}:</span> {type === "R" ? "Реалістичний" : type === "I" ? "Дослідницький" : type === "A" ? "Артистичний" : type === "S" ? "Соціальний" : type === "E" ? "Підприємливий" : "Традиційний"}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {type === "R" ? "Практичні завдання, робота руками." :
                                type === "I" ? "Аналіз, дослідження, вирішення проблем." :
                                    type === "A" ? "Креативність, візуалізація, інновації." :
                                        type === "S" ? "Спілкування, допомога, командна робота." :
                                            type === "E" ? "Лідерство, управління, досягнення цілей." :
                                                "Організація, систематизація, структурованість."}
                        </p>
                    </div>
                ))}
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
