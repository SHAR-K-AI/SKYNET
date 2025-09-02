import {motion} from "framer-motion";
import SoundWrapper from "@/components/SoundWrapper";

export default function MenuButton({isOpen, toggleMenu}: { isOpen: boolean; toggleMenu: () => void }) {
    return (
        <SoundWrapper playOn="click">
            <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="w-14 h-14 fixed top-10 rounded-full bg-blue-500 dark:bg-blue-700 flex items-center justify-center shadow-lg cursor-pointer"
            >
                <motion.span
                    className="absolute block h-0.5 w-6 bg-white rounded"
                    animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 0 : -6,
                    }}
                    transition={{duration: 0.3}}
                />
                <motion.span
                    className="absolute block h-0.5 w-6 bg-white rounded"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{duration: 0.3}}
                />
                <motion.span
                    className="absolute block h-0.5 w-6 bg-white rounded"
                    animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? 0 : 6,
                    }}
                    transition={{duration: 0.3}}
                />
            </button>
        </SoundWrapper>
    );
}
