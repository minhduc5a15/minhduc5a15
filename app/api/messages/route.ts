import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = process.env.DB_NAME;

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(DB_NAME);

        const result = await db.collection('messages').insertOne({
            name,
            email,
            message,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/messages:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
