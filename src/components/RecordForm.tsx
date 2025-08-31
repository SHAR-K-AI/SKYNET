'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export interface LocalizedField {
    ua: string;
    en: string;
}

export interface FormData {
    title: LocalizedField;
    link: string;
    imageUrl: string;
    description: LocalizedField;
    content: LocalizedField;
}

interface RecordFormProps {
    initialData?: FormData;
    onSubmit: (data: FormData) => void;
}

export default function RecordForm({ initialData, onSubmit }: RecordFormProps) {
    const t = useTranslations('RecordForm');

    const [form, setForm] = useState<FormData>({
        title: { ua: '', en: '' },
        link: '',
        imageUrl: '',
        description: { ua: '', en: '' },
        content: { ua: '', en: '' },
    });

    useEffect(() => {
        if (initialData) setForm({ ...initialData });
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field?: keyof LocalizedField,
        key?: keyof FormData
    ) => {
        if (key && field) {
            setForm({
                ...form,
                [key]: {
                    ...form[key] as LocalizedField,
                    [field]: e.target.value,
                },
            });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...form });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t('addRecord')}
            </h2>

            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-3">
                    <input
                        placeholder={t('titleUA')}
                        value={form.title.ua}
                        onChange={(e) => handleChange(e, 'ua', 'title')}
                        required
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <textarea
                        placeholder={t('descriptionUA')}
                        value={form.description.ua}
                        onChange={(e) => handleChange(e, 'ua', 'description')}
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <textarea
                        placeholder={t('contentUA')}
                        value={form.content.ua}
                        onChange={(e) => handleChange(e, 'ua', 'content')}
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-3">
                    <input
                        placeholder={t('titleEN')}
                        value={form.title.en}
                        onChange={(e) => handleChange(e, 'en', 'title')}
                        required
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <textarea
                        placeholder={t('descriptionEN')}
                        value={form.description.en}
                        onChange={(e) => handleChange(e, 'en', 'description')}
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                    <textarea
                        placeholder={t('contentEN')}
                        value={form.content.en}
                        onChange={(e) => handleChange(e, 'en', 'content')}
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                </div>
            </div>

            <input
                name="link"
                placeholder={t('link')}
                value={form.link}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
            />

            <input
                name="imageUrl"
                placeholder={t('imageUrl')}
                value={form.imageUrl}
                onChange={handleChange}
                className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
            />

            <button
                type="submit"
                className="mt-4 py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500"
            >
                {t('save')}
            </button>
        </form>
    );
}
