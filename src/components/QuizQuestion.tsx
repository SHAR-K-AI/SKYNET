'use client';

import {motion} from "framer-motion";
import AppImage from "@/components/Image";
import {useEffect, useMemo} from "react";

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

type Decoration = {
    id: string;
    top: number;
    left: number;
    height: number;
    width: number;
    duration: number;
    delay: number;
};

export default function QuizQuestion(
    {
        question,
        image,
        options,
        handleAnswer,
        keyId
    }: QuizQuestionProps
) {
    useEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [keyId]);

    const decorations = useMemo<Decoration[]>(() => {
        const items: Decoration[] = [];
        const count = 25;
        for (let i = 0; i < count; i++) {
            items.push({
                id: `lightning-${i}-${Math.random()}`,
                top: Math.random() * 90,
                left: Math.random() * 90,
                height: Math.random() * 60 + 20,
                width: Math.random() * 2 + 1,
                duration: Math.random() * 2 + 1,
                delay: Math.random() * 1,
            });
        }
        return items;
    }, [keyId]);

    return (
        <motion.div
            key={keyId}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
            className="p-6 ov rounded-3xl bg-gradient-to-b from-white to-gray-50
                 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 opacity-85"
        >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {question}
            </h2>

            <div className="relative mb-6 overflow-hidden rounded-2xl shadow-inner">
                <AppImage
                    src={image}
                    alt="quiz"
                    width={400}
                    height={200}
                    className="w-full object-cover rounded-2xl"
                />

                {decorations.map((d) => (
                    <motion.div
                        key={d.id}
                        className="absolute bg-white rounded-sm blur-sm"
                        style={{
                            top: `${d.top}%`,
                            left: `${d.left}%`,
                            height: d.height,
                            width: d.width,
                            opacity: 0.7
                        }}
                        animate={{
                            y: [0, 60, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 1, 0.2]
                        }}
                        transition={{
                            duration: d.duration,
                            delay: d.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="space-y-4">
                {options.map((opt, i) => (
                    <motion.button
                        whileHover={{scale: 1.02, boxShadow: "0 0 16px rgba(59,130,246,0.4)"}}
                        whileTap={{scale: 0.98}}
                        key={i}
                        onClick={() => handleAnswer(opt.categories)}
                        className="w-full text-left p-5 rounded-xl border-2 shadow-sm cursor-pointer
              hover:bg-blue-50 dark:hover:bg-gray-700
              bg-white dark:bg-gray-900
              border-gray-200 dark:border-gray-700
              text-gray-900 dark:text-gray-100 transition-all"
                    >
                        <div className="font-medium text-lg">{opt.text}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{opt.hint}</div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
