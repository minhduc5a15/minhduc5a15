'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => (
    <div className="inline-flex items-center justify-center w-[0.6em] h-[1em] relative overflow-hidden">
        <AnimatePresence initial={false}>
            <motion.span
                key={value}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {value}
            </motion.span>
        </AnimatePresence>
    </div>
);

const Separator: React.FC = () => <div className="inline-flex items-center justify-center w-[0.3em] h-[1em]">:</div>;

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-transparent absolute rounded-xl shadow-lg p-4 font-mono hidden md:flex flex-col items-center">
            <div className="text-3xl font-bold flex items-center bg-gradient-to-r">
                <AnimatedNumber value={Math.floor(hours / 10)} />
                <AnimatedNumber value={hours % 10} />
                <Separator />
                <AnimatedNumber value={Math.floor(minutes / 10)} />
                <AnimatedNumber value={minutes % 10} />
                <Separator />
                <AnimatedNumber value={Math.floor(seconds / 10)} />
                <AnimatedNumber value={seconds % 10} />
            </div>
            <div className="text-sm mt-2 text-gray-600">{formatDate(time)}</div>
        </div>
    );
};

export default Clock;
