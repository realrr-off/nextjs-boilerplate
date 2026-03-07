'use client';

import React, { use } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { Box, Map, Code2, Users, CheckCircle2, ArrowLeft, Sparkles, Star, Zap, Gem } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const servicesData: Record<string, any> = {
    modeling: {
        title: 'Modeling',
        icon: Box,
        description: 'Expert 3D modeling for characters, assets, and environments. I create high-fidelity models that are optimized for game engines while maintaining exceptional visual quality.',
        features: ['Character Design', 'Environment Assets', 'Hard Surface Modeling', 'Optimization for Engine'],
        color: 'text-blue-500',
        bgIcon: Box,
        images: [
            '/modeling/lava-spear.png',
            '/modeling/greatsword-1.png',
            '/modeling/greatsword-2.png',
            '/modeling/baby-dragon.png',
            '/modeling/halberd.png',
        ]
    },
    'map-building': {
        title: 'Map Building',
        icon: Map,
        description: 'I specialize in semi-realistic, low-poly, and stud-style map design, with a focus on creating immersive environments that enhance gameplay. My work emphasizes strong level design, atmosphere, and environmental storytelling, ensuring that each map feels alive, visually coherent, and engaging for players. I design spaces that not only look appealing but also support player flow, exploration, and overall game experience.',
        features: ['Level Layout', 'Environment Styling', 'Atmospheric Design', 'Navigation Optimization'],
        color: 'text-emerald-500',
        bgIcon: Map,
        images: [
            '/map-building/dungeon-hallway.jpg',
            '/map-building/snowy-village.png',
            '/map-building/desert-oasis.png',
        ]
    },
    scripting: {
        title: 'Scripting',
        icon: Code2,
        description: 'I have strong knowledge of Python, Java, JavaScript, HTML, and Lua, and I am experienced in building professional Discord bots and modern websites. I focus on writing clean, efficient, and maintainable code, ensuring that every project is structured, scalable, and easy to work with. My development approach emphasizes performance, reliability, and clear architecture, allowing me to deliver polished and professional solutions.',
        features: ['Game Mechanics', 'System Architecture', 'Backend Integration', 'Performance Tuning'],
        color: 'text-amber-500',
        bgIcon: Code2,
        techStack: [
            { name: 'Python', color: '#3776AB' },
            { name: 'Java', color: '#007396' },
            { name: 'Javascript', color: '#F7DF1E' },
            { name: 'HTML', color: '#E34F26' },
            { name: 'Lua', color: '#2C2D72' }
        ]
    },
    management: {
        title: 'Management',
        icon: Users,
        description: 'Bridging the gap between creative vision and technical execution. I specialize in both Community Management and Project Management to ensure your operation is secure, efficient, and thriving.',
        roles: [
            {
                title: 'Community Manager & Discord Architect',
                content: '"I specialize in building and scaling high-performance Discord infrastructures that are 100% unraidable. My approach to community management blends technical security with organic engagement. I am a power user of industry-standard tools like Sapphire, Dyno, and Arcane, and I leverage my background in JavaScript and Python to develop custom bot solutions where out-of-the-box tools fall short. From designing multi-stage verification gates and anti-nuke protocols to managing large-scale player bases, I ensure every community I oversee is a secure, well-moderated, and thriving environment for players and investors alike."'
            },
            {
                title: 'Project Manager',
                content: '"As a Project Manager, I bridge the gap between creative vision and technical execution. Having a deep understanding of the entire development pipeline—from scripting and 3D modeling to QA testing—allows me to lead teams with technical authority and realistic foresight. I focus on streamlining workflows, setting clear milestones, and maintaining high standards of quality control throughout the production cycle. My goal is to ensure that projects stay on schedule, remain within budget, and ultimately deliver a polished, high-traffic product that meets the expectations of both the community and stakeholders."'
            }
        ],
        features: ['Discord Architecture', 'Anti-Nuke Protocols', 'Workflow Streamlining', 'QA Oversight'],
        color: 'text-purple-500',
        bgIcon: Users,
    },
    tester: {
        title: 'Tester',
        icon: CheckCircle2,
        description: 'Experienced game contributor and QA specialist with a track record of supporting titles that have reached millions of player visits. Currently collaborating on multiple live and in-development games. Highly skilled in rigorous playtesting, submitting detailed bug reports, and delivering constructive feedback to help development teams polish their projects.',
        features: ['Bug Identification', 'Balance Testing', 'Performance Monitoring', 'UX/UI Review'],
        color: 'text-rose-500',
        bgIcon: CheckCircle2,
        images: [
            '/tester/d8x-tester.png',
            '/tester/battle-games-tester.png',
            '/tester/peakline-studios-tester.png',
        ]
    }
};

export default function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const service = servicesData[slug];

    if (!service) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background text-white">
                Service not found
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <>
            <Sidebar />
            <main className="flex-1 bg-background relative overflow-hidden flex flex-col">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Icon size={400} />
                </div>

                <div className="relative flex-1 flex flex-col px-12 pt-24 pb-12 overflow-y-auto">
                    <Link href="/services" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-12 w-fit group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-outfit font-medium">Back to Services</span>
                    </Link>

                    <div className="max-w-4xl">
                        <div className={`w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center ${service.color} mb-8 shadow-2xl shadow-black/20`}>
                            <Icon size={40} />
                        </div>

                        <h1 className="text-6xl font-outfit font-extrabold leading-tight tracking-tight text-white mb-8">
                            {service.title} <span className={service.color}>Service</span>
                        </h1>

                        <p className="text-xl text-text-muted leading-relaxed mb-12 max-w-3xl">
                            {service.description}
                        </p>

                        {service.roles && (
                            <div className="grid gap-8 mb-12">
                                {service.roles.map((role: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.2 }}
                                        className="glass-panel p-8 rounded-[32px] border-white/5 relative overflow-hidden"
                                    >
                                        <h3 className="text-2xl font-outfit font-bold text-white mb-4 flex items-center gap-3">
                                            <div className={`w-1.5 h-8 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                                            {role.title}
                                        </h3>
                                        <p className="text-lg text-text-muted leading-relaxed italic">
                                            {role.content}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                            {service.features.map((feature: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-primary/30 transition-all group"
                                >
                                    <div className={`w-2 h-2 rounded-full ${service.color.replace('text-', 'bg-')} group-hover:scale-150 transition-transform`} />
                                    <span className="text-white font-outfit font-bold">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tech Stack Section */}
                        {service.techStack && (
                            <div className="mt-16 mb-16">
                                <h2 className="text-3xl font-outfit font-bold text-white mb-8 flex items-center gap-3">
                                    <div className={`w-1.5 h-8 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                                    Core Technologies
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {service.techStack.map((tech: any, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-white/20 transition-all cursor-default"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${tech.color}20`, color: tech.color }}
                                            >
                                                {tech.name[0]}
                                            </div>
                                            <span className="text-white font-outfit font-bold text-sm">{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Image Gallery Section */}
                        {service.images && (
                            <div className="mt-16 mb-24">
                                <h2 className="text-3xl font-outfit font-bold text-white mb-8 flex items-center gap-3">
                                    <div className={`w-1.5 h-8 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                                    Work Showcase
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {service.images.map((img: string, idx: number) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="group relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/5 bg-white/5"
                                        >
                                            <Image
                                                src={img}
                                                alt={`${service.title} Portfolio ${idx + 1}`}
                                                fill
                                                priority={idx < 2}
                                                className={`${(slug === 'modeling' || slug === 'tester') ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e1b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[32px] transition-colors duration-500" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="glass-panel p-12 rounded-[40px] border-primary/20 bg-primary/5 relative overflow-hidden group">
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div>
                                    <h2 className="text-3xl font-outfit font-bold text-white mb-2">Ready to start?</h2>
                                    <p className="text-text-muted">Transform your project with expert {service.title.toLowerCase()}.</p>
                                </div>
                                <Link href="/contact" className="px-8 py-4 bg-primary text-white rounded-2xl font-outfit font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.05] active:scale-[0.98]">
                                    Hire Me for {service.title}
                                    <Zap size={20} />
                                </Link>
                            </div>

                            {/* Animated decorative circles */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
