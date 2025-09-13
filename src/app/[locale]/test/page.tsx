'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import QuizIntro from "@/components/QuizIntro";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResult from "@/components/QuizResult";
import ProgressBar from "@/components/ProgressBar";
import Spinner from "@/components/Spinner";

interface OptionType {
    text: string;
    categories: string[];
    hint?: string;
}

interface QuestionType {
    question: string;
    image?: string;
    options: OptionType[];
}

export default function GcpRoleQuiz() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [current, setCurrent] = useState<number>(-1);
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Record<string, number> | null>(null);

    useEffect(() => {
        fetch("/api/test")
            .then(res => res.json())
            .then((data: QuestionType[]) => setQuestions(data))
            .catch(() => setQuestions([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const encodedResult = searchParams.get("result");
        if (encodedResult) {
            try {
                const decoded: Record<string, number> = JSON.parse(atob(encodedResult));
                setResult(decoded);
            } catch (e) {
                console.error(e);
            }
        }
    }, [searchParams]);

    const handleAnswer = (categories: string[]) => {
        const updatedAnswers = [...answers, ...categories];
        setAnswers(updatedAnswers);

        if (current + 1 < questions.length) setCurrent(current + 1);
        else calculateResult(updatedAnswers);
    };

    const calculateResult = (categories: string[]) => {
        const roleToRIASEC: Record<string, string[]> = {
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

        const riasecCounts: Record<string, number> = {};
        categories.forEach(c => riasecCounts[c] = (riasecCounts[c] || 0) + 1);

        const roleScores: Record<string, number> = {};
        Object.entries(roleToRIASEC).forEach(([role, cats]) => {
            let score = 0;
            cats.forEach(c => score += riasecCounts[c] || 0);
            roleScores[role] = score;
        });

        setResult(roleScores);
        const encoded = btoa(JSON.stringify(roleScores));
        router.replace(`?result=${encoded}`);
    };

    const startQuiz = () => setCurrent(0);
    const restartQuiz = () => {
        setCurrent(-1);
        setAnswers([]);
        setResult(null);
        router.replace("/test");
    };

    if (loading) return (
        <Spinner/>
    );

    if (!questions.length) return (
        <div className="flex justify-center items-center h-screen">
            <p>Немає доступних питань.</p>
        </div>
    );

    if (result) return <QuizResult result={result} restartQuiz={restartQuiz}/>;
    if (current === -1) return <QuizIntro startQuiz={startQuiz}/>;

    const q = questions[current];
    if (!q) return null;

    const progress = Math.round(((current + 1) / questions.length) * 100);

    return (
        <div className="max-w-4xl mx-auto overflow-hidden">
            <ProgressBar progress={progress}/>
            <div className="text-right text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                {current + 1} з {questions.length}
            </div>

            <QuizQuestion
                keyId={current}
                question={q.question || ""}
                image={q.image || ""}
                options={q.options.map(opt => ({
                    ...opt,
                    hint: opt.hint || ""
                }))}
                handleAnswer={handleAnswer}
            />
        </div>
    );
}
