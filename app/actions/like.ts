'use server';

import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.DB_NAME;

export async function getLikes() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const likesCollection = db.collection('likes');
    const result = await likesCollection.findOne({ type: 'portfolio_likes' });
    return result?.count || 0;
}

export async function incrementLikes() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const likesCollection = db.collection('likes');
    const result = await likesCollection.updateOne(
        { type: 'portfolio_likes' },
        { $inc: { count: 1 } },
        { upsert: true },
    );
    revalidatePath('/');
    return await getLikes();
}
