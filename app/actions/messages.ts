'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';

function generateSessionKey(): string {
    return crypto.randomBytes(32).toString('hex');
}

export async function getMessages(privateKeyOrSession: string) {
    const cookieStore = await cookies();
    const sessionKey = cookieStore.get('message_session')?.value;

    let isAuthorized = false;
    let newSessionKey: string | null = null;

    if (sessionKey && sessionKey === privateKeyOrSession) {
        isAuthorized = true;
    } else if (privateKeyOrSession === process.env.MESSAGES_PRIVATE_KEY) {
        isAuthorized = true;
        newSessionKey = generateSessionKey();
        // Remove httpOnly flag to allow client-side access
        cookieStore.set('message_session', newSessionKey, {
            maxAge: 60 * 60, // 1 hour
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }

    if (!isAuthorized) {
        throw new Error('Unauthorized');
    }

    const messages = await fetchMessages();
    return { sessionKey: newSessionKey, messages };
}

async function fetchMessages() {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const messagesCollection = db.collection('messages');

    return await messagesCollection.find({}).sort({ timestamp: -1 }).toArray();
}

export async function addMessage(name: string, email: string, message: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const messagesCollection = db.collection('messages');

    await messagesCollection.insertOne({
        name,
        email,
        message,
        timestamp: new Date(),
    });

    revalidatePath('/messages');
}
