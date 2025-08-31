'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment, useState, useMemo, useCallback } from 'react';
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocale } from 'next-intl';

export interface LocalizedText {
    ua: string;
    en: string;
}

export interface CardProps {
    title: LocalizedText;
    description: LocalizedText;
    content: LocalizedText;
    imageUrl: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, content, link }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const locale = useLocale() as keyof LocalizedText; // "ua" | "en"

    const domain = useMemo(() => {
        try {
            return new URL(link).hostname;
        } catch {
            return link;
        }
    }, [link]);

    const handleCopy = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            navigator.clipboard.writeText(link).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            });
        },
        [link]
    );

    const CopyLinkButton = () => (
        <div className="flex items-center gap-1 p-1 rounded justify-end">
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm bg-white/40 dark:bg-gray-800/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-gray-800/60 transition cursor-pointer p-1 rounded-md"
                onClick={(e) => e.stopPropagation()}
            >
                {domain}
            </a>
            <ClipboardIcon
                onClick={handleCopy}
                className="w-5 h-5 text-white dark:text-gray-200 hover:text-green-500 cursor-pointer"
            />
        </div>
    );

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="relative cursor-pointer bg-white/50 dark:bg-gray-800/40 backdrop-blur-md text-gray-900 dark:text-gray-100 rounded-xl p-4
                   shadow-lg dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-2xl transition duration-300"
            >
                <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
                    <Image src={imageUrl} alt={title[locale]} fill style={{ objectFit: 'contain' }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{title[locale]}</h3>
                <p className="text-sm mb-2">{description[locale]}</p>

                <CopyLinkButton />

                {copied && (
                    <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded">
                        Скопійовано!
                    </div>
                )}
            </div>

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
                            <Dialog.Panel
                                className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 max-w-md w-full relative
                           shadow-lg dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                           max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/60 dark:scrollbar-thumb-gray-600/60 scrollbar-track-transparent scrollbar-thumb-rounded-full"
                            >
                                <Dialog.Title className="font-bold text-xl mb-2">{title[locale]}</Dialog.Title>

                                <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                                    <Image src={imageUrl} alt={title[locale]} fill style={{ objectFit: 'contain' }} />
                                </div>

                                <p className="text-sm mb-4">{content[locale]}</p>

                                <CopyLinkButton />

                                {copied && (
                                    <div className="bg-gray-900/70 text-white text-xs px-2 py-1 rounded mt-2">
                                        Скопійовано!
                                    </div>
                                )}

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                    title="Закрити"
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
