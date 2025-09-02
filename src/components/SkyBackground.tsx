'use client';

import React, { useState, useEffect } from "react";

export default function SkyBackground() {
    const [clouds, setClouds] = useState<{id:number,type:string,top:number,duration:number,delay:number}[]>([]);

    useEffect(() => {
        const generated = Array.from({ length: 10 }, (_, i) => {
            const types = ["small", "big", "tiny"];
            const type = types[Math.floor(Math.random() * types.length)];
            const top = 10 + Math.random() * 70;
            const duration = type === "tiny" ? 30 + Math.random()*20 :
                type === "small" ? 40 + Math.random()*30 :
                    60 + Math.random()*40;
            const delay = Math.random() * 20;
            return { id: i, type, top, duration, delay };
        });
        setClouds(generated);
    }, []);

    return (
        <div className="sky-bg">
            <div className="sun"></div>
            {clouds.map(cloud => (
                <div
                    key={cloud.id}
                    className={`cloud ${cloud.type}`}
                    style={{
                        top: `${cloud.top}%`,
                        animationDuration: `${cloud.duration}s`,
                        animationDelay: `${cloud.delay}s`,
                    }}
                ></div>
            ))}
        </div>
    );
}
