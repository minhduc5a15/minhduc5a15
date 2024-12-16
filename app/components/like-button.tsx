'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLikes, incrementLikes } from '../actions/like';

const LikeButton = memo(function LikeButton() {
    const [likes, setLikes] = useState(0);
    const [isLiking, setIsLiking] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);

    useEffect(() => {
        getLikes().then(setLikes);
    }, []);

    const handleLike = async () => {
        setIsLiking(true);
        const newLikes = await incrementLikes();
        setLikes(newLikes);
        setIsLiking(false);
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 2000);
    };

    return (
        <motion.div
            className="fixed bottom-4 right-4 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence>
                {showThankYou && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -20 }}
                        className="absolute right-full mr-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm whitespace-nowrap"
                    >
                        Thank you! 🎉
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                disabled={isLiking}
                className="text-primary hover:text-primary/80 relative"
            >
                <AnimatePresence>
                    {isLiking && (
                        <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 2 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </AnimatePresence>
                <motion.div whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                    <Heart
                        className={`w-6 h-6 transition-all duration-300 ease-in-out ${
                            isLiking ? 'fill-primary scale-110' : ''
                        }`}
                    />
                </motion.div>
            </Button>
            <AnimatePresence>
                <motion.span
                    key={likes}
                    className="text-sm font-medium"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                >
                    {likes}
                </motion.span>
            </AnimatePresence>
            <AnimatePresence>
                {isLiking && (
                    <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

export default LikeButton;
