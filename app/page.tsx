'use client';

import React from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { ArrowRight, Code2, Box, Users, Mail, Compass } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import dynamic from 'next/dynamic';

const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas'), { ssr: false });
const HeroObject = dynamic(() => import('@/components/three/HeroObject'), { ssr: false });
const ParticleGlobe = dynamic(() => import('@/components/three/ParticleGlobe'), { ssr: false });

export default function Home() {
  const { scrollY } = useScroll();
  const springScroll = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Arch Animations
  const archOpacity = useTransform(springScroll, [0, 400], [1, 0]);
  const archScale = useTransform(springScroll, [0, 400], [1, 1.5]);
  const archY = useTransform(springScroll, [0, 400], [0, -200]);

  // Intro Animations
  const introOpacity = useTransform(springScroll, [300, 600, 1000, 1300], [0, 1, 1, 0]);
  const introY = useTransform(springScroll, [300, 1000], [50, 0]);

  // Navigation Transitions
  const navOpacity = useTransform(springScroll, [1100, 1400], [0, 1]);

  const navItems = [
    { label: 'Projects', href: '/projects', icon: Compass, color: 'from-blue-600/20 to-cyan-500/10' },
    { label: 'Services', href: '/services', icon: Box, color: 'from-purple-600/20 to-pink-500/10' },
    { label: 'About', href: '/about', icon: Users, color: 'from-emerald-600/20 to-teal-500/10' },
    { label: 'Contact', href: '/contact', icon: Mail, color: 'from-rose-600/20 to-orange-500/10' },
  ];

  return (
    <>
      <Sidebar />
      <SceneCanvas>
        <motion.group
          style={{
            y: useTransform(springScroll, [0, 1000], [0, -2]),
            opacity: useTransform(springScroll, [0, 500], [1, 0])
          }}
        >
          <HeroObject />
        </motion.group>

        <motion.group
          position={[0, -5, 0]}
          style={{
            y: useTransform(springScroll, [800, 1600], [0, 5]),
            opacity: useTransform(springScroll, [800, 1200, 1600, 2000], [0, 1, 1, 0])
          }}
        >
          <ParticleGlobe />
        </motion.group>
      </SceneCanvas>

      <main className="flex-1 bg-transparent relative selection:bg-primary/30 flex flex-col">

        {/* SECTION 1: NEON ARCH ENTRY */}
        <motion.section
          style={{ opacity: archOpacity, scale: archScale, y: archY }}
          className="h-screen flex flex-col items-center justify-center relative sticky top-0 z-20 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e1b] via-transparent to-[#0d0e1b] pointer-events-none z-10" />

          <div className="neon-arch-container relative w-full flex justify-center">
            {/* The Upside Down Arch using SVG */}
            <svg width="600" height="300" viewBox="0 0 600 300" className="neon-arch-glow overflow-visible">
              <path
                d="M 50 250 Q 300 -50 550 250"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-primary-glow"
              />
              <path
                d="M 50 250 Q 300 -50 550 250"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ filter: 'blur(1px)' }}
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center mt-20">
              <motion.h2
                initial={{ opacity: 0, letterSpacing: '1em' }}
                animate={{ opacity: 1, letterSpacing: '0.4em' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="text-[10px] uppercase font-bold text-primary-glow mb-4"
              >
                Now Entering
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-8xl font-outfit font-black text-white"
              >
                REALRR
              </motion.h1>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Scroll to Initiate</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </motion.section>

        {/* SECTION 2: INTRODUCTION */}
        <motion.section
          style={{ opacity: introOpacity, y: introY }}
          className="h-screen flex items-center justify-center px-12 relative sticky top-0 z-10 bg-background"
        >
          <div className="max-w-4xl text-center space-y-12">
            <h2 className="text-primary-glow font-mono text-sm tracking-tighter">EST_2024 // SYSTEM_READY</h2>
            <p className="text-3xl md:text-5xl font-outfit font-bold text-white leading-tight">
              I am a versatile developer and project leader with technical expertise in
              <span className="text-primary opacity-80"> immersive map building</span>,
              <span className="text-primary opacity-80"> 3D modeling</span>, and
              <span className="text-primary opacity-80"> dynamic scripting</span>.
            </p>
          </div>
        </motion.section>

        {/* SECTION 3: LIQUID REACTOR NAVIGATION */}
        <motion.section
          style={{ opacity: navOpacity }}
          className="min-h-screen relative z-30 pt-32 pb-64 px-12"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            <h3 className="text-4xl font-outfit font-black text-white mb-16 px-4">Core Node Navigation</h3>
            <div className="grid grid-cols-1 gap-6">
              {navItems.map((item, idx) => (
                <Link key={item.label} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.01, x: 10 }}
                    className="h-48 glass-panel rounded-[32px] relative overflow-hidden group border-white/5 hover:border-primary/50 transition-all duration-500 flex items-center px-12"
                  >
                    {/* Liquid Reactor Inside */}
                    <div className="absolute inset-0 liquid-reactor opacity-20 group-hover:opacity-40 transition-opacity">
                      <div
                        className={`absolute inset-[-50%] bg-gradient-to-br ${item.color} rounded-full blur-[80px] liquid-blob`}
                        style={{ animationDelay: `${idx * -2}s` }}
                      />
                      <div
                        className={`absolute inset-[-30%] bg-gradient-to-tr ${item.color} rounded-full blur-[60px] liquid-blob`}
                        style={{ animationDelay: `${idx * -5}s` }}
                      />
                    </div>

                    <div className="relative z-10 flex items-center justify-between w-full">
                      <div className="flex items-center gap-12">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-primary/20 group-hover:text-primary-glow transition-all duration-500">
                          <item.icon size={32} />
                        </div>
                        <span className="text-6xl font-outfit font-extrabold text-white group-hover:tracking-widest transition-all duration-700">
                          {item.label}
                        </span>
                      </div>
                      <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-primary-glow group-hover:border-primary/50 transition-all duration-500">
                        <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer Filler for Scroll Depth */}
        <div className="h-[20vh]" />
      </main>
    </>
  );
}
