"use client"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface Article {
    id: string
    url: string
    title: string
    source: string
    category: string
    relevance: number
    scrapedAt: string
}

interface NewsCardProps {
    article: Article
    onLike: (id: string, e: React.MouseEvent) => void
    onDislike: (id: string, e: React.MouseEvent) => void
    isLiked: boolean
    isDisliked: boolean
    index?: number
    sourceLogo?: string
}

// Helper for category colors (matching existing logic but cleaner)
const getCategoryGradient = (category: string) => {
    const map: Record<string, string> = {
        'Política': 'from-red-500/10 to-orange-500/10 border-red-500/20',
        'Economía': 'from-green-500/10 to-emerald-500/10 border-green-500/20',
        'Deportes': 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
        'Espectáculos': 'from-pink-500/10 to-rose-500/10 border-pink-500/20',
        'Tecnología': 'from-purple-500/10 to-violet-500/10 border-purple-500/20',
        'General': 'from-gray-500/10 to-slate-500/10 border-gray-500/20',
    }
    return map[category] || map['General']
}

export function NewsCard({ article, onLike, onDislike, isLiked, isDisliked, index = 0, sourceLogo }: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            className="h-full"
        >
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
            >
                <article className={`
          relative h-full p-6 rounded-2xl
          bg-gradient-to-br ${getCategoryGradient(article.category)}
          backdrop-blur-xl border
          transition-all duration-300
          hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]
          hover:border-[#FF00FF]/30
          hover:-translate-y-1
        `}>
                    {/* Top Metadata */}
                    <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
                            {article.category}
                        </span>
                        <div className="flex items-center gap-2">
                            {sourceLogo ? (
                                <div className="h-6 px-2 bg-white rounded flex items-center justify-center">
                                    <img src={sourceLogo} alt={article.source} className="h-4 w-auto object-contain" />
                                </div>
                            ) : (
                                <span className="text-xs text-gray-500 font-mono tracking-wider uppercase">{article.source}</span>
                            )}
                            {article.relevance > 80 && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF00FF] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF00FF]"></span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Title - The Hero */}
                    <h3 className="text-lg font-bold text-white mb-6 line-clamp-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF00FF] group-hover:to-[#00FFFF] transition-all">
                        {article.title}
                    </h3>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(article.scrapedAt), { addSuffix: true, locale: es })}
                        </span>

                        <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                            {/* Like Button */}
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={(e) => onLike(article.id, e)}
                                className={`p-2 rounded-full transition-colors ${isLiked
                                    ? 'bg-[#FF00FF]/20 text-[#FF00FF]'
                                    : 'bg-white/5 text-gray-400 hover:text-[#FF00FF] hover:bg-[#FF00FF]/10'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </motion.button>

                            {/* Dislike Button */}
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={(e) => onDislike(article.id, e)}
                                className={`p-2 rounded-full transition-colors ${isDisliked
                                    ? 'bg-red-500/20 text-red-500'
                                    : 'bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </article>
            </a>
        </motion.div>
    )
}
