'use client';

import Image from 'next/image';
import { Github, Mail, MapPin, Code, Cpu, Palette} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Projects from './components/projects';
import AnimatedText from './components/animated-text';
import InteractiveBackground from './components/interactive-background';
import ContactForm from './components/contact-form';

export default function Home() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <div className="min-h-screen bg-background text-foreground" ref={targetRef}>
            <InteractiveBackground />

            {/* Hero Section */}
            <motion.section className="relative container px-4 py-24 mx-auto" style={{ opacity, scale }}>
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
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="About Me" className="mb-8" />
                <div className="grid gap-8 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
                        <p className="text-muted-foreground">
                            As a passionate software developer with a focus on security, I&apos;ve dedicated my career to
                            creating robust and secure applications. My journey in the world of coding began with a
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
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="Skills & Technologies" className="mb-8" />
                <div className="grid gap-8">
                    <CreativeSkillCard
                        icon={<Code className="w-8 h-8" />}
                        title="Languages"
                        skills={['C++', 'TypeScript', 'Python', 'JavaScript', 'Go', 'Rust', 'C', 'Java']}
                    />
                    <CreativeSkillCard
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
                    />
                    <CreativeSkillCard
                        icon={<Palette className="w-8 h-8" />}
                        title="Design"
                        skills={['Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects']}
                    />
                </div>
            </section>

            {/* Projects Section */}
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="Featured Projects" className="mb-8" />
                <Projects />
            </section>

            {/* Certifications Section */}
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="Certifications" className="mb-8" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CertificationCard title="Certified Ethical Hacker (CEH)" issuer="EC-Council" date="2023" />
                    <CertificationCard title="CompTIA Security+" issuer="CompTIA" date="2022" />
                    <CertificationCard
                        title="AWS Certified Security - Specialty"
                        issuer="Amazon Web Services"
                        date="2023"
                    />
                </div>
            </section>

            {/* GitHub Stats */}
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="GitHub Activity" className="mb-8" />
                <div className="grid gap-4 md:grid-cols-3">
                    <GitHubStat title="Total Commits (2024)" value={257} />
                    <GitHubStat title="Total Stars Earned" value={6} />
                    <GitHubStat title="Repositories" value={37} />
                </div>
            </section>

            {/* Contact Form */}
            <section className="container px-4 py-16 mx-auto">
                <AnimatedText text="Get in Touch" className="mb-8" />
                <ContactForm />
            </section>
        </div>
    );
}

function CreativeSkillCard({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: string[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <motion.div
                        className="flex items-center gap-4 mb-4"
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {icon}
                        <h3 className="text-xl font-semibold">{title}</h3>
                    </motion.div>
                    <motion.div
                        className="flex flex-wrap gap-2"
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
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    show: { opacity: 1, scale: 1 },
                                }}
                            >
                                <Badge variant="secondary" className="text-sm">
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

function GitHubStat({ title, value }: { title: string; value: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Card>
                <CardContent className="p-6">
                    <div className="text-center">
                        <motion.h3
                            className="text-4xl font-bold text-primary"
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

function CertificationCard({ title, issuer, date }: { title: string; issuer: string; date: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{issuer}</p>
                    <p className="text-sm text-muted-foreground mt-2">{date}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}