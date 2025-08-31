import {motion} from "framer-motion";

export default function MenuOverlay({ toggleMenu }: { toggleMenu: () => void }) {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
        />
    );
}