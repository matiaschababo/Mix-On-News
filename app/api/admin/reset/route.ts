import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { analyzeAndUpdatePreferences } from '@/lib/preference-learning';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        console.log('🗑️ Resetting feed requested...');

        // 1. First, SAVE MEMORY! Verify we have analyzed recent interactions
        // This ensures that before we wipe the data, we distilled the knowledge into UserPreferences
        await analyzeAndUpdatePreferences();
        console.log('🧠 Memory saved.');

        // 2. Delete all articles (this cascades to deletes interactions)
        // But since we saved the preferences above, the memory is safe in UserPreferences table
        await prisma.article.deleteMany({});
        console.log('🗑️ Feed cleared.');

        return NextResponse.json({
            message: 'Feed reset successfully. AI Memory preserved.',
        });

    } catch (error) {
        console.error('Error resetting feed:', error);
        return NextResponse.json(
            { error: 'Failed to reset feed' },
            { status: 500 }
        );
    }
}
