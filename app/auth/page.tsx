'use client';

import AuthForm from '@/components/auth/AuthForm';

export default function AuthPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full flex justify-center">
                <AuthForm />
            </div>
        </main>
    );
}
