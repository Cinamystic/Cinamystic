import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import MonitorScreen from './MonitorScreen';

// Build a curved panel by bending a flat plane's vertices along X.
// Center of the plane pushes back by `depth`; edges stay at z=0.
function buildCurvedPlane(width, height, depth, wSeg = 40, hSeg = 6) {
  const g = new THREE.PlaneGeometry(width, height, wSeg, hSeg);
  const pos = g.attributes.position;
  const halfW = width / 2;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const t = x / halfW;
    pos.setZ(i, -depth * (1 - t * t));
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

/*
  Editing workstation — the hero centerpiece.
  Slate-wood desk, dark ocean monitor housing, ocean-blue screen glow.
  The screen content (MonitorScreen) is a drei Html plane with interactive UI.
*/

const RESIN = '#2872a1';           // Ocean Blue — primary glow/accent
const RESIN_DEEP = '#1a4d70';      // Ocean deep — emissive/shadow
const CARAMEL = '#1a3547';         // Monitor housing — dark navy for contrast
const CARAMEL_LIGHT = '#2e4a63';   // Monitor housing highlight
const WOOD = '#8fa8bd';            // Desk surface — cool slate
const WOOD_LIGHT = '#a8bdd0';      // Desk edge highlight
const METAL = '#3a4f62';           // Monitor stand / headphones — gunmetal
const KEY = '#e8f1f6';             // Keyboard keys — light ivory

export default function Workstation({ mouse, scrollProgress = 0, hoveredSkill, setHoveredSkill }) {
  const groupRef = useRef();
  const screenLightRef = useRef();

  // Curved geometries — reused across frames
  const curvedScreenGeom = useMemo(() => buildCurvedPlane(3.2, 1.8, 0.24, 40, 6), []);
  const curvedFrameGeom = useMemo(() => buildCurvedPlane(3.55, 2.05, 0.24, 40, 6), []);
  const curvedShellGeom = useMemo(() => buildCurvedPlane(3.62, 2.12, 0.24, 40, 6), []);

  useFrame(() => {
    if (!groupRef.current) return;

    // Gentle breathing idle
    const t = Date.now() * 0.0005;
    groupRef.current.rotation.y = Math.sin(t) * 0.015;
    groupRef.current.position.y = Math.sin(t * 1.3) * 0.01;

    // Mouse parallax — very subtle
    if (mouse?.current) {
      const tx = mouse.current.x * 0.08;
      const ty = -mouse.current.y * 0.04;
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.02;
    }

    // Screen glow pulses slightly
    if (screenLightRef.current) {
      screenLightRef.current.intensity = 3.2 + Math.sin(t * 4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* ═══ DESK TOP ═══ */}
      <mesh position={[0, -1.4, 0]} receiveShadow>
        <boxGeometry args={[7, 0.18, 3.2]} />
        <meshStandardMaterial color={WOOD} roughness={0.7} metalness={0.08} />
      </mesh>
      {/* Desk edge highlight strip */}
      <mesh position={[0, -1.31, 1.55]}>
        <boxGeometry args={[7, 0.02, 0.04]} />
        <meshStandardMaterial color={WOOD_LIGHT} roughness={0.5} metalness={0.15} />
      </mesh>
      {/* Desk front edge */}
      <mesh position={[0, -1.5, 1.6]}>
        <boxGeometry args={[7, 0.08, 0.08]} />
        <meshStandardMaterial color="#6a8ba0" roughness={0.8} />
      </mesh>

      {/* ═══ MONITOR STAND ═══ */}
      {/* Base plate */}
      <mesh position={[0, -1.28, -0.6]}>
        <cylinderGeometry args={[0.55, 0.65, 0.06, 24]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.85, -0.6]}>
        <boxGeometry args={[0.12, 0.85, 0.12]} />
        <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Pivot */}
      <mesh position={[0, -0.38, -0.55]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={METAL} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ═══ CURVED MONITOR ═══ */}
      {/* Curved back shell — dark navy, pushed furthest back */}
      <mesh
        position={[0, 0.35, -0.58]}
        geometry={curvedShellGeom}
      >
        <meshStandardMaterial
          color={CARAMEL}
          roughness={0.55}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Curved outer frame — slightly darker gunmetal, tight bezel */}
      <mesh
        position={[0, 0.35, -0.49]}
        geometry={curvedFrameGeom}
      >
        <meshStandardMaterial
          color="#0f1f30"
          roughness={0.5}
          metalness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Curved screen surface — emissive ocean glow (same color family, dark) */}
      <mesh
        position={[0, 0.35, -0.47]}
        geometry={curvedScreenGeom}
      >
        <meshStandardMaterial
          color="#0a1520"
          emissive={RESIN}
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Brand dot on lower bezel */}
      <mesh position={[0, -0.69, -0.44]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial color={RESIN} emissive={RESIN} emissiveIntensity={1.4} />
      </mesh>

      {/* HTML content — flat plane sitting just in front of the curved screen center */}
      <group position={[0, 0.35, -0.43]}>
        <Html
          transform
          occlude="blending"
          distanceFactor={1.45}
          position={[0, 0, 0]}
          style={{
            width: '640px',
            height: '360px',
            pointerEvents: 'auto',
          }}
        >
          <MonitorScreen
            scrollProgress={scrollProgress}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        </Html>
      </group>

      {/* Screen glow light — spills onto desk/keyboard */}
      <pointLight
        ref={screenLightRef}
        position={[0, 0.3, 0.6]}
        intensity={3.2}
        color={RESIN}
        distance={7}
        decay={2}
      />

      {/* ═══ KEYBOARD ═══ */}
      <group position={[0, -1.28, 0.65]}>
        {/* Base */}
        <mesh>
          <boxGeometry args={[2.2, 0.08, 0.72]} />
          <meshStandardMaterial color="#4a6a80" roughness={0.7} metalness={0.3} />
        </mesh>
        {/* Key grid — 4 rows x 14 cols */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <mesh
              key={`k-${row}-${col}`}
              position={[-0.95 + col * 0.14, 0.05, -0.24 + row * 0.16]}
            >
              <boxGeometry args={[0.11, 0.04, 0.12]} />
              <meshStandardMaterial color={KEY} roughness={0.5} metalness={0.35} />
            </mesh>
          ))
        )}
        {/* Spacebar */}
        <mesh position={[0, 0.05, 0.32]}>
          <boxGeometry args={[1.0, 0.04, 0.12]} />
          <meshStandardMaterial color={KEY} roughness={0.5} metalness={0.35} />
        </mesh>
        {/* Backlit underglow */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[2.3, 0.01, 0.8]} />
          <meshStandardMaterial color={RESIN} emissive={RESIN} emissiveIntensity={0.8} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* ═══ MOUSE ═══ */}
      <group position={[1.55, -1.28, 0.65]}>
        <mesh rotation={[0, 0.15, 0]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          <meshStandardMaterial color="#5a7a90" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.06, 0.01]} rotation={[0, 0.15, 0]} scale={[0.85, 0.35, 1.1]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          <meshStandardMaterial color="#8fadc2" roughness={0.4} />
        </mesh>
      </group>

      {/* ═══ COFFEE MUG ═══ */}
      <group position={[-2.1, -1.18, 0.4]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.2, 0.42, 24]} />
          <meshStandardMaterial color={CARAMEL_LIGHT} roughness={0.35} metalness={0.15} />
        </mesh>
        {/* Inside dark */}
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.02, 24]} />
          <meshStandardMaterial color="#3a5a70" roughness={0.9} />
        </mesh>
        {/* Handle */}
        <mesh position={[0.28, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.028, 8, 20, Math.PI]} />
          <meshStandardMaterial color={CARAMEL_LIGHT} roughness={0.35} metalness={0.15} />
        </mesh>
        {/* Steam wisp */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#1a3547" transparent opacity={0.12} />
        </mesh>
        <mesh position={[0.02, 0.55, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#1a3547" transparent opacity={0.08} />
        </mesh>
      </group>

      {/* ═══ FILM CAN STACK (left of keyboard) ═══ */}
      <group position={[-2.2, -1.32, 0.85]}>
        <mesh>
          <cylinderGeometry args={[0.28, 0.28, 0.06, 24]} />
          <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.06, 24]} />
          <meshStandardMaterial color={RESIN_DEEP} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.06, 24]} />
          <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
        </mesh>
      </group>

      {/* ═══ HEADPHONES on desk (right side) ═══ */}
      <group position={[2.2, -1.25, 0.3]} rotation={[0.2, -0.3, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.025, 8, 32, Math.PI]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.28, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 20]} />
          <meshStandardMaterial color="#8fadc2" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-0.28, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.012, 8, 20]} />
          <meshStandardMaterial color={RESIN} emissive={RESIN} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.28, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 20]} />
          <meshStandardMaterial color="#8fadc2" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0.28, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.012, 8, 20]} />
          <meshStandardMaterial color={RESIN} emissive={RESIN} emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}
