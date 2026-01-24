import { GoogleGenerativeAI } from '@google/generative-ai';
import { ScrapedArticle } from './scraper';

export interface CuratedArticle extends ScrapedArticle {
    category: string;
    relevance: number;
    aiReasoning?: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

/**
 * The "Brain" - Uses Google Gemini to analyze and categorize news for Mix On
 */
export async function curateArticles(articles: ScrapedArticle[]): Promise<CuratedArticle[]> {
    if (articles.length === 0) {
        return [];
    }

    // Check if API key is configured
    if (!process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY === 'your-google-api-key-here') {
        console.warn('⚠️  Gemini API Key not configured. Returning all articles without AI filtering.');
        console.warn('   Set GOOGLE_GEMINI_API_KEY in .env to enable AI curation.');

        // Return all articles with default categorization
        return articles.map(article => ({
            ...article,
            category: 'Actualidad',
            relevance: 50, // Default relevance
        }));
    }

    // Get user preferences for personalized curation
    const { getUserPreferences } = await import('./preference-learning');
    const userPrefs = await getUserPreferences();
    const hasPreferences = Object.keys(userPrefs.categories).length > 0;

    if (hasPreferences) {
        console.log(`🎯 AI analyzing ${articles.length} articles with YOUR preferences...`);
        console.log(`   Favorite categories:`, Object.keys(userPrefs.categories).slice(0, 3));
    } else {
        console.log(`🧠 AI analyzing ${articles.length} articles for Mix On...`);
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build personalized context if preferences exist
    let userContext = '';
    if (hasPreferences) {
        const topCategories = Object.entries(userPrefs.categories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([cat, score]) => `${cat} (${Math.round(score * 100)}%)`);

        const topSources = Object.entries(userPrefs.sources)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([src]) => src);

        userContext = `

🎯 PREFERENCIAS DEL USUARIO (priorizar esto):
- Le ENCANTAN estas categorías: ${topCategories.join(', ')}
- Prefiere fuentes: ${topSources.join(', ')}
- Temas de interés: ${userPrefs.topics.slice(0, 5).join(', ')}

⚠️ IMPORTANTE: Dale +15-25 puntos EXTRA a artículos que coincidan con estas preferencias.`;
    }

    const prompt = `Eres el productor de "Mix On", un canal de streaming rosarino para audiencia de 15-40 años.

Tu trabajo es analizar estas noticias Y TWEETS y determinar cuáles generarían el MEJOR CONTENIDO para el programa.${userContext}

IMPORTANTE: Algunos artículos son TWEETS de streamers argentinos (Maju Lozano, Luigi, Fede Storani). 
Los tweets de estos streamers suelen ser MUY RELEVANTES para Mix On porque:
- Son parte de la comunidad de streaming argentina
- Sus opiniones generan debate en redes
- El público objetivo sigue a estos creators

CRITERIOS DE FILTRADO (ordena por prioridad):
1. **DEBATE Y POLÉMICA** (90-100pts): Temas que generen debate encendido, opiniones divididas, escándalos
2. **TENDENCIAS Y VIRAL** (70-89pts): Lo que está trending, memes, cultura popular, internet
3. **STREAMERS/CREATORS** (75-95pts): Tweets o menciones de streamers argentinos, contenido de creators
4. **ACTUALIDAD NACIONAL** (50-69pts): Política SI es escandalosa/picante, economía que afecta a la gente
5. **ROSARIO/SANTA FE LOCAL** (60-80pts): Todo lo que sea local tiene +10pts extra
6. **SHOWBIZ/CHIMENTOS** (65-85pts): Famosos, influencers, streamers, escándalos mediáticos
7. **DEPORTES** (40-60pts): Solo si es MUY relevante (Messi, River-Boca, escándalos)
8. **ABURRIDO** (1-39pts): Política tradicional sin escándalo, economía técnica, institucional

CATEGORÍAS POSIBLES:
- "Twitter": Tweets de streamers/creators (Maju, Luigi, Fede)
- "Debate": Polémica garantizada
- "Tendencia": Viral en redes
- "Rosario": Local/Regional
- "Showbiz": Famosos y chimentos
- "Actualidad": Noticias importantes del día
- "Deportes": Solo si es muy relevante
- "Descartado": No sirve para Mix On

Analiza estos artículos y devuelve SOLO un JSON válido (sin markdown, sin explicaciones):

${JSON.stringify(articles.map((a, i) => ({ id: i, title: a.title, source: a.source })), null, 2)}

Formato de respuesta (SOLO JSON):
[
  {
    "id": 0,
    "category": "Debate",
    "relevance": 95,
    "reasoning": "Polémica fuerte que va a generar opiniones divididas"
  }
]`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Clean any markdown formatting
        const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const aiResults = JSON.parse(jsonText);

        const curatedArticles: CuratedArticle[] = articles.map((article, index) => {
            const aiResult = aiResults.find((r: any) => r.id === index);

            // PRIORIDAD: Usar la categoría original del medio si existe
            let category = article.category || aiResult?.category || 'General';

            // Limpieza básica de categorías
            if (['Sociedad', 'Informacion General', 'Ciudad'].includes(category)) category = 'Actualidad';
            if (['Politica', 'Economia'].includes(category)) category = 'Política y Economía';

            return {
                ...article,
                category,
                relevance: aiResult?.relevance || 50,
                aiReasoning: aiResult?.reasoning,
            };
        });

        // Filter out "Descartado" articles with very low relevance
        const filtered = curatedArticles.filter(a => a.relevance >= 40);

        console.log(`✅ AI filtered ${filtered.length}/${articles.length} articles as relevant for Mix On`);

        return filtered;
    } catch (error) {
        console.error('Error in AI curation:', error);
        // Fallback: Use scraped category or 'General'
        return articles.map(article => ({
            ...article,
            category: article.category || 'General',
            relevance: 50,
            aiReasoning: 'Fallback error',
        }));
    }
}
