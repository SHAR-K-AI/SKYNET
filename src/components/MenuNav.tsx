import { motion, Variants } from "framer-motion";

const menuItems = [
    'home', 'about', 'contact', 'questions',
    'cloud-map', 'links', 'arcade-calculator'
];

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.05, type: 'spring', stiffness: 100 },
    }),
    exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

function formatLabel(str: string) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function MenuNav({ locale, t, toggleMenu }: { locale: string, t: any, toggleMenu: () => void }) {
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

    return (
        <motion.nav
            className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 shadow-xl z-50 p-6 flex flex-col justify-center"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 80 }}
        >
            <ul className="flex flex-col gap-6 text-xl font-bold">
                {menuItems.map((key: string, i: number) => {
                    const label = t(key) || formatLabel(key);
                    const words = label.split(' ');

                    return (
                        <motion.li
                            key={key}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <a
                                href={`/${locale}/${key === 'home' ? '' : key}`}
                                onClick={toggleMenu}
                                className="inline-block transform transition-transform duration-300 hover:scale-110"
                            >
                                {words.map((word: string, wordIdx: number) => (
                                    <span key={wordIdx} className="inline-block mr-1">
                                        {word.split('').map((letter: string, idx: number) => (
                                            <span
                                                key={idx}
                                                style={{ color: colors[idx % colors.length] }}
                                                className="inline-block"
                                            >
                                                {letter}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </a>
                        </motion.li>
                    );
                })}
            </ul>
        </motion.nav>
    );
}
