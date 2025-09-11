import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import SoundWrapper from "@/components/SoundWrapper";
import HeaderActions from "@/components/HeaderActions";
import { useTheme } from "next-themes";

const menuItems = [
    "home",
    "about",
    "questions",
    "test",
    "zodiac-roles",
    "links",
    // "arcade-calculator",
    "blog",
    "trending",
];

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.05, type: "spring", stiffness: 100 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

function formatLabel(str: string) {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function AnimatedWord({ word }: { word: string }) {
    return (
        <span className="inline-block mr-1">
            {word.split("").map((letter, idx) => (
                <span
                    key={idx}
                    className="inline-block transition-colors duration-300 text-gray-900 dark:text-gray-100 group-hover:[color:var(--hover-color)]"
                    style={{ ["--hover-color" as any]: colors[idx % colors.length] }}
                >
                    {letter}
                </span>
            ))}
        </span>
    );
}

export default function MenuNav({
                                    locale,
                                    t,
                                    toggleMenu,
                                }: {
    locale: string;
    t: any;
    toggleMenu: () => void;
}) {
    const { theme } = useTheme();
    const src = theme === "dark" ? "/images/dark.gif" : "/images/light.gif";

    return (
        <motion.nav
            className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 shadow-xl z-50 p-6 flex flex-col"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80 }}
        >
            <HeaderActions className="flex items-center justify-between flex-row gap-4 md:mb-32 mb-auto" />
            <ul className="flex flex-col gap-6 text-xl font-bold">
                {menuItems.map((key, i) => {
                    const label = t(key) || formatLabel(key);
                    const href = `/${locale}/${key === "home" ? "" : key}`;

                    return (
                        <motion.li
                            key={key}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SoundWrapper playOn="click">
                                <Link
                                    href={href}
                                    onClick={toggleMenu}
                                    className="group inline-block transform transition-transform duration-300 hover:scale-110"
                                >
                                    {label.split(" ").map((word: string, idx: number) => (
                                        <AnimatedWord key={idx} word={word} />
                                    ))}
                                </Link>
                            </SoundWrapper>
                        </motion.li>
                    );
                })}
            </ul>
            <div className="mt-auto mx-auto">
                <Image
                    src={src}
                    width={200}
                    height={100}
                    alt="Footer Image"
                    className="object-contain"
                />
            </div>
        </motion.nav>
    );
}
