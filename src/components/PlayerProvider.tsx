'use client';

import React, {createContext, useContext, useState, useRef} from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import {
    PlayIcon,
    PauseIcon,
    XMarkIcon,
    MusicalNoteIcon,
    ListBulletIcon,
    ChevronDownIcon,
    BackwardIcon,
    ForwardIcon,
    ArrowPathIcon
} from "@heroicons/react/24/solid";
import SoundWrapper from "@/components/SoundWrapper";

interface PlayerContextType {
    playing: boolean;
    setPlaying: (val: boolean) => void;
    url: string;
    setUrl: (val: string) => void;
    playedSeconds: number;
    setPlayedSeconds: (val: number) => void;
    open: boolean;
    togglePlayer: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    showPlayer: () => void;
    trackIndex: number;
}

const tracks = [
    {title: "Трек 1", url: "https://www.youtube.com/watch?v=04qpTNRC5-0"},
    {title: "Трек 2", url: "https://www.youtube.com/watch?v=TTccdFybPUo"},
    {title: "Трек 3", url: "https://www.youtube.com/watch?v=IizQs_N52no"},
    {title: "Трек 4", url: "https://www.youtube.com/watch?v=gqI3GNcK_L0"},
    {title: "Трек 5", url: "https://www.youtube.com/watch?v=2y56wHAw_FQ"},
    {title: "Трек 6", url: "https://www.youtube.com/watch?v=fKGc_xaQkUU"},
    {title: "Трек 7", url: "https://www.youtube.com/watch?v=4LRVoGyRIqk"},
];

const PlayerContext = createContext<PlayerContextType>({
    playing: false,
    setPlaying: () => {
    },
    url: "",
    setUrl: () => {
    },
    playedSeconds: 0,
    setPlayedSeconds: () => {
    },
    open: false,
    togglePlayer: () => {
    },
    nextTrack: () => {
    },
    prevTrack: () => {
    },
    showPlayer: () => {
    },
    trackIndex: 0,
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [playing, setPlaying] = useState(true);
    const [url, setUrl] = useState(tracks[0].url);
    const [playedSeconds, setPlayedSeconds] = useState(0);

    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [showList, setShowList] = useState(false);
    const [loop, setLoop] = useState(false);

    const playerRef = useRef(null);

    const togglePlayer = () => setOpen((prev) => !prev);
    const showPlayer = () => {
        setOpen(true);
        setVisible(false);
    };

    const nextTrack = () => {
        const nextIndex = (trackIndex + 1) % tracks.length;
        setTrackIndex(nextIndex);
        setUrl(tracks[nextIndex].url);
        setPlaying(true);
    };

    const prevTrack = () => {
        const prevIndex = (trackIndex - 1 + tracks.length) % tracks.length;
        setTrackIndex(prevIndex);
        setUrl(tracks[prevIndex].url);
        setPlaying(true);
    };

    const selectTrack = (index: number) => {
        setTrackIndex(index);
        setUrl(tracks[index].url);
        setPlaying(true);
        setShowList(false);
    };

    return (
        <PlayerContext.Provider
            value={{
                playing,
                setPlaying,
                url,
                setUrl,
                playedSeconds,
                setPlayedSeconds,
                open,
                togglePlayer,
                nextTrack,
                prevTrack,
                showPlayer,
                trackIndex,
            }}
        >
            {children}

            {!open && (
                <SoundWrapper playOn="click">
                    <button
                        aria-label="Відкрити плеєр"
                        className="cursor-pointer fixed bottom-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50"
                        onClick={showPlayer}
                    >
                        <MusicalNoteIcon className="w-5 h-5 text-white animate-pulse"/>
                    </button>
                </SoundWrapper>
            )}

            {open && (
                <div
                    className={classNames(
                        {invisible: visible},
                        "fixed bottom-4 left-4 w-80 shadow-2xl rounded-xl overflow-hidden z-50 bg-white/90 backdrop-blur-md dark:bg-gray-900/80 transition-all"
                    )}
                >
                    <div
                        className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-white/60 to-gray-100/40 dark:from-black/40 dark:to-gray-800/40">
                        <div className="flex gap-1">
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Попередній трек"
                                    className="cursor-pointer p-2 rounded-lg hover:bg-blue-100/60 dark:hover:bg-blue-800/30 transition"
                                    onClick={prevTrack}
                                >
                                    <BackwardIcon className="w-4 h-4 text-blue-600 dark:text-blue-300"/>
                                </button>
                            </SoundWrapper>
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label={playing ? "Пауза" : "Відтворити"}
                                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200/60 dark:hover:bg-white/6 transition"
                                    onClick={() => setPlaying((prev) => !prev)}
                                >
                                    {playing ? (
                                        <PauseIcon className="w-4 h-4 text-gray-800 dark:text-white"/>
                                    ) : (
                                        <PlayIcon className="w-4 h-4 text-gray-800 dark:text-white"/>
                                    )}
                                </button>
                            </SoundWrapper>
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Наступний трек"
                                    className="cursor-pointer p-2 rounded-lg hover:bg-green-100/60 dark:hover:bg-green-800/30 transition"
                                    onClick={nextTrack}
                                >
                                    <ForwardIcon className="w-4 h-4 text-green-600 dark:text-green-300"/>
                                </button>
                            </SoundWrapper>
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Повтор треку"
                                    className={classNames(
                                        "cursor-pointer p-2 rounded-lg transition",
                                        loop
                                            ? "bg-purple-200 dark:bg-purple-700"
                                            : "hover:bg-purple-100 dark:hover:bg-purple-800/30"
                                    )}
                                    onClick={() => setLoop((prev) => !prev)}
                                >
                                    <ArrowPathIcon
                                        className={classNames(
                                            "w-4 h-4",
                                            loop
                                                ? "text-purple-700 dark:text-purple-300"
                                                : "text-purple-600 dark:text-purple-400"
                                        )}
                                    />
                                </button>
                            </SoundWrapper>
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Показати/приховати список"
                                    className="cursor-pointer p-2 rounded-lg hover:bg-yellow-100/60 dark:hover:bg-yellow-800/30 transition"
                                    onClick={() => setShowList((prev) => !prev)}
                                >
                                    <ListBulletIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-300"/>
                                </button>
                            </SoundWrapper>
                        </div>

                        <div className="flex items-center gap-2">
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Приховати плеєр (залишити відтворення)"
                                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200/60 dark:hover:bg-white/6 transition"
                                    onClick={() => setVisible(true)}
                                >
                                    <ChevronDownIcon className="w-4 h-4 text-gray-700 dark:text-gray-200"/>
                                </button>
                            </SoundWrapper>
                            <SoundWrapper playOn="click">
                                <button
                                    aria-label="Закрити панель"
                                    className="cursor-pointer p-2 rounded-lg hover:bg-red-100/60 dark:hover:bg-red-800/30 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    <XMarkIcon className="w-4 h-4 text-red-600 dark:text-red-300"/>
                                </button>
                            </SoundWrapper>
                        </div>
                    </div>

                    {showList && (
                        <div
                            className="max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                            {tracks.map((t, i) => (
                                <button
                                    key={i}
                                    className={classNames(
                                        "cursor-pointer w-full text-left py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition",
                                        trackIndex === i ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
                                    )}
                                    onClick={() => selectTrack(i)}
                                >
                                    {t.title}
                                </button>
                            ))}
                        </div>
                    )}

                    <ReactPlayer
                        ref={playerRef}
                        src={url}
                        playing={playing}
                        controls={false}
                        width="100%"
                        height="200px"
                        loop={loop}
                        onEnded={() => {
                            if (!loop) nextTrack();
                        }}
                    />
                </div>
            )}

            {open && visible && (
                <SoundWrapper playOn="click">
                    <button
                        aria-label="Показати плеєр"
                        className="cursor-pointer fixed bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-50 animate-pulse-spin"
                        onClick={() => setVisible(false)}
                    >
                        <MusicalNoteIcon className="w-5 h-5 text-white"/>
                        <style jsx>{`
                            @keyframes spinPulse {
                                0% {
                                    transform: rotate(0deg) scale(1);
                                    background-color: #4285f4;
                                }
                                25% {
                                    transform: rotate(90deg) scale(1.1);
                                    background-color: #ea4335;
                                }
                                50% {
                                    transform: rotate(180deg) scale(1);
                                    background-color: #fbbc05;
                                }
                                75% {
                                    transform: rotate(270deg) scale(1.1);
                                    background-color: #34a853;
                                }
                                100% {
                                    transform: rotate(360deg) scale(1);
                                    background-color: #4285f4;
                                }
                            }

                            .animate-pulse-spin {
                                animation: spinPulse 4s infinite linear;
                            }
                        `}</style>
                    </button>
                </SoundWrapper>
            )}
        </PlayerContext.Provider>
    );
};
