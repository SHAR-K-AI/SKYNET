'use client';

import AppImage from "@/components/Image";
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useMemo, useCallback } from 'react';
import { DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface CardProps {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, content, link }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const domain = useMemo(() => {
        try {
            return new URL(link).hostname;
        } catch {
            return link;
        }
    }, [link]);

    const handleCopy = useCallback(
        (e: React.MouseEvent | React.KeyboardEvent) => {
            e.stopPropagation();
            navigator.clipboard.writeText(link).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
        },
        [link]
    );

    const CopyLinkButton = () => (
        <div className="flex items-center gap-1 p-1 rounded justify-between">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm p-1 rounded-md hover:scale-110 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md hover:bg-white/100 dark:hover:bg-gray-800/80 transition"
            >
                {domain}
            </a>
            <button
                onClick={handleCopy}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleCopy(e) : undefined)}
                aria-label="Скопіювати посилання"
                className="w-5 h-5 text-gray-800 dark:text-gray-200 hover:text-green-500 cursor-pointer transition-transform duration-200 hover:scale-110"
            >
                <DocumentDuplicateIcon />
            </button>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="relative flex flex-col cursor-pointer bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 rounded-xl p-4 shadow-lg dark:shadow-[0_4px_15px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:rotate-1 hover:z-10 transform-gpu will-change-transform focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <div className="relative w-full h-44 mb-4 rounded overflow-hidden transition-transform duration-300">
                    <AppImage src={imageUrl} alt={title} fill style={{ objectFit: 'contain' }} />
                </div>

                <h3 className="font-bold text-lg mb-2 text-left">{title}</h3>
                <p className="text-sm mb-2 text-left">{description}</p>

                <div className="mt-auto pt-2">
                    <CopyLinkButton />
                </div>

                {copied && (
                    <div className="absolute top-2 right-2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded">
                        Скопійовано!
                    </div>
                )}
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 max-w-md w-full relative shadow-lg dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/60 dark:scrollbar-thumb-gray-600/60 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                                <Dialog.Title className="font-bold text-xl mb-2">{title}</Dialog.Title>

                                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                                    <AppImage src={imageUrl} alt={title} fill style={{ objectFit: 'contain' }} />
                                </div>

                                <p className="text-sm mb-4">{content}</p>

                                <CopyLinkButton />

                                {copied && (
                                    <div className="bg-gray-900/90 text-white text-xs px-2 py-1 rounded mt-2">
                                        Скопійовано!
                                    </div>
                                )}

                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Закрити модал"
                                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Card;
