'use client';

import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

import SpaceClicker from '@/components/game/SpaceClicker';

export default function Home() {
  const { session, loading } = useAuth();

  if (loading) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      {session ? (
        <SpaceClicker />
      ) : (
        <div className="flex flex-col items-center justify-center p-24 text-center h-screen space-y-6">
          <h1 className="text-6xl font-black tracking-tighter">
            Clean Slate<span className="text-zinc-700">.</span>
          </h1>
          <p className="text-zinc-400 font-medium max-w-sm mx-auto">
            Project has been reset. Supabase connection is confirmed. Sign in to start building.
          </p>
          <Link
            href="/auth"
            className="inline-flex h-12 items-center justify-center px-8 bg-white text-black font-black rounded-xl hover:scale-105 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>
      )}
    </main>
  );
}
