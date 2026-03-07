'use client';

import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import BackgroundParticles from './BackgroundParticles';

interface SceneCanvasProps {
    children?: React.ReactNode;
}

export default function SceneCanvas({ children }: SceneCanvasProps) {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 2]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <color attach="background" args={['#0d0e1b']} />

                <Suspense fallback={null}>
                    <BackgroundParticles />
                    {children}

                    <EffectComposer disableNormalPass>
                        <Bloom
                            luminanceThreshold={0.2}
                            mipmapBlur
                            intensity={0.8}
                            radius={0.4}
                        />
                        <Noise opacity={0.03} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>
                </Suspense>

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#2d46fa" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
            </Canvas>
        </div>
    );
}
