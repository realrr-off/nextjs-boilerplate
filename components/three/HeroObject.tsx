'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei';

export default function HeroObject() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const glowRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Smooth mouse parallax
        const targetX = state.mouse.x * 0.5;
        const targetY = state.mouse.y * 0.5;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY, 0.05);

        // Light sweep effect emulation via emissive intensity pulse
        if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
            meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group>
                {/* Main Panel */}
                <mesh ref={meshRef}>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshStandardMaterial
                        color="#1a1b3b"
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.8}
                        emissive="#2d46fa"
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Outer Glow Wireframe */}
                <mesh ref={glowRef} scale={[1.05, 1.05, 1.05]}>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshBasicMaterial
                        color="#2d46fa"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Decorative inner elements */}
                <mesh position={[0, 0, 0.06]}>
                    <planeGeometry args={[2.8, 1.8]} />
                    <MeshWobbleMaterial
                        factor={0.1}
                        speed={1}
                        color="#4f46e5"
                        opacity={0.1}
                        transparent
                    />
                </mesh>
            </group>
        </Float>
    );
}
