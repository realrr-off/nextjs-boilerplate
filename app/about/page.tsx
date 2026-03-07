'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { User, Sparkles, Code2, Users2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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

                    <div className="max-w-4xl">
                        <h1 className="text-6xl font-outfit font-extrabold leading-tight tracking-tight text-white mb-12">
                            About <span className="text-primary">Me</span>
                        </h1>

                        <div className="grid gap-12 text-lg text-text-muted leading-relaxed">
                            <div className="space-y-6">
                                <p className="text-white font-medium text-xl leading-relaxed">
                                    I am a 16-year-old Full-stack Developer with six years of experience in building and scaling high-traffic digital environment projects.
                                </p>
                                <p>
                                    My expertise ranges from 3D modeling to map building and expert lighting, scripting, and QA testing. I have achieved success in my career with quality output, having contributed to projects that have achieved success in terms of reaching millions of visits.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="glass-panel p-8 rounded-3xl">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <Code2 size={24} />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-4">Versatile Programmer</h3>
                                    <p className="text-sm">
                                        Expertise in Lua, Java, JavaScript, Python, and HTML. Extensive experience in programming Discord bots for growing communities.
                                    </p>
                                </div>
                                <div className="glass-panel p-8 rounded-3xl">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <Users2 size={24} />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-4">Leadership Edge</h3>
                                    <p className="text-sm">
                                        Ability to take up roles as Project and Community Manager to deliver quality products with active player bases from the start.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 border-l-2 border-primary/20 pl-8">
                                <p>
                                    I am available in UTC +5:30 but have a flexible schedule to accommodate global collaboration. Although my primary focus is on paid commission-based roles, I am available to take up revenue-share or equity-based roles in high-potential projects with investors to back it up.
                                </p>
                                <p className="text-white font-semibold">
                                    I take pride in professional and top-tier output and look forward to helping turn a great vision into a massive reality.
                                </p>
                            </div>

                            <div className="pt-8">
                                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-outfit font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.05] active:scale-[0.98]">
                                    Let's Collaborate
                                    <Sparkles size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
