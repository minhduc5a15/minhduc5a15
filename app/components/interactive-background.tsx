'use client';

import { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground = memo(function InteractiveBackground() {
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
        <div ref={backgroundRef} className="fixed inset-0 pointer-events-none">
            <div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 transition-transform duration-300 ease-out"
                style={{
                    transform: 'translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px))',
                }}
            />
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full mix-blend-screen ${
                        i % 5 === 0
                            ? 'bg-primary/20'
                            : i % 5 === 1
                            ? 'bg-secondary/20'
                            : i % 5 === 2
                            ? 'bg-accent/20'
                            : i % 5 === 3
                            ? 'bg-pink-500/20'
                            : 'bg-amber-500/20'
                    }`}
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
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                    }}
                />
            ))}
        </div>
    );
});

export default InteractiveBackground;
