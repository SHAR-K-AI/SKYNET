"use client";

import React, {JSX, useEffect, useState} from "react";

function Comet({ id, onEnd }: any) {
    const top = Math.random() * 50 + 10;
    const left = Math.random() * 50 + 10;
    const duration = 2 + Math.random() * 2;
    const angle = Math.random() * 30 + 20;

    return (
        <span
            style={{
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                transform: `rotate(${angle}deg)`,
                animation: `shoot ${duration}s linear forwards`,
            }}
            onAnimationEnd={() => onEnd(id)}
        >
      <span className="comet-tail" />
      <span className="comet-head" />
    </span>
    );
}

export default function StarryBackground() {
    const [stars, setStars] = useState<JSX.Element[]>([]);
    const [comets, setComets] = useState<any[]>([]);

    useEffect(() => {
        const starElements = [];
        for (let i = 0; i < 100; i++) {
            starElements.push(
                <span
                    key={`star-${i}`}
                    style={{
                        position: "absolute",
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: "2px",
                        height: "2px",
                        borderRadius: "50%",
                        background: "white",
                        opacity: Math.random(),
                        animation: `blink ${4 + Math.random() * 4}s infinite ease-in-out`,
                    }}
                />
            );
        }
        setStars(starElements);

        const interval = setInterval(() => {
            setComets(prev => [...prev, { id: Date.now() + Math.random() }]);
            setComets(prev => prev.slice(-2)); // максимум 2 комети одночасно
        }, Math.random() * 4000 + 3000); // кожні 3-7 сек

        return () => clearInterval(interval);
    }, []);

    const removeComet = (id: number) => {
        setComets(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="starry-bg">
            {stars}
            {comets.map(c => (
                <Comet key={c.id} id={c.id} onEnd={removeComet}/>
            ))}
            <div className="moon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}
