'use client';

import AppImage from "@/components/Image";
import { useTranslations } from "next-intl";
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

const CopyLinkButton: React.FC<{
    link: string;
    domain: string;
    onCopy: () => void;
}> = ({ link, domain, onCopy }) => (
    <div className="flex items-center gap-1 p-1 rounded justify-between">
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-sm hover:scale-110 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md hover:bg-white/60 dark:hover:bg-gray-800/60 transition cursor-pointer p-1 rounded-md"
            onClick={(e) => e.stopPropagation()}
        >
            {domain}
        </a>
        <DocumentDuplicateIcon
            onClick={(e) => {
                e.stopPropagation();
                onCopy();
            }}
            className="w-5 h-5 text-white dark:text-gray-200 hover:text-green-500 cursor-pointer transition-transform duration-200 hover:scale-110"
        />
    </div>
);

const CopiedToast: React.FC<{ show: boolean; inline?: boolean; text: string }> = ({ show, inline, text }) => (
    <Transition
        show={show}
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
    >
        <div
            className={`bg-gray-900/70 text-white text-xs px-2 py-1 rounded 
                ${inline ? "mt-2" : "absolute top-2 right-2"}`
            }
        >
            {text}
        </div>
    </Transition>
);

const Card: React.FC<CardProps> = ({ title, description, imageUrl, content, link }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const t = useTranslations("Card");

    const domain = useMemo(() => {
        try {
            return new URL(link).hostname;
        } catch {
            return link;
        }
    }, [link]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [link]);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="relative cursor-pointer flex flex-col bg-white/50 dark:bg-gray-800/40 backdrop-blur-sm
                text-gray-900 dark:text-gray-100 rounded-xl p-4 shadow-lg dark:shadow-[0_4px_15px_rgba(255,255,255,0.15)]
                transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:rotate-1 hover:z-10
                transform-gpu will-change-transform"
            >
                <div className="relative w-full h-44 mb-4 rounded overflow-hidden transition-transform duration-300">
                    <AppImage src={imageUrl} alt={title} fill style={{ objectFit: 'contain' }} />
                </div>

                <div className="font-bold text-lg mb-2">{title}</div>
                <p className="text-sm mb-2">{description}</p>

                <CopiedToast show={copied} text={t("copied")} />

                <div className="mt-auto pt-2">
                    <CopyLinkButton link={link} domain={domain} onCopy={handleCopy} />
                </div>
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
                                className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl
                                p-6 max-w-md w-full relative shadow-lg dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                                max-h-[80vh] flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <Dialog.Title className="font-bold text-xl">{title}</Dialog.Title>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        title={t("close")}
                                    >
                                        <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                                    </button>
                                </div>

                                <div className="overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400/60
                                    dark:scrollbar-thumb-gray-600/60 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                                    <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden">
                                        <AppImage src={imageUrl} alt={title} fill style={{ objectFit: 'contain' }} />
                                    </div>

                                    <p className="text-sm mb-4">{content}</p>
                                    <CopiedToast show={copied} inline text={t("copied")} />
                                    <CopyLinkButton link={link} domain={domain} onCopy={handleCopy} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Card;
