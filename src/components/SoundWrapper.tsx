'use client';

import {useRef, ReactNode} from "react";

type SoundWrapperProps = {
    children: ReactNode;
    sound?: string;
    playOn?: "click" | "hover";
    className?: string;
    onClick?: () => void;
};

export default function SoundWrapper(
    {
        children,
        sound = "/google-tone.mp3",
        playOn = "click",
        className,
        onClick
    }: SoundWrapperProps
) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {
            });
        }
    };

    const handlers =
        playOn === "click"
            ? {
                onClick: () => {
                    playSound();
                    onClick?.();
                }
            }
            : {onMouseEnter: playSound};

    return (
        <div {...handlers} className={className}>
            {children}
            <audio ref={audioRef} src={sound} preload="auto"/>
        </div>
    );
}
