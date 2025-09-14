"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import classNames from "classnames";
import Magnetic from "@/components/Magnetic";

export default function HeaderActions({className}: { className?: string }) {
    return (
        <div
            className={classNames(className)}>
            <LocaleSwitcher/>
            <Magnetic><ThemeToggleButton/></Magnetic>
        </div>
    );
}