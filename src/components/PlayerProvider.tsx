'use client';

import React, { createContext, useContext, useState, useRef } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { PlayIcon, PauseIcon, XMarkIcon, ArrowRightIcon, MusicalNoteIcon, ListBulletIcon } from "@heroicons/react/24/solid";

interface PlayerContextType {
    playing: boolean;
    setPlaying: (val: boolean) => void;
    url: string;
    setUrl: (val: string) => void;
    playedSeconds: number;
    setPlayedSeconds: (val: number) => void;
    visible: boolean;
    toggleVisible: () => void;
    nextTrack: () => void;
    showPlayer: () => void;
}

const tracks = [
    { title: "Трек 1", url: "https://www.youtube.com/watch?v=04qpTNRC5-0" },
    { title: "Трек 2", url: "https://www.youtube.com/watch?v=TTccdFybPUo" },
    { title: "Трек 3", url: "https://www.youtube.com/watch?v=IizQs_N52no" },
    { title: "Трек 3", url: "https://www.youtube.com/watch?v=gqI3GNcK_L0" },
    { title: "Трек 3", url: "https://www.youtube.com/watch?v=2y56wHAw_FQ" },
    { title: "Трек 3", url: "https://www.youtube.com/watch?v=fKGc_xaQkUU" },
    { title: "Трек 3", url: "https://www.youtube.com/watch?v=4LRVoGyRIqk" },
];

const PlayerContext = createContext<PlayerContextType>({
    playing: false,
    setPlaying: () => {},
    url: "",
    setUrl: () => {},
    playedSeconds: 0,
    setPlayedSeconds: () => {},
    visible: false,
    toggleVisible: () => {},
    nextTrack: () => {},
    showPlayer: () => {},
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [playing, setPlaying] = useState(true);
    const [url, setUrl] = useState(tracks[0].url);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [visible, setVisible] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [showList, setShowList] = useState(false);

    const playerRef = useRef(null);

    const toggleVisible = () => setVisible(prev => !prev);
    const showPlayer = () => setVisible(true);

    const nextTrack = () => {
        const nextIndex = (trackIndex + 1) % tracks.length;
        setTrackIndex(nextIndex);
        setUrl(tracks[nextIndex].url);
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
            value={{ playing, setPlaying, url, setUrl, playedSeconds, setPlayedSeconds, visible, toggleVisible, nextTrack, showPlayer }}
        >
            {children}

            {/* Кнопка для показу плеєра */}
            {!visible && (
                <button
                    className="fixed bottom-6 left-6 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:bg-blue-600 z-50"
                    onClick={showPlayer}
                >
                    <MusicalNoteIcon className="w-8 h-8 text-white" />
                </button>
            )}

            {/* Плеєр */}
            {visible && (
                <div className="fixed bottom-4 left-4 w-80 shadow-2xl rounded-xl overflow-hidden z-50 bg-white dark:bg-gray-900">
                    {/* Кнопки над плеєром */}
                    <div className="flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-800">
                        <button
                            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={() => setPlaying(!playing)}
                        >
                            {playing ? <PauseIcon className="w-6 h-6 text-gray-800 dark:text-white"/> : <PlayIcon className="w-6 h-6 text-gray-800 dark:text-white"/>}
                        </button>
                        <button
                            className="p-2 rounded hover:bg-green-200 dark:hover:bg-green-700"
                            onClick={nextTrack}
                        >
                            <ArrowRightIcon className="w-6 h-6 text-green-600 dark:text-green-300"/>
                        </button>
                        <button
                            className="p-2 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700"
                            onClick={() => setShowList(!showList)}
                        >
                            <ListBulletIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-300"/>
                        </button>
                        <button
                            className="p-2 rounded hover:bg-red-200 dark:hover:bg-red-700"
                            onClick={toggleVisible}
                        >
                            <XMarkIcon className="w-6 h-6 text-red-600 dark:text-red-300"/>
                        </button>
                    </div>

                    {/* Список треків */}
                    {showList && (
                        <div className="max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-800 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                            {tracks.map((t, i) => (
                                <button
                                    key={i}
                                    className={classNames(
                                        "w-full text-left py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700",
                                        trackIndex === i ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
                                    )}
                                    onClick={() => selectTrack(i)}
                                >
                                    {t.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Плеєр без контролів */}
                    <ReactPlayer
                        ref={playerRef}
                        src={url}
                        playing={playing}
                        controls={false}
                        width="100%"
                        height="200px"
                    />
                </div>
            )}
        </PlayerContext.Provider>
    );
};
