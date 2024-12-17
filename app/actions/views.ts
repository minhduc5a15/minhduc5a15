'use server';

import { revalidatePath } from 'next/cache';
import { getViewsCollection } from '@/lib/mongodb';

export async function getViews() {
    const viewsCollection = await getViewsCollection();
    const result = await viewsCollection.findOne({ type: 'portfolio_views' });
    return result?.count || 0;
}

export async function incrementViews() {
    const viewsCollection = await getViewsCollection();
    await viewsCollection.updateOne({ type: 'portfolio_views' }, { $inc: { count: 1 } }, { upsert: true });
    revalidatePath('/');
    return await getViews();
}
