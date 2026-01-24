"use client"
import { motion } from "framer-motion"
import { SignInButton } from "./ui/SignInButton"

interface HeaderProps {
    onRefresh: () => void
    onReset: () => void
    isRefreshing: boolean
    lastUpdated?: string | null
}

export function Header({ onRefresh, onReset, isRefreshing, lastUpdated }: HeaderProps) {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="sticky top-0 z-50 glass-panel border-b-0 border-b-white/5"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Left: Branding */}
                <div className="flex items-center gap-3">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="/mixon-logo.png"
                        alt="Mix On"
                        className="h-10 w-auto object-contain"
                    />
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl font-bold tracking-tight leading-none">
                            <span className="gradient-text">News</span>
                        </h1>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:block">
                            Radar Inteligente
                        </p>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">

                    {/* Reset Button */}
                    <button
                        onClick={onReset}
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        title="Limpiar Feed"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="hidden lg:inline">Limpiar</span>
                    </button>

                    {/* Refresh Button - Enhanced */}
                    <button
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                            ${isRefreshing
                                ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                : 'bg-[#FF00FF] hover:bg-[#D900D9] text-white shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:scale-105 active:scale-95'
                            }
                        `}
                    >
                        <svg
                            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {isRefreshing ? 'Actualizando...' : 'Actualizar'}
                    </button>

                    {/* Auth Button */}
                    <SignInButton />
                </div>
            </div>
        </motion.header>
    )
}
