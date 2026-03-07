'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Users, Sparkles, Sword, Globe, Megaphone, ArrowLeft, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        id: 'overview',
        icon: Gamepad2,
        title: 'Overview',
        content: "Step into Aetherfall, a semi-RPG anime battleground focused on meaningful progression, rewarding grinds, and a community-first design philosophy. Unlock multiple anime-inspired powers through engaging challenges, strengthen your build over time, and compete in fast-paced combat environments.",
    },
    {
        id: 'features',
        icon: Sword,
        title: 'Core Features',
        content: "Aetherfall is designed to reward consistency, experimentation, and skill. Whether you prefer grinding toward your next unlock or testing your build in PvP, progression remains central and accessible.",
        bullets: [
            'Unlock multiple anime characters through structured, rewarding grinds',
            'Stackable stat progression and scaling combat',
            'Awakening-style transformations and aura enhancements',
            'PvP arenas and open-world encounters',
            'Realm-based expansion and evolving gameplay systems',
            'Community-focused development and transparent updates'
        ]
    },
    {
        id: 'community',
        icon: Users,
        title: 'Community',
        content: "Join a growing, friendly community and shape the future of the experience. We believe in transparent updates and community-first design philosophy to ensure the best possible experience for all players.",
    }
];

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState('overview');

    const activeCategory = categories.find(c => c.id === activeTab) || categories[0];

    return (
        <>
            <Sidebar />
            <main className="flex-1 bg-background relative overflow-hidden flex flex-col">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
                    <div className="absolute inset-0 border border-white/5 rounded-full" />
                    <div className="absolute inset-[100px] border border-white/5 rounded-full" />
                    <div className="absolute inset-[200px] border border-white/5 rounded-full" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-50" />
                </div>

                <div className="relative flex-1 flex flex-col px-12 pt-24 pb-12 overflow-y-auto">
                    <Link href="/" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-12 w-fit group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-outfit font-medium">Back to Home</span>
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Column: Title & Nav */}
                        <div className="lg:w-1/3 flex flex-col gap-8">
                            <div>
                                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">My Current Game</h2>
                                <h1 className="text-6xl font-outfit font-extrabold leading-tight tracking-tight text-white">
                                    Aetherfall
                                </h1>
                            </div>

                            <div className="flex flex-col gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-left glass-panel group ${activeTab === cat.id
                                                ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                                                : 'hover:border-primary/30'
                                            }`}
                                    >
                                        <cat.icon size={20} className={activeTab === cat.id ? 'text-white' : 'text-primary group-hover:scale-110 transition-transform'} />
                                        <span className={`font-outfit font-bold ${activeTab === cat.id ? 'text-white' : 'text-text-muted'}`}>
                                            {cat.title}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4">
                                <a
                                    href="https://discord.gg/MxFFmMqeDv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-3xl font-outfit font-bold transition-all hover:scale-[1.05] active:scale-[0.98] shadow-lg shadow-[#5865F2]/20"
                                >
                                    <MessageSquare size={20} />
                                    Join Discord Community
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Display Area */}
                        <div className="lg:w-2/3">
                            <div className="glass-panel rounded-[40px] p-12 min-h-[500px] flex flex-col relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                                    <activeCategory.icon size={200} />
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative z-10"
                                    >
                                        <h2 className="text-3xl font-outfit font-bold text-white mb-8 flex items-center gap-4">
                                            <activeCategory.icon className="text-primary" />
                                            {activeCategory.title}
                                        </h2>

                                        <p className="text-xl text-text-muted leading-relaxed mb-8">
                                            {activeCategory.content}
                                        </p>

                                        {activeCategory.bullets && (
                                            <div className="grid gap-4">
                                                {activeCategory.bullets.map((bullet, idx) => (
                                                    <div key={idx} className="flex items-start gap-4 glass-panel bg-white/5 p-4 rounded-2xl border-white/5">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                                                        <span className="text-white text-lg font-medium">{bullet}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Visual 3D elements decoration */}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
