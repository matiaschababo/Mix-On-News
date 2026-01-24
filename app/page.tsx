'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

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

export default function Home() {
  const [news, setNews] = useState<NewsResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedArticles, setLikedArticles] = useState<Set<string>>(new Set());
  const [dislikedArticles, setDislikedArticles] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState<any>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      const res = await fetch('/api/interactions');
      const data = await res.json();
      setPreferences(data);
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const handleLike = async (articleId: string, e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const isLiked = likedArticles.has(articleId);
      const res = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          type: isLiked ? 'read' : 'like', // Toggle to neutral if already liked
        }),
      });

      if (res.ok) {
        const newLiked = new Set(likedArticles);
        const newDisliked = new Set(dislikedArticles);

        if (isLiked) {
          newLiked.delete(articleId);
        } else {
          newLiked.add(articleId);
          newDisliked.delete(articleId); // Remove from disliked if was disliked
        }

        setLikedArticles(newLiked);
        setDislikedArticles(newDisliked);
        await fetchPreferences();
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleDislike = async (articleId: string, e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const isDisliked = dislikedArticles.has(articleId);
      const res = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId,
          type: isDisliked ? 'read' : 'dislike',
        }),
      });

      if (res.ok) {
        const newDisliked = new Set(dislikedArticles);
        const newLiked = new Set(likedArticles);

        if (isDisliked) {
          newDisliked.delete(articleId);
        } else {
          newDisliked.add(articleId);
          newLiked.delete(articleId); // Remove from liked if was liked
        }

        setDislikedArticles(newDisliked);
        setLikedArticles(newLiked);
        await fetchPreferences();
      }
    } catch (error) {
      console.error('Error disliking article:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/refresh', { method: 'POST' });
      const result = await res.json();
      console.log('Refresh result:', result);

      // Re-fetch news after refresh
      await fetchNews();

      alert(`✅ Actualización completa!\n\n📰 ${result.added} noticias nuevas agregadas\n⏭️ ${result.skipped} ya existían`);
    } catch (error) {
      console.error('Error refreshing:', error);
      alert('❌ Error al actualizar. Verifica que tengas tu API Key de Google Gemini configurada.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchPreferences();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF00FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Cargando noticias...</p>
        </div>
      </main>
    );
  }

  const filteredArticles = (selectedCategory === 'Todos'
    ? news?.articles
    : news?.articles.filter(a => a.category === selectedCategory))
    ?.filter(article => !dislikedArticles.has(article.id));

  // Function to get consistent color for any category
  const getCategoryColor = (category: string) => {
    const safeCat = category || 'General';
    // Dictionary of fixed colors for common categories
    const fixedColors: Record<string, string> = {
      'Política': 'bg-red-500/20 text-red-300 border-red-500/50',
      'Economía': 'bg-green-500/20 text-green-300 border-green-500/50',
      'Deportes': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      'Espectáculos': 'bg-pink-500/20 text-pink-300 border-pink-500/50',
      'Tecnología': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
      'Sociedad': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      'Policiales': 'bg-orange-900/30 text-orange-300 border-orange-500/50',
      'General': 'bg-gray-700/30 text-gray-300 border-gray-500/50',
    };

    if (fixedColors[safeCat]) return fixedColors[safeCat];

    // Dynamic color for unknown categories (hash string to select a color)
    const colors = [
      'bg-indigo-500/20 text-indigo-300 border-indigo-500/50',
      'bg-teal-500/20 text-teal-300 border-teal-500/50',
      'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
      'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50',
    ];

    let hash = 0;
    for (let i = 0; i < safeCat.length; i++) {
      hash = safeCat.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic banner background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/mixon-banner.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.15] animate-pulse"
          style={{ animationDuration: '8s' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF00FF]/20 via-transparent to-[#CC00CC]/20"></div>
      </div>
      {/* Header with Mix On Branding */}
      <header className="border-b border-[#FF00FF]/30 bg-black/90 backdrop-blur-xl sticky top-0 z-50 relative overflow-hidden shadow-lg shadow-[#FF00FF]/20">
        {/* Subtle banner pattern background */}
        <div className="absolute inset-0 opacity-5">
          <img
            src="/mixon-banner.png"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          {/* Top Row: Logo + Info + Actions */}
          <div className="flex items-center justify-between mb-4">
            {/* Logo + News */}
            <div className="flex items-center gap-3">
              <img
                src="/mixon-logo.png"
                alt="Mix On"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  News
                </h1>
                <p className="text-gray-400 text-sm">Tu radar de noticias inteligente</p>
              </div>
            </div>

            {/* Right side: Preferences + Refresh */}
            <div className="flex items-center gap-4">
              {/* Preferences Indicator */}
              {preferences && preferences.totalInteractions > 0 && (
                <div className="hidden md:block text-sm bg-gradient-to-r from-[#FF00FF]/20 to-[#CC00CC]/20 px-4 py-2 rounded-xl border-2 border-[#FF00FF]/40 shadow-lg shadow-[#FF00FF]/30">
                  <div className="text-white font-semibold">
                    🎯 {preferences.totalInteractions} interacciones
                  </div>
                  {Object.keys(preferences.preferredCategories).length > 0 && (
                    <div className="text-xs text-[#FF3AFF]">
                      Te gustan: {Object.keys(preferences.preferredCategories).slice(0, 2).join(', ')}
                    </div>
                  )}
                </div>
              )}

              {news?.lastUpdated && (
                <p className="text-sm text-gray-500 hidden lg:block">
                  Actualizado{' '}
                  <span className="text-gray-300">
                    {formatDistanceToNow(new Date(news.lastUpdated), {
                      addSuffix: true,
                      locale: es
                    })}
                  </span>
                </p>
              )}

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-6 py-3 bg-gradient-to-r from-[#FF00FF] to-[#CC00CC] text-white font-semibold rounded-lg 
                         hover:from-[#FF3AFF] hover:to-[#9900CC] transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                         shadow-lg shadow-[#FF00FF]/50"
              >
                {refreshing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Actualizando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar Feed
                  </>
                )}
              </button>

              {/* Reset Feed Button */}
              <button
                onClick={async () => {
                  if (confirm('¿Seguro querés resetear todo? Se borrarán las noticias actuales pero la IA MANTENDRÁ tu memoria.')) {
                    setRefreshing(true);
                    try {
                      await fetch('/api/admin/reset', { method: 'POST' });
                      // Don't auto-refresh, user wants it empty
                      window.location.reload();
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setRefreshing(false);
                    }
                  }
                }}
                disabled={refreshing}
                className="px-3 py-3 bg-red-900/30 text-red-300 font-semibold rounded-lg 
                         hover:bg-red-900/50 border border-red-500/30
                         disabled:opacity-50 flex items-center gap-2
                         text-sm"
                title="Borrar todo y empezar de cero (mantiene memoria)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === 'Todos'
                ? 'bg-[#FF00FF] text-white shadow-lg shadow-[#FF00FF]/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              Todos ({news?.total || 0})
            </button>

            {news?.categories.map(category => {
              const count = news.articles.filter(a => a.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${selectedCategory === category
                    ? 'bg-[#FF00FF] text-white shadow-lg shadow-[#FF00FF]/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredArticles && filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">No hay noticias aún</h2>
            <p className="text-gray-500 mb-6">Hacé click en "Actualizar Feed" para comenzar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles?.map(article => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 
                                  rounded-xl p-6 h-full card-hover">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: article.relevance >= 80 ? '#ef4444' : article.relevance >= 60 ? '#f59e0b' : '#6b7280'
                        }}
                        title={`Relevancia: ${article.relevance}/100`}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-3 group-hover:text-[#FF00FF] transition-colors">
                    {article.title}
                  </h3>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(article.scrapedAt), { addSuffix: true, locale: es })}
                      </span>

                      {/* Like Button */}
                      <button
                        onClick={(e) => handleLike(article.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${likedArticles.has(article.id)
                          ? 'bg-[#FF00FF]/20 text-[#FF00FF]'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-[#FF00FF]/10 hover:text-[#FF3AFF]'
                          }`}
                        title={likedArticles.has(article.id) ? "Te gusta" : "Marcar como interesante"}
                      >
                        <svg
                          className="w-4 h-4"
                          fill={likedArticles.has(article.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>

                      {/* Dislike Button */}
                      <button
                        onClick={(e) => handleDislike(article.id, e)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${dislikedArticles.has(article.id)
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-red-500/10 hover:text-red-300'
                          }`}
                        title={dislikedArticles.has(article.id) ? "No te gusta" : "No me interesa"}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={dislikedArticles.has(article.id) ? 3 : 2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <span className="text-[#FF00FF] text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Leer más →
                    </span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
