'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, UserPlus, LogIn, Loader2, AlertCircle } from 'lucide-react';

export default function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form Stats
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // Login Flow
                const { error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (loginError) throw loginError;
            } else {
                // Signup Flow
                if (!username) throw new Error("Username is required.");

                // Check if username exists
                const { data: existingProfile } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('username', username)
                    .maybeSingle();

                if (existingProfile) {
                    throw new Error("This username is already taken.");
                }

                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (signUpError) throw signUpError;

                if (signUpData.user) {
                    // Create Profile Entry
                    const { error: profileError } = await supabase.from('profiles').insert({
                        id: signUpData.user.id,
                        username: username.toLowerCase().replace(/[^a-z0-9_]/g, ''),
                    });

                    if (profileError) throw profileError;
                }
            }

            router.push('/');
            router.refresh();
        } catch (err: any) {
            setError(err.message || "An authentication error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-2xl">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-black text-white tracking-tighter">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-zinc-400 text-sm font-medium">
                    {isLogin ? "Sign in to access your dashboard" : "Join us to start tracking your progress"}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                    <div className="relative group">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1 block">Username</label>
                        <User className="absolute left-4 top-10 text-zinc-500" size={18} />
                        <input
                            type="text"
                            required
                            placeholder="basketball_pro"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-white/20 focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-zinc-700"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                )}

                <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1 block">Email Address</label>
                    <Mail className="absolute left-4 top-10 text-zinc-500" size={18} />
                    <input
                        type="email"
                        required
                        placeholder="coach@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-white/20 focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-zinc-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 mb-1 block">Password</label>
                    <Lock className="absolute left-4 top-10 text-zinc-500" size={18} />
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-white/20 focus:ring-4 focus:ring-white/5 outline-none transition-all placeholder:text-zinc-700"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <>
                            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                            {isLogin ? "Sign In" : "Sign Up"}
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-zinc-500 text-sm font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-white font-bold hover:underline underline-offset-4"
                >
                    {isLogin ? "Sign Up" : "Log In"}
                </button>
            </div>
        </div>
    );
}
