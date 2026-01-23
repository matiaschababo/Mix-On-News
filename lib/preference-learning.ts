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

        // Calculate category preferences
        const categoryScores: PreferenceScores = {};
        const sourceScores: PreferenceScores = {};

        // Positive signals from likes
        likes.forEach(interaction => {
            const { category, source } = interaction.article;

            categoryScores[category] = (categoryScores[category] || 0) + 1;
            sourceScores[source] = (sourceScores[source] || 0) + 1;
        });

        // Negative signals from dislikes (reduce score)
        dislikes.forEach(interaction => {
            const { category, source } = interaction.article;

            categoryScores[category] = (categoryScores[category] || 0) - 0.5;
            sourceScores[source] = (sourceScores[source] || 0) - 0.5;
        });

        // Normalize scores to 0-1 range
        const normalizeScores = (scores: PreferenceScores): PreferenceScores => {
            const maxScore = Math.max(...Object.values(scores), 1);
            const normalized: PreferenceScores = {};

            Object.entries(scores).forEach(([key, value]) => {
                if (value > 0) {
                    normalized[key] = Math.round((value / maxScore) * 100) / 100;
                }
            });

            return normalized;
        };

        const normalizedCategories = normalizeScores(categoryScores);
        const normalizedSources = normalizeScores(sourceScores);

        // Extract common topics from liked articles (simple keyword extraction)
        const topics = extractTopics(likes.map(i => i.article.title));

        // Update or create preferences
        let preferences = await prisma.userPreferences.findFirst();

        if (!preferences) {
            preferences = await prisma.userPreferences.create({
                data: {
                    preferredCategories: JSON.stringify(normalizedCategories),
                    preferredSources: JSON.stringify(normalizedSources),
                    preferredTopics: JSON.stringify(topics),
                    totalInteractions: interactions.length,
                    lastAnalyzedAt: new Date(),
                },
            });
        } else {
            await prisma.userPreferences.update({
                where: { id: preferences.id },
                data: {
                    preferredCategories: JSON.stringify(normalizedCategories),
                    preferredSources: JSON.stringify(normalizedSources),
                    preferredTopics: JSON.stringify(topics),
                    totalInteractions: interactions.length,
                    lastAnalyzedAt: new Date(),
                },
            });
        }

        console.log('✅ Preferences updated:');
        console.log('   Categories:', normalizedCategories);
        console.log('   Sources:', normalizedSources);
        console.log('   Topics:', topics);

    } catch (error) {
        console.error('Error analyzing preferences:', error);
    }
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
