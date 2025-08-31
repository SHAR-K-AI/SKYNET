import { motion } from "framer-motion";

export default function MenuButton({ isOpen, toggleMenu }: { isOpen: boolean; toggleMenu: () => void }) {
    return (
        <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="w-14 h-14 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center shadow-lg relative"
        >
            <motion.span
                className="absolute block h-0.5 w-6 bg-white rounded"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -6,
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.span
                className="absolute block h-0.5 w-6 bg-white rounded"
                animate={{
                    opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
            />
            <motion.span
                className="absolute block h-0.5 w-6 bg-white rounded"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 6,
                }}
                transition={{ duration: 0.3 }}
            />
        </button>
    );
}
