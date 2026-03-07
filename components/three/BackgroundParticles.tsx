'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BackgroundParticles({ count = 2000 }) {
    const points = useRef<THREE.Points>(null!);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            velocities[i] = Math.random() * 0.01;
            sizes[i] = Math.random() * 2;
        }

        return { positions, velocities, sizes };
    }, [count]);

    useFrame((state) => {
        if (!points.current) return;
        const { position } = points.current.geometry.attributes;
        if (!position) return;

        for (let i = 0; i < count; i++) {
            // Drift upward
            position.array[i * 3 + 1] += particles.velocities[i];
            if (position.array[i * 3 + 1] > 5) position.array[i * 3 + 1] = -5;

            // Gentle horizontal oscillation
            position.array[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        }
        position.needsUpdate = true;

        // Parallax effect based on mouse
        points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, state.mouse.y * 0.1, 0.05);
        points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, -state.mouse.x * 0.1, 0.05);
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    {...({
                        count: particles.positions.length / 3,
                        array: particles.positions,
                        itemSize: 3,
                    } as any)}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#2d46fa"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
