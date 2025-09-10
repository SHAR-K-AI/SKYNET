'use client';

interface ProgressBarProps {
    progress: number; // від 0 до 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
