'use client';

import tracks from "@/../data/tracks.json";

import classNames from "classnames";
import ReactPlayer from "react-player";
import React, {createContext, useContext, useState, useRef, useEffect} from "react";

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
    const [searchQuery, setSearchQuery] = useState("");

    const playerRef = useRef(null);

    const trackRefs = useRef<HTMLButtonElement[]>([]);
    trackRefs.current = [];

    const addToRefs = (el: HTMLButtonElement) => {
        if (el && !trackRefs.current.includes(el)) {
            trackRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (trackRefs.current[trackIndex]) {
            trackRefs.current[trackIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [trackIndex, showList]);

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

    const selectTrack = (title: string) => {
        const foundIndex = tracks.findIndex((t) => t.title === title);
        if (foundIndex !== -1) {
            setTrackIndex(foundIndex);
            setUrl(tracks[foundIndex].url);
            setPlaying(true);
            setShowList(false);
        }
    };


    const filteredTracks = tracks.filter((t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">
                    {part}
                </mark>
            ) : (
                part
            )
        );
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
                        className="fixed bottom-6 left-6 w-12 h-12 rounded-full
  flex items-center justify-center cursor-pointer
  bg-gradient-to-br from-blue-500 to-indigo-600
  shadow-2xl transform transition duration-150 ease-in-out
  hover:scale-105 hover:from-yellow-400 hover:to-yellow-600
  z-50"
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
                            className="bg-gray-50 dark:bg-gray-900 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                            <input
                                type="text"
                                value={searchQuery}
                                placeholder="Пошук треку..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full mb-2 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                            <div className="max-h-72 overflow-y-auto">
                                {filteredTracks.map((t, i) => (
                                    <button
                                        key={t.title}
                                        ref={addToRefs}
                                        onClick={() => selectTrack(t.title)}
                                        className={classNames(
                                            "w-full flex flex-col justify-between py-2 px-3 mb-1 rounded-lg transition-all duration-200 cursor-pointer",
                                            "hover:bg-gradient-to-r hover:from-blue-100/50 hover:to-indigo-100/50 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40",
                                            trackIndex === i
                                                ? "bg-blue-200/40 dark:bg-blue-700/40 font-semibold"
                                                : "bg-white/0 dark:bg-gray-900/0"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                        <span className="text-gray-800 dark:text-gray-100 truncate" title={t.title}>
                                            {highlightText(t.title, searchQuery)}
                                        </span>
                                        </div>
                                        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-1">
                                        {t.genre}
                                    </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )} <ReactPlayer
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
