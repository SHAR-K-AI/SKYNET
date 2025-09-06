import React from 'react';
import Card from './Card';

export interface CardData {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    link: string;
}

interface CardGridProps {
    cards: CardData[];
}

const CardGrid: React.FC<CardGridProps> = ({cards}) => {
    return (
        <div
            className="
                    grid
                    gap-12
                    grid-cols-1
                    xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
                    sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
                "
        >
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    );
};

export default CardGrid;
