'use client';

import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useEffect, useState} from 'react';
import AppImage from "@/components/Image";
import {useLocale} from "next-intl";
import Magnetic from "@/components/Magnetic";

interface LinkItem {
    type: 'youtube' | 'card' | 'link';
    title: string;
    description?: string;
    url: string;
    imageUrl?: string;
}

export default function LinksPage() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [selected, setSelected] = useState<LinkItem | null>(null);
    const [loading, setLoading] = useState(true);
    const locale = useLocale();

    useEffect(() => {
        fetch(`/api/links?lang=${locale}`)
            .then(res => res.json())
            .then(data => setLinks(data))
            .catch(() => setLinks([]))
            .finally(() => setLoading(false));
    }, [locale]);

    const handleCopy = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('Скопійовано: ' + url);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300">Завантаження...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:from-gray-900 dark:to-gray-950 py-10 px-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
                🌐 Цікаві посилання
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {links.map((item, idx) => (

                    <div
                        key={idx}
                        className="relative cursor-pointer p-4 rounded-xl bg-white/60 dark:bg-gray-800/50
                       shadow-md hover:shadow-lg hover:scale-[1.01] transition"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div onClick={() => setSelected(item)} className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                            <Magnetic>
                                <div
                                    className="relative h-16 w-16 flex-shrink-0 cursor-pointer hover:scale-110 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy(item.url);
                                    }}
                                >

                                    <AppImage
                                        src="/images/click.png"
                                        alt={item.title}
                                        fill
                                        style={{objectFit: 'contain'}}
                                        className="bg-white/90 rounded-md"
                                    />

                                </div>
                            </Magnetic>
                        </div>
                    </div>
                ))}
            </div>

            <Transition appear show={!!selected} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setSelected(null)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"/>
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-xl w-full shadow-lg">
                                {selected && (
                                    <>
                                        <Dialog.Title
                                            className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                            {selected.title}
                                        </Dialog.Title>

                                        {selected.type === 'youtube' && (
                                            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                                <iframe
                                                    src={selected.url}
                                                    title={selected.title}
                                                    allowFullScreen
                                                    className="w-full h-full"
                                                />
                                            </div>
                                        )}

                                        {selected.type === 'card' && (
                                            <div className="flex justify-center items-center gap-4 mb-4">
                                                {selected.imageUrl && (
                                                    <AppImage
                                                        width={150}
                                                        alt={selected.title}
                                                        src={selected.imageUrl}
                                                        className="object-cover rounded-lg"
                                                    />
                                                )}
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {selected.description}
                                                </p>

                                            </div>
                                        )}
                                        <a
                                            href={selected.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                                        >
                                            {selected.url}
                                        </a>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
