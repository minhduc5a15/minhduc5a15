'use client';

import Image from 'next/image';
import { Github, Mail, MapPin, Code, Cpu, Palette } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Projects from './components/projects';
import AnimatedText from './components/animated-text';
import LikeButton from './components/like-button';
import ContactForm from './components/contact-form';
import ViewCounter from './components/view-counter';
import Clock from './components/clock';
import SkillCard from './components/skill-card';
import ParticleBackground from './components/particle-background';
import ScrollProgress from './components/scroll-progress';

export default function Home() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden px-12 mx-auto" ref={targetRef}>
            <ScrollProgress />
            <Clock />

            {useMemo(
                () => (
                    <ParticleBackground />
                ),
                [],
            )}

            {useMemo(
                () => (
                    <ViewCounter />
                ),
                [],
            )}

            {/* Hero Section */}
            <motion.section className="relative container px-4 py-24 mx-auto max-w-full" style={{ opacity, scale }}>
                <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div className="space-y-4">
                        <AnimatedText text="Hi 👋, I'm Duck" />
                        <motion.p
                            className="text-muted-foreground text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            A software developer from Vietnam passionate about building secure and efficient
                            applications
                        </motion.p>
                        <motion.div
                            className="flex items-center gap-2 text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <MapPin className="w-4 h-4" />
                            <span>Thanh Hoa, Vietnam</span>
                        </motion.div>
                        <motion.div
                            className="flex gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Button>
                                <Mail className="w-4 h-4 mr-2" />
                                Contact Me
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.open('https://github.com/minhduc5a15', '_blank')}
                            >
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </Button>
                        </motion.div>
                    </div>
                    <motion.div
                        className="relative aspect-square"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/duck-avatar.png"
                            alt="Profile"
                            fill
                            className="object-cover rounded-full border-4 border-primary/10"
                            priority
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* About Me Section */}
            <section className="container px-4 py-16 mx-auto max-w-full">
                <AnimatedText text="About Me" className="mb-8" />
                <div className="grid gap-8 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                        <p className="text-muted-foreground">
                            As a passionate software developer with a focus on security, I&apos;ve dedicated my career
                            to creating robust and secure applications. My journey in the world of coding began with a
                            fascination for problem-solving and has evolved into a deep expertise in cybersecurity and
                            efficient software development.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">My Approach</h3>
                        <p className="text-muted-foreground">
                            I believe in writing clean, efficient code that not only meets functional requirements but
                            also adheres to the highest security standards. My experience spans from developing secure
                            web applications to implementing robust backend systems, always with an eye on potential
                            vulnerabilities and performance optimization.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="container px-4 py-16 mx-auto max-w-full">
                <AnimatedText text="Skills & Technologies" className="mb-8" />
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <SkillCard
                        icon={<Code className="w-8 h-8" />}
                        title="Languages"
                        skills={['C++', 'C#', 'TypeScript', 'Python', 'JavaScript', 'Go', 'Rust', 'C', 'Java']}
                        gradientColors="from-blue-500 to-purple-600"
                    />
                    <SkillCard
                        icon={<Cpu className="w-8 h-8" />}
                        title="Technologies"
                        skills={[
                            'React',
                            'Next.js',
                            'Node.js',
                            'Express',
                            'PostgreSQL',
                            'Redis',
                            'Wireshark',
                            'Metasploit',
                            'Nmap',
                            'Burp Suite',
                            'OWASP ZAP',
                            'Kali Linux',
                            'Penetration Testing',
                            'Cryptography',
                        ]}
                        gradientColors="from-emerald-500 to-teal-600"
                    />
                    <SkillCard
                        icon={<Palette className="w-8 h-8" />}
                        title="Design"
                        skills={['Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects']}
                        gradientColors="from-pink-500 to-rose-600"
                    />
                </div>
            </section>

            {/* Projects Section */}
            <section className="container px-4 py-16 mx-auto max-w-full">
                <AnimatedText text="Featured Projects" className="mb-8" />
                <Projects />
            </section>

            {/* GitHub Stats */}
            <section className="container px-4 py-16 mx-auto max-w-full">
                <AnimatedText text="GitHub Activity" className="mb-8" />
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <GitHubStat title="Total Commits (2024)" value={257} color="from-blue-500 to-indigo-600" />
                    <GitHubStat title="Total Stars Earned" value={6} color="from-amber-500 to-orange-600" />
                    <GitHubStat title="Repositories" value={37} color="from-emerald-500 to-teal-600" />
                </div>
            </section>

            {/* Contact Form */}
            <section className="container px-4 py-16 mx-auto max-w-full">
                <AnimatedText text="Get in Touch" className="mb-8" />
                <ContactForm />
            </section>

            {useMemo(
                () => (
                    <LikeButton />
                ),
                [],
            )}
        </div>
    );
}

function GitHubStat({ title, value, color }: { title: string; value: number; color: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
        >
            <Card className="overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
                    <div className="text-center relative z-10">
                        <motion.h3
                            className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {value}
                        </motion.h3>
                        <p className="text-muted-foreground mt-2">{title}</p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
