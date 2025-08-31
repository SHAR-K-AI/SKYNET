'use client';

import React, { useState, useEffect } from 'react';

export interface FormData {
    title: string;
    link: string;
    imageUrl: string;
    description: string;
    content: string;
}

interface RecordFormProps {
    initialData?: FormData;
    onSubmit: (data: FormData) => void;
}

export default function RecordForm({ initialData, onSubmit }: RecordFormProps) {
    const [form, setForm] = useState<FormData>({
        title: '',
        link: '',
        imageUrl: '',
        description: '',
        content: '',
    });

    useEffect(() => {
        if (initialData) setForm({ ...initialData });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...form });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Додати запис</h2>

            <input
                name="title"
                placeholder="Назва"
                value={form.title}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <input
                name="link"
                placeholder="Посилання"
                value={form.link}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <input
                name="imageUrl"
                placeholder="URL картинки"
                value={form.imageUrl}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <textarea
                name="description"
                placeholder="Короткий опис"
                value={form.description}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <textarea
                name="content"
                placeholder="Повний опис"
                value={form.content}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

            <button
                type="submit"
                className="mt-2 py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 dark:hover:bg-indigo-400 transition shadow-md hover:shadow-lg"
            >
                Зберегти
            </button>
        </form>
    );
}
