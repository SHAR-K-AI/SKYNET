import React from 'react';
import Card from './Card';

export interface CardData {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    content: string;
}

interface CardGridProps {
    cards: CardData[];
}

const CardGrid: React.FC<CardGridProps> = ({cards}) => {
    return (
        <section className="p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                Додаткові ресурси та програми
            </h2>

            <div
                className="
                    grid
                    gap-12
                    grid-cols-1
                    sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
                "
            >
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </section>
    );
};

export default CardGrid;
