import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeometry = () => {
    // Refs for animation
    const groupRef = useRef<THREE.Group>(null);
    const shape1 = useRef<THREE.Mesh>(null);
    const shape2 = useRef<THREE.Mesh>(null);

    // Subtle rotation and mouse interaction
    useFrame((state) => {
        if (!groupRef.current) return;

        // Gentle global rotation
        groupRef.current.rotation.y += 0.002;

        // Mouse parallax (damped)
        const { x, y } = state.pointer;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.1, 0.1);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, x * 0.1, 0.1);
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#2dd4bf" />

            {/* Main Golden Geometric Seed */}
            <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
                <Icosahedron ref={shape1} args={[1.6, 0]} position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
                    <meshStandardMaterial
                        color="#D4AF37" // Pure Gold
                        roughness={0.2}
                        metalness={0.9}
                        emissive="#D4AF37"
                        emissiveIntensity={0.2}
                        transparent
                        opacity={0.9}
                        wireframe={true}
                    />
                </Icosahedron>
            </Float>

            {/* Bronze Ring Orbit */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
                <Torus ref={shape2} args={[2.8, 0.03, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
                    <meshStandardMaterial
                        color="#CD7F32" // Bronze
                        emissive="#CD7F32"
                        emissiveIntensity={1.5}
                        roughness={0.1}
                        metalness={1}
                    />
                </Torus>
            </Float>

            {/* Inner Espresso Core */}
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]}>
                    <dodecahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial
                        color="#3E2723" // Deep Espresso
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
            </Float>
        </group>
    );
};

export default FloatingGeometry;
