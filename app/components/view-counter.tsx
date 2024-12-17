'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { getViews, incrementViews } from '../actions/views';

export default function ViewCounter() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const fetchViews = async () => {
            const initialViews = await getViews();
            setViews(initialViews);
            const updatedViews = await incrementViews();
            setViews(updatedViews);
        };

        fetchViews();
    }, []);
    if (!views) {
        return null;
    }
    return (
        <motion.div
            className="fixed top-4 right-4 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{views}</span>
        </motion.div>
    );
}
