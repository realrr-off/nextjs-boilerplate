'use client';

import React from 'react';
import Link from 'next/link';
import { Home, LayoutGrid, Sparkles, User, Mail, MessageSquare } from 'lucide-react';

import { usePathname } from 'next/navigation';

const navItems = [
    { icon: Home, label: 'Overview', href: '/' },
    { icon: LayoutGrid, label: 'Projects', href: '/projects' },
    { icon: Sparkles, label: 'Services', href: '/services' },
    { icon: User, label: 'About', href: '/about' },
    { icon: Mail, label: 'Contact', href: '/contact' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[280px] bg-[#0d0e1b] border-r border-white/5 flex flex-col h-screen sticky top-0">
            {/* Profile Section */}
            <div className="p-8 pb-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/20">
                        R
                    </div>
                    <div>
                        <h2 className="font-outfit font-bold tracking-tight text-white uppercase text-sm">Realrr</h2>
                        <p className="text-[10px] text-text-muted font-medium uppercase tracking-wider leading-tight">Project Leader &<br />Full-Cycle Developer</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-primary/10 text-primary border-r-2 border-primary'
                                : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-primary' : 'group-hover:text-white transition-colors'} />
                            <span className="font-outfit text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
