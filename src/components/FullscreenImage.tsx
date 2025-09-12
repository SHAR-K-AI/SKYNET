'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface FullscreenImageProps {
    src: string;
    alt: string;
    role: string;
    onClose: () => void;
}

const FullscreenImage = ({ src, alt, role, onClose }: FullscreenImageProps) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <motion.div
                className="relative max-w-[95%] max-h-[95%] flex flex-col items-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close image"
                    className="absolute top-2 right-2 z-50 rounded-full bg-white/20 backdrop-blur px-2 py-1 hover:bg-white/30"
                >
                    ✕
                </button>

                <img
                    src={src || '/images/placeholder.png'}
                    alt={alt}
                    className="max-h-[80vh] max-w-[80vw] rounded-xl object-contain shadow-2xl"
                    draggable={false}
                />

                <div className="mt-4 text-center text-white">
                    <div className="font-bold text-lg">{role}</div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FullscreenImage;