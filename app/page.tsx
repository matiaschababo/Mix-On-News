'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { NewsCard } from './components/ui/NewsCard';

interface Article {
  id: string;
  url: string;
  title: string;
  summary?: string;
  source: string;
  category: string;
  relevance: number;
  scrapedAt: string;
}

interface NewsResponse {
  articles: Article[];
  categories: string[];
  total: number;
  lastUpdated: string | null;
}

const LOGO_MAP: Record<string, string> = {
  'Infobae': '/logo-infobae.png',
  'La Nacion': '/logo-lanacion.png',
  'La Capital': '/logo-lacapital.png',
  'Rosario3': '/logo-rosario3.png',
};

// Helper: Normalize strings (remove accents, lowercase)
const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Helper: Normalize source name to key
const getLogoForSource = (source: string) => {
  const normSource = normalize(source);

  // Custom mappings based on normalized input
  if (normSource.includes('infobae')) return LOGO_MAP['Infobae'];
  if (normSource.includes('nacion')) return LOGO_MAP['La Nacion'];
  if (normSource.includes('capital')) return LOGO_MAP['La Capital'];
  if (normSource.includes('rosario')) return LOGO_MAP['Rosario3'];

  return undefined;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedSource, setSelectedSource] = useState<string>('Todos');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const [dislikedArticles, setDislikedArticles] = useState<Set<string>>(new Set());

  // Fetch News Logic
  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error("Error al cargar noticias");
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Preferences (Likes/Dislikes)
  const fetchPreferences = async () => {
    if (status !== 'authenticated') return;
    try {
      const res = await fetch('/api/interactions');
      const data = await res.json();
      if (data.likedIds) setLikedArticles(new Set(data.likedIds));
      if (data.dislikedIds) setDislikedArticles(new Set(data.dislikedIds));
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchNews();
  }, []);

  // Load preferences when user logs in
  useEffect(() => {
    if (status === 'authenticated') {
      fetchPreferences();
    } else {
      setLikedArticles(new Set());
      setDislikedArticles(new Set());
    }
  }, [status]);

  // Handle Interactions
  const handleInteraction = async (articleId: string, type: 'like' | 'dislike') => {
    if (status !== 'authenticated') {
      toast.warning('Iniciá sesión para personalizar tu feed', {
        description: 'Tus preferencias se guardan para mostrarte noticias más relevantes.'
      });
      return;
    }

    // Optimistic UI Update
    const isLike = type === 'like';
    const currentSet = isLike ? likedArticles : dislikedArticles;
    const oppositeSet = isLike ? dislikedArticles : likedArticles;
    const setFn = isLike ? setLikedArticles : setDislikedArticles;
    const oppositeSetFn = isLike ? setDislikedArticles : setLikedArticles;

    const alreadyActive = currentSet.has(articleId);

    // Toggle
    const newSet = new Set(currentSet);
    const newOpposite = new Set(oppositeSet);

    if (alreadyActive) {
      newSet.delete(articleId);
    } else {
      newSet.add(articleId);
      newOpposite.delete(articleId); // Remove from opposite if needed
    }

    setFn(newSet);
    oppositeSetFn(newOpposite);

    try {
      // Send to API
      // If we are toggling OFF, we technically should send 'read' or 'neutral', 
      // but for now let's just send the type. API handles upsert. 
      // Ideally we need a 'remove' interaction endpoint or logic.
      // For simplicity: If toggling off, screen logic handles it visualy. 
      // API call could strictly set it to 'read' if we want to "unlike".

      const payloadType = alreadyActive ? 'read' : type;

      const res = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, type: payloadType }),
      });

      if (!res.ok) throw new Error('Failed');

      const msg = isLike
        ? (alreadyActive ? 'Like removido' : 'Noticia guardada')
        : (alreadyActive ? 'Dislike removido' : 'Menos noticias como esta');

      toast.success(msg);

    } catch (error) {
      // Revert on error
      toast.error('Error al guardar interacción');
      fetchPreferences(); // Sync back
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    const loadingToast = toast.loading('Analizando noticias...');
    try {
      const res = await fetch('/api/refresh', { method: 'POST' });
      const result = await res.json();

      await fetchNews();

      toast.dismiss(loadingToast);
      toast.success(`Feed Actualizado: +${result.added} nuevas`);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Error de conexión');
    } finally {
      setRefreshing(false);
    }
  };

  const handleReset = () => {
    setSelectedCategory('Todos');
    setSelectedSource('Todos');
    // Do NOT clear preferences (likes/dislikes) as they allow the algorithm to learn.
    // We only reset the visual filters.
    toast.success('Filtros reiniciados');
  };

  // Base Set of Articles (excluding Pagina 12)
  const cleanArticles = news?.articles
    ?.filter(a => !normalize(a.source).includes('pagina 12'))
    ?.filter(a => !dislikedArticles.has(a.id)) || [];

  // --- PERSONALIZATION ALGORITHM ---
  // 1. Identify User Interests based on Liked Articles
  const userInterests = new Set<string>();
  if (news?.articles) {
    news.articles.forEach(a => {
      if (likedArticles.has(a.id)) {
        userInterests.add(a.category);
      }
    });
  }

  // 2. Sort Articles: High Relevance + Matches User Interest -> Top
  const personalizedFeed = [...cleanArticles].sort((a, b) => {
    // Score A
    let scoreA = a.relevance;
    if (userInterests.has(a.category)) scoreA += 20; // Boost for preferred category
    if (likedArticles.has(a.id)) scoreA -= 100; // Push already liked/read to bottom? Or keep top? Usually keep visible but maybe lower priority if "new" is better. 
    // Actually, user wants to see what they like. Let's strictly boost unread preferred content.

    // Score B
    let scoreB = b.relevance;
    if (userInterests.has(b.category)) scoreB += 20;

    return scoreB - scoreA; // Descending score
  });

  // derived state with Counts
  // Sources: Unique sources in cleanArticles
  const uniqueSources = Array.from(new Set(cleanArticles.map(a => a.source)));

  // Calculate counts for sources
  const sourceCounts = uniqueSources.reduce((acc, source) => {
    acc[source] = cleanArticles.filter(a => a.source === source).length;
    return acc;
  }, {} as Record<string, number>);

  const totalArticles = cleanArticles.length;

  // Categories: Unique categories based on CURRENT Source Selection
  const relevantArticlesForCats = selectedSource === 'Todos'
    ? personalizedFeed
    : personalizedFeed.filter(a => a.source === selectedSource);

  const uniqueCategories = Array.from(new Set(relevantArticlesForCats.map(a => a.category)));

  // Calculate counts for categories
  const categoryCounts = uniqueCategories.reduce((acc, cat) => {
    acc[cat] = relevantArticlesForCats.filter(a => a.category === cat).length;
    return acc;
  }, {} as Record<string, number>);


  const sources = ['Todos', ...uniqueSources];
  const availableCategories = uniqueCategories;

  // Final Filter
  const filteredArticles = personalizedFeed
    ?.filter(article => selectedSource === 'Todos' || article.source === selectedSource)
    ?.filter(article => selectedCategory === 'Todos' || article.category === selectedCategory);

  // Authentication & Guest Logic
  if (status === 'loading') {
    return (
      <main className="min-h-screen relative bg-[#05050A] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#FF00FF] border-t-transparent rounded-full animate-spin"></div>
      </main>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <main className="min-h-screen relative bg-[#05050A] text-white flex flex-col items-center justify-center overflow-hidden">
        {/* Background FX */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#FF00FF]/20 blur-[120px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#00FFFF]/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src="/mixon-logo.png" alt="Mix On" className="h-32 w-auto mx-auto object-contain drop-shadow-[0_0_30px_rgba(255,0,255,0.5)]" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Tu Radar <br />
            <span className="gradient-text">Inteligente</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-400"
          >
            Noticias personalizadas para vos. Sin ruido, solo lo que te importa.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="scale-125 origin-top">
              <button
                onClick={() => import('next-auth/react').then(mod => mod.signIn('google'))}
                className="group relative px-8 py-4 rounded-full font-bold text-white text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,0,255,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] via-[#BD00FF] to-[#00FFFF] opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                  </svg>
                  Comenzar Ahora
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen relative bg-[#05050A] text-white selection:bg-[#FF00FF] selection:text-white">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF00FF]/10 blur-[100px] animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#00FFFF]/10 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-[#7000FF]/10 blur-[100px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <Header
        onRefresh={handleRefresh}
        onReset={handleReset}
        isRefreshing={refreshing}
        lastUpdated={news?.lastUpdated}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Filters Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Source Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mask-gradient-right">
            {sources.map(source => {
              const count = source === 'Todos' ? totalArticles : sourceCounts[source];
              const logo = getLogoForSource(source);

              return (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                        ${selectedSource === source
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }
                     `}
                >
                  {logo && source !== 'Todos' && (
                    <img src={logo} alt={source} className="h-4 w-auto object-contain" />
                  )}
                  <span>{source}</span>
                  <span className="opacity-50 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Category Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('Todos')}
              className={`
                  px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap
                  ${selectedCategory === 'Todos'
                  ? 'bg-[#FF00FF] text-white shadow-[0_0_20px_rgba(255,0,255,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }
               `}
            >
              Todos
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap
                  ${selectedCategory === cat
                    ? 'bg-[#FF00FF] text-white shadow-[0_0_20px_rgba(255,0,255,0.4)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }
                `}
              >
                {cat} <span className="opacity-50 text-[10px] ml-1">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode='wait'>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-16 h-16 border-4 border-[#FF00FF] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400 animate-pulse">Cargando feed inteligente...</p>
            </motion.div>
          ) : filteredArticles?.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-6 rounded-3xl glass-panel border-dashed border-white/10"
            >
              <div className="text-6xl mb-4 opacity-50">📡</div>
              <h3 className="text-2xl font-bold text-white mb-2">Sin novedades</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                No encontramos noticias con estos filtros. Probá cambiando la categoría o actualizá el feed.
              </p>
              <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Forzar Actualización
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles?.map((article, idx) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  index={idx} // For staggered animation
                  onLike={() => handleInteraction(article.id, 'like')}
                  onDislike={() => handleInteraction(article.id, 'dislike')}
                  isLiked={likedArticles.has(article.id)}
                  isDisliked={dislikedArticles.has(article.id)}
                  sourceLogo={getLogoForSource(article.source)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
