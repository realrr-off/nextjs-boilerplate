'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Box, Map, Code2, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        id: 'modeling',
        title: 'Modeling',
        description: 'Expert 3D modeling for characters, assets, and environments.',
        icon: Box,
        color: 'from-blue-500 to-indigo-600',
    },
    {
        id: 'map-building',
        title: 'Map Building',
        description: 'Immersive level design and environmental storytelling.',
        icon: Map,
        color: 'from-emerald-500 to-teal-600',
    },
    {
        id: 'scripting',
        title: 'Scripting',
        description: 'Dynamic game systems and complex gameplay logic.',
        icon: Code2,
        color: 'from-amber-500 to-orange-600',
    },
    {
        id: 'management',
        title: 'Management',
        description: 'Project and community leadership for successful launches.',
        icon: Users,
        color: 'from-purple-500 to-pink-600',
    },
    {
        id: 'tester',
        title: 'Tester',
        description: 'Meticulous QA testing to ensure a polished final product.',
        icon: CheckCircle2,
        color: 'from-rose-500 to-red-600',
    }
];

export default function ServicesHub() {
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
                    <div className="max-w-4xl mb-16">
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2 text-center">Professional Services</h2>
                        <h1 className="text-6xl font-outfit font-extrabold leading-tight tracking-tight text-white text-center">
                            What I <span className="text-primary">Deliver</span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="group relative"
                            >
                                <Link href={`/services/${service.id}`} className="block h-full">
                                    <div className="glass-panel p-8 rounded-[32px] h-full flex flex-col border-white/5 hover:border-primary/50 transition-all duration-500">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-8 shadow-lg shadow-black/20 group-hover:rotate-[10deg] transition-transform duration-500`}>
                                            <service.icon size={32} />
                                        </div>

                                        <h3 className="text-2xl font-outfit font-bold text-white mb-4">{service.title}</h3>
                                        <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all">
                                            <span>Learn More</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
