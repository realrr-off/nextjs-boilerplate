'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { User, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UsernamePrompt() {
    const { user, profile, loading, refreshProfile } = useAuth();
    const [username, setUsername] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Only show if user is logged in but has no profile
    if (loading || !user || profile) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            // Check if username is taken
            const { data: existingProfile, error: checkError } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .maybeSingle();

            if (checkError) throw checkError;
            if (existingProfile) {
                throw new Error('This username is already taken. Please try another one.');
            }

            // Create profile
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    username: username,
                });

            if (insertError) throw insertError;

            // Refresh profile in context
            await refreshProfile();
        } catch (err: any) {
            setError(err.message || 'Failed to set username. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-md p-10 bg-zinc-900 border border-white/10 rounded-[40px] shadow-2xl space-y-8 scale-in-center animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3">
                    <div className="mx-auto w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6">
                        <User className="text-white" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter">Choose your identity</h2>
                    <p className="text-zinc-400 text-sm font-medium px-4">
                        Welcome! Before you continue, please choose a unique username for your account.
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-xs font-bold">
                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-2 block">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                minLength={3}
                                maxLength={20}
                                placeholder="basketball_pro"
                                className="w-full bg-zinc-950 border border-white/5 rounded-2xl py-5 px-6 text-white focus:border-white/20 focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-zinc-800 text-lg font-bold"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            />
                            {username.length >= 3 && !error && (
                                <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500/50" size={24} />
                            )}
                        </div>
                        <p className="mt-3 ml-4 text-[10px] text-zinc-600 font-medium">Only lowercase letters, numbers, and underscores.</p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || username.length < 3}
                        className="w-full py-5 bg-white text-black font-black text-lg rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:hover:scale-100 shadow-xl shadow-white/5"
                    >
                        {submitting ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            "Claim Username"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
