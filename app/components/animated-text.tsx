'use client';

import { motion } from 'framer-motion';

export default function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
    const words = text.split(' ');

    // Array of vibrant colors for the text
    const colors = [
        'text-blue-500',
        'text-purple-500',
        'text-pink-500',
        'text-emerald-500',
        'text-amber-500',
        'text-rose-500',
        'text-cyan-500',
    ];

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h2
            className={`text-3xl font-bold ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className={`inline-block mr-1 ${colors[index % colors.length]}`}
                >
                    {word}
                </motion.span>
            ))}
        </motion.h2>
    );
}
