'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const SkyBackground = dynamic(() => import('@/components/SkyBackground'), { ssr: false });
const StarryBackground = dynamic(() => import('@/components/StarryBackground'), { ssr: false });

export default function ThemeBackground() {
    const { theme } = useTheme();

    return (
        <>
            {theme === 'dark' ? <StarryBackground /> : <SkyBackground />}
        </>
    );
}
