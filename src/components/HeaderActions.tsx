"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function HeaderActions() {
    return (
        <div className="fixed top-10 right-5 flex items-center justify-center flex-col gap-4">
            <LocaleSwitcher />
            <ThemeToggleButton />
        </div>
    );
}