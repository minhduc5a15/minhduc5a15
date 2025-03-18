'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMessages } from '../actions/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCookie, setCookie } from 'cookies-next';
import InteractiveBackground from '../components/interactive-background';
import CustomLoading from '../components/loading';

export default function MessagesPage() {
    const [privateKey, setPrivateKey] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const sessionKey = getCookie('message_session');
        if (sessionKey) {
            handleAuthentication(sessionKey as string);
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleAuthentication = async (key: string) => {
        try {
            const result = await getMessages(key);
            if (result.sessionKey === process.env.NEXT_PUBLIC_MESSAGE_SESSION_KEY) {
                setCookie('message_session', result.sessionKey, {
                    maxAge: 60 * 60,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                });
            }
            setMessages(result.messages);
            setError('');
        } catch (err) {
            console.error('Authentication error:', err);
            setError('Authentication failed. Please try again.');
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await handleAuthentication(privateKey);
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <InteractiveBackground />
            <div className="relative z-10 p-8">
                <h1 className="text-3xl font-bold mb-8">Messages</h1>
                {isLoading ? (
                    <CustomLoading />
                ) : messages.length === 0 ? (
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Enter Private Key</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    type="password"
                                    value={privateKey}
                                    onChange={(e) => setPrivateKey(e.target.value)}
                                    placeholder="Enter private key"
                                    required
                                />
                                <Button type="submit">Submit</Button>
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {messages.map((message, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{message.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                                    <p>{message.message}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
