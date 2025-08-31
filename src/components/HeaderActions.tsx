import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function HeaderActions() {
    return (
        <div className="flex items-center md:flex-row flex-col gap-4 space-x-4 ml-4">
            <LocaleSwitcher />
            <ThemeToggleButton />
        </div>
    );
}