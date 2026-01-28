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

            {/* Main Crystal */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Icosahedron ref={shape1} args={[1.5, 0]} position={[0, 0, 0]}>
                    <meshStandardMaterial
                        color="#ffffff"
                        roughness={0.1}
                        metalness={0.8}
                        transparent
                        opacity={0.8}
                        wireframe={true}
                    />
                </Icosahedron>
            </Float>

            {/* Surrounding Ring */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
                <Torus ref={shape2} args={[2.5, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial
                        color="#2dd4bf"
                        emissive="#2dd4bf"
                        emissiveIntensity={2}
                        roughness={0}
                        metalness={1}
                    />
                </Torus>
            </Float>
        </group>
    );
};

export default FloatingGeometry;
