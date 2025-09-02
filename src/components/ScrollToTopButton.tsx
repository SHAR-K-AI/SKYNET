"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import SoundWrapper from "@/components/SoundWrapper";

interface ScrollToTopButtonProps {
    imageSrc?: string;
    imageAlt?: string;
}

export default function ScrollToTopButton({
                                              imageSrc = "/images/to-top.png",
                                              imageAlt = "Scroll to top"
                                          }: ScrollToTopButtonProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (
        <SoundWrapper playOn="click">
            <button
                onClick={scrollToTop}
                className={`
        fixed bottom-44 right-2 md:right-5 rounded-full h-24 w-24 md:h-auto md:w-auto flex items-center justify-center
        transition-opacity duration-300 cursor-pointer
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        z-50
      `}
            >
                <Image src={imageSrc} alt={imageAlt} width={132} height={132} className="object-contain"/>
            </button>
        </SoundWrapper>
    );
}
