import { prisma } from '@/lib/db';

interface PreferenceScores {
    [key: string]: number;
}

/**
 * Analyzes user interactions and updates preferences
 * This runs periodically to learn from user behavior
 */
export async function analyzeAndUpdatePreferences(): Promise<void> {
    console.log('🧠 Analyzing user preferences...');

    try {
        // Get all interactions
        const interactions = await prisma.userInteraction.findMany({
            include: {
                article: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (interactions.length < 5) {
            console.log('⚠️  Not enough interactions to analyze (need at least 5)');
            return;
        }

        // Analyze likes only (most important signal)
        const likes = interactions.filter(i => i.interactionType === 'like');
        const dislikes = interactions.filter(i => i.interactionType === 'dislike');

        // Create current batch scores
        const categoryScores: PreferenceScores = {};
        const sourceScores: PreferenceScores = {};

        // Positive signals
        likes.forEach(interaction => {
            const { category, source } = interaction.article;
            categoryScores[category] = (categoryScores[category] || 0) + 1;
            sourceScores[source] = (sourceScores[source] || 0) + 1;
        });

        // Negative signals
        dislikes.forEach(interaction => {
            const { category, source } = interaction.article;
            categoryScores[category] = (categoryScores[category] || 0) - 0.5;
            sourceScores[source] = (sourceScores[source] || 0) - 0.5;
        });

        // Get EXISTING preferences to merge with
        let existingPreferences = await prisma.userPreferences.findFirst();

        let finalCategories = categoryScores;
        let finalSources = sourceScores;
        let finalTopics = extractTopics(likes.map(i => i.article.title));

        if (existingPreferences) {
            console.log('🔄 Merging with existing memory...');
            const oldCategories = JSON.parse(existingPreferences.preferredCategories) as PreferenceScores;
            const oldSources = JSON.parse(existingPreferences.preferredSources) as PreferenceScores;

            // Merge logic: Decay old scores slightly (0.8) + Add new scores
            finalCategories = mergeScores(oldCategories, categoryScores, 0.9);
            finalSources = mergeScores(oldSources, sourceScores, 0.9);
        }

        const normalizedCategories = normalizeScores(finalCategories);
        const normalizedSources = normalizeScores(finalSources);

        if (!existingPreferences) {
            existingPreferences = await prisma.userPreferences.create({
                data: {
                    preferredCategories: JSON.stringify(normalizedCategories),
                    preferredSources: JSON.stringify(normalizedSources),
                    preferredTopics: JSON.stringify(finalTopics),
                    totalInteractions: interactions.length,
                    lastAnalyzedAt: new Date(),
                },
            });
        } else {
            await prisma.userPreferences.update({
                where: { id: existingPreferences.id },
                data: {
                    preferredCategories: JSON.stringify(normalizedCategories),
                    preferredSources: JSON.stringify(normalizedSources),
                    preferredTopics: JSON.stringify(finalTopics),
                    // Keep cumulative count
                    totalInteractions: existingPreferences.totalInteractions + interactions.length,
                    lastAnalyzedAt: new Date(),
                },
            });
        }

        console.log('✅ Preferences updated (Incremental Learning):');
        console.log('   Categories:', normalizedCategories);
        console.log('   Sources:', normalizedSources);
        console.log('   Topics:', finalTopics);

    } catch (error) {
        console.error('Error analyzing preferences:', error);
    }
}

/**
 * Get user preferences for use in curation
 */
export async function getUserPreferences() {
    const preferences = await prisma.userPreferences.findFirst();

    if (!preferences) {
        return {
            categories: {},
            sources: {},
            topics: [],
        };
    }

    return {
        categories: JSON.parse(preferences.preferredCategories) as PreferenceScores,
        sources: JSON.parse(preferences.preferredSources) as PreferenceScores,
        topics: JSON.parse(preferences.preferredTopics) as string[],
    };
}

// --- Helper Functions ---

function normalizeScores(scores: PreferenceScores): PreferenceScores {
    const maxScore = Math.max(...Object.values(scores), 1);
    const normalized: PreferenceScores = {};

    Object.entries(scores).forEach(([key, value]) => {
        if (value > 0) {
            normalized[key] = Math.round((value / maxScore) * 100) / 100;
        }
    });

    return normalized;
}

function mergeScores(oldScores: PreferenceScores, newScores: PreferenceScores, decay: number): PreferenceScores {
    const merged: PreferenceScores = { ...oldScores };

    // Decay old scores
    Object.keys(merged).forEach(key => {
        merged[key] *= decay;
    });

    // Add new scores
    Object.entries(newScores).forEach(([key, value]) => {
        merged[key] = (merged[key] || 0) + value;
    });

    return merged;
}

/**
 * Simple topic extraction from titles
 * Extracts common words (excluding stop words)
 */
function extractTopics(titles: string[]): string[] {
    const stopWords = new Set([
        'el', 'la', 'de', 'en', 'a', 'por', 'para', 'con', 'un', 'una',
        'y', 'que', 'se', 'los', 'las', 'del', 'al', 'es', 'su', 'sus',
        'le', 'lo', 'como', 'más', 'pero', 'sus', 'me', 'ha', 'si', 'no',
    ]);

    const wordCounts: { [key: string]: number } = {};

    titles.forEach(title => {
        const words = title.toLowerCase()
            .replace(/[^\wáéíóúñü\s]/g, '') // Remove punctuation
            .split(/\s+/)
            .filter(word => word.length > 4 && !stopWords.has(word));

        words.forEach(word => {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        });
    });

    // Return top 10 most common topics
    return Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word);
}
