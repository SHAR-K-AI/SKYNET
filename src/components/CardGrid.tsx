import React from 'react';
import Card, { LocalizedText } from './Card';

export interface CardData {
    title: LocalizedText;
    description: LocalizedText;
    content: LocalizedText;
    imageUrl: string;
    link: string;
}

interface CardGridProps {
    cards: CardData[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
    return (
        <section className="md:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
                Ресурси та програми
            </h2>

            <div
                className="
                    grid
                    gap-6
                    grid-cols-1
                    xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
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
