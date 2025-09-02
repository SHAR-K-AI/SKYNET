"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import classNames from "classnames";

export default function HeaderActions({className}: { className?: string }) {
    return (
        <div
            className={classNames(className)}>
            <LocaleSwitcher/>
            <ThemeToggleButton/>
        </div>
    );
}