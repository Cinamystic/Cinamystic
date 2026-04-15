import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Particles({ count = 200 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      // Mix of warm resin and deep caramel particles
      if (Math.random() > 0.6) {
        // Resin amber
        colors[i * 3] = 0.78;
        colors[i * 3 + 1] = 0.47;
        colors[i * 3 + 2] = 0.25;
      } else {
        // Warm caramel dust
        const g = 0.25 + Math.random() * 0.2;
        colors[i * 3] = g * 1.2;
        colors[i * 3 + 1] = g * 0.8;
        colors[i * 3 + 2] = g * 0.7;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
