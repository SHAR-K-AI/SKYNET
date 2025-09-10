// components/QuizQuestion.tsx
'use client';
import { motion, AnimatePresence } from "framer-motion";
import AppImage from "@/components/Image";

interface Option {
    text: string;
    categories: string[];
    hint: string;
}

interface QuizQuestionProps {
    question: string;
    image: string;
    options: Option[];
    handleAnswer: (categories: string[]) => void;
    keyId: number;
}

export default function QuizQuestion({ question, image, options, handleAnswer, keyId }: QuizQuestionProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={keyId}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-6 border rounded-3xl shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700"
            >
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{question}</h2>
                <div className="mb-6 overflow-hidden rounded-2xl shadow-inner">
                    <AppImage
                        src={image}
                        alt="quiz"
                        width={400}
                        height={200}
                        className="w-full object-cover rounded-2xl"
                    />
                </div>
                <div className="space-y-4">
                    {options.map((opt, i) => (
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
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{opt.hint}</div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
