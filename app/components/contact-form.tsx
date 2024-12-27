'use client';

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
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </motion.form>
    );
}
