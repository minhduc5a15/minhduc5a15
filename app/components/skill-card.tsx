'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillCardProps {
    icon: React.ReactNode;
    title: string;
    skills: string[];
    gradientColors: string;
}

export default function SkillCard({ icon, title, skills, gradientColors }: SkillCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className="overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-10`} />
                    <motion.div
                        className="flex items-center gap-4 mb-4 relative z-10"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradientColors} text-white`}>{icon}</div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                    </motion.div>
                    <motion.div
                        className="flex flex-wrap gap-2 relative z-10"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {skills.map((skill) => (
                            <motion.div
                                key={skill}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    show: { opacity: 1, scale: 1 },
                                }}
                            >
                                <Badge
                                    variant="secondary"
                                    className={`text-sm hover:bg-gradient-to-r ${gradientColors} hover:text-white transition-colors duration-300`}
                                >
                                    {skill}
                                </Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
