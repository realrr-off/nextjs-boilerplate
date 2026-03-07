'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Mail, MessageCircle, Gamepad2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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

                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-outfit font-extrabold leading-tight tracking-tight text-white mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl text-text-muted leading-relaxed mb-12">
                            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out through any of these platforms.
                        </p>

                        <div className="grid gap-6">
                            {/* Discord */}
                            <div className="glass-panel p-8 rounded-3xl flex items-center gap-6 hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <MessageCircle size={32} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">Discord</h3>
                                    <p className="text-2xl font-outfit font-bold text-white">realrr_off</p>
                                </div>
                            </div>

                            {/* Roblox */}
                            <div className="glass-panel p-8 rounded-3xl flex items-center gap-6 hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Gamepad2 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">Roblox</h3>
                                    <p className="text-2xl font-outfit font-bold text-white">realargamer</p>
                                </div>
                            </div>

                            {/* Gmail */}
                            <div className="glass-panel p-8 rounded-3xl flex items-center gap-6 hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail size={32} />
                                </div>
                                <div>
                                    <h3 className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">Gmail</h3>
                                    <p className="text-2xl font-outfit font-bold text-white">realrr857@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
