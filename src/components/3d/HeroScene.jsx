import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree, invalidate } from '@react-three/fiber';
// Environment preset removed — manual lights are sufficient and avoid HDR load
import * as THREE from 'three';
import Workstation from './Workstation';
import Particles from './Particles';

// Continuously request frames so the scene animates (breathing, particles)
function FrameDriver() {
  useFrame(() => { invalidate(); });
  return null;
}

// Camera pushes into the monitor as scroll advances
function CameraController({ scrollProgress }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.35, -0.4));

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress));
    const eased = t * t * (3 - 2 * t); // smoothstep

    // Start: [0, 0.6, 6.2] — full desk in view
    // End:   [0, 0.35, 3.2] — monitor fills frame
    const camX = 0;
    const camY = 0.6 - eased * 0.25;
    const camZ = 6.2 - eased * 3.0;

    camera.position.x += (camX - camera.position.x) * 0.08;
    camera.position.y += (camY - camera.position.y) * 0.08;
    camera.position.z += (camZ - camera.position.z) * 0.08;

    target.current.set(0, 0.35, -0.4);
    camera.lookAt(target.current);
  });

  return null;
}

export default function HeroScene({ mouse, scrollProgress = 0 }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.2], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.25]}
      performance={{ min: 0.5 }}
      frameloop="demand"
    >
      <FrameDriver />
      <CameraController scrollProgress={scrollProgress} />

      {/* Moody low ambient — dark backdrop calls for controlled lighting */}
      <ambientLight intensity={0.25} color="#1a2a3a" />

      {/* Key light — cool daylight from upper right */}
      <directionalLight position={[4, 5, 3]} intensity={0.85} color="#e8f1f6" />

      {/* Rim light — back-left, ocean blue accent */}
      <pointLight position={[-4, 2, -3]} intensity={2.4} color="#2872a1" distance={14} decay={1.6} />

      {/* Fill from right-front */}
      <pointLight position={[3, -1, 2]} intensity={0.55} color="#3a8fc0" distance={8} />

      {/* Subtle counter from below */}
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#1a4d70" distance={6} />

      <Workstation
        mouse={mouse}
        scrollProgress={scrollProgress}
        hoveredSkill={hoveredSkill}
        setHoveredSkill={setHoveredSkill}
      />

      <Particles count={50} />

      <fog attach="fog" args={['#0a1520', 8, 17]} />
    </Canvas>
  );
}
