"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function SignInButton() {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    if (session && session.user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full glass-panel hover:bg-white/10 transition-all border border-white/10 hover:border-[#FF00FF]/50"
                >
                    {session.user.image ? (
                        <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="w-8 h-8 rounded-full border border-white/20"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] flex items-center justify-center text-xs font-bold text-white">
                            {session.user.name?.charAt(0) || "U"}
                        </div>
                    )}
                    <span className="text-sm font-medium text-gray-200 truncate max-w-[100px] hidden sm:block">
                        {session.user.name}
                    </span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-white/10 shadow-2xl overflow-hidden z-50 origin-top-right"
                        >
                            <div className="p-2">
                                <div className="px-3 py-2 text-xs text-gray-400 border-b border-white/5 mb-1">
                                    Mi Cuenta
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    return (
        <button
            onClick={() => signIn("google")}
            className="group relative px-6 py-2 rounded-full font-semibold text-white overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] via-[#BD00FF] to-[#00FFFF] opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] via-[#BD00FF] to-[#00FFFF] blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Entrar con Google
            </span>
        </button>
    )
}
