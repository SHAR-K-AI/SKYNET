'use client';

import { useTheme } from 'next-themes';
import StarryBackground from "@/components/StarryBackground";
import SkyBackground from "@/components/SkyBackground";

export default function ThemeBackground() {
    const { theme } = useTheme();

    return (
        <>
            {theme === 'dark' ? <StarryBackground /> : <SkyBackground />}
        </>
    );
}
