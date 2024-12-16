'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveBackground() {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!backgroundRef.current) return;

            const { clientX, clientY } = e;
            const { width, height } = backgroundRef.current.getBoundingClientRect();

            const x = (clientX / width - 0.5) * 2;
            const y = (clientY / height - 0.5) * 2;

            backgroundRef.current.style.setProperty('--mouse-x', x.toString());
            backgroundRef.current.style.setProperty('--mouse-y', y.toString());
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            ref={backgroundRef}
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
                style={{
                    transform: 'translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px))',
                }}
            />
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/10 mix-blend-screen"
                    style={{
                        width: Math.random() * 300 + 50,
                        height: Math.random() * 300 + 50,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}
        </motion.div>
    );
}
