'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactForm() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/messages', formState);

            if (response.status === 201) {
                toast({
                    title: 'Message sent!',
                    description: "Thank you for reaching out. I'll get back to you soon.",
                });
                setFormState({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (_) {
            toast({
                title: 'Error',
                description: `Failed to send message. Please try again later.`,
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl mx-auto relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl pointer-events-none"
            />
            <div className="p-10 rounded-xl">
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Your Name
                    </label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary/50 h-14 text-lg px-4"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                        Your Email
                    </label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary/50 h-14 text-lg px-4"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 bg-gradient-to-r from-pink-500 to-orange-600 bg-clip-text text-transparent">
                        Your Message
                    </label>
                    <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="border-2 focus:border-primary/50 min-h-[150px] text-lg p-4"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 h-14 text-lg font-medium"
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </div>
        </motion.form>
    );
}
