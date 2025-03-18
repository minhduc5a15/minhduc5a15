'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function Projects() {
    const projects = [
        {
            title: 'Project 1',
            description: 'Password manager application',
            technologies: ['Tauri', 'Nextjs', 'MongoDB'],
            link: '#',
            gradient: 'from-blue-500 to-purple-600',
        },
        {
            title: 'Project 2',
            description: 'Real-time chat application using WebSocket',
            technologies: ['React', 'Node.js', 'Socket.io', 'Redis'],
            link: '#',
            gradient: 'from-emerald-500 to-teal-600',
        },
        {
            title: 'Project 3',
            description: 'Cross-platform desktop application',
            technologies: ['Electron', 'Vue.js', 'SQLite'],
            link: '#',
            gradient: 'from-pink-500 to-rose-600',
        },
    ];

    return (
        <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {projects.map((project, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full flex flex-col overflow-hidden group border-2 border-transparent hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="relative overflow-hidden">
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-80`}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 0.8 }}
                                transition={{ duration: 0.5 }}
                            />
                            <CardTitle className="relative z-10 text-white drop-shadow-md">{project.title}</CardTitle>
                            <CardDescription className="relative z-10 text-white/90">
                                {project.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="outline"
                                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
