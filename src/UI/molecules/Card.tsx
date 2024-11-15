import React from 'react';

interface CardProps {
    data: number | string; // Alternativa a 'any'
    title: string;
    icon: React.ReactNode;
}

export default function Card({ data, title, icon }: CardProps) {
    return (
        <div className='bg-white p-5 rounded-md shadow-lg'>
            <div className='flex justify-between'>
                <h3>{title}</h3>
                <span>{icon}</span>
            </div>
            <p className='font-bold text-[2em]'>{data}</p>
        </div>
    );
}