'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export default function ParticleGlobe({ radius = 2, count = 1000 }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const { scrollYProgress } = useScroll();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        return positions;
    }, [count, radius]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const scroll = scrollYProgress.get();
        // Visible between 0.4 and 0.8 scroll
        const isVisible = scroll > 0.4 && scroll < 0.8;
        pointsRef.current.visible = isVisible;

        if (isVisible) {
            pointsRef.current.position.y = (scroll - 0.4) * 10 - 5;
            pointsRef.current.rotation.y += 0.002;
            pointsRef.current.rotation.x += 0.001;

            // Scale pulse effect
            const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
            pointsRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    {...({
                        count: particles.length / 3,
                        array: particles,
                        itemSize: 3,
                    } as any)}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#4f46e5"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
