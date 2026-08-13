import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';

function Laptop() {
  return (
    <group position={[0.7, 0.15, 0]}>
      <RoundedBox args={[1.7, 1.05, 0.09]} radius={0.05} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#202631" roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.48, 0.84, 0.02]} radius={0.03} position={[0, 0.55, 0.056]}>
        <meshStandardMaterial color="#245cff" emissive="#153995" emissiveIntensity={0.5} />
      </RoundedBox>
      <mesh position={[0, -0.02, 0.25]} rotation={[-0.13, 0, 0]}>
        <boxGeometry args={[1.9, 0.08, 1.05]} />
        <meshStandardMaterial color="#8a8f98" roughness={0.45} metalness={0.25} />
      </mesh>
    </group>
  );
}

function Person() {
  return (
    <group position={[-0.8, -0.15, 0.25]}>
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#d2aa80" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <capsuleGeometry args={[0.38, 0.75, 10, 20]} />
        <meshStandardMaterial color="#29417d" roughness={0.75} />
      </mesh>
      <mesh position={[0.24, 0.58, 0.15]} rotation={[0.3, 0, -0.75]}>
        <capsuleGeometry args={[0.08, 0.72, 8, 16]} />
        <meshStandardMaterial color="#29417d" />
      </mesh>
      <mesh position={[-0.24, 0.58, 0.15]} rotation={[0.3, 0, 0.75]}>
        <capsuleGeometry args={[0.08, 0.72, 8, 16]} />
        <meshStandardMaterial color="#29417d" />
      </mesh>
    </group>
  );
}

function Phone() {
  return (
    <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.08}>
      <RoundedBox args={[0.42, 0.82, 0.08]} radius={0.07} position={[1.95, 0.65, 0.12]} rotation={[0, -0.2, 0.1]}>
        <meshStandardMaterial color="#151a22" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.68, 0.015]} radius={0.045} position={[1.95, 0.65, 0.17]} rotation={[0, -0.2, 0.1]}>
        <meshStandardMaterial color="#315fff" emissive="#1a3fa5" emissiveIntensity={0.65} />
      </RoundedBox>
    </Float>
  );
}

function Desk() {
  return (
    <group position={[0.45, -0.55, 0]}>
      <mesh>
        <cylinderGeometry args={[1.85, 1.85, 0.16, 64]} />
        <meshStandardMaterial color="#ddd7ce" roughness={0.85} />
      </mesh>
      <mesh position={[-1.15, -0.75, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.45, 24]} />
        <meshStandardMaterial color="#aaa398" />
      </mesh>
      <mesh position={[1.15, -0.75, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.45, 24]} />
        <meshStandardMaterial color="#aaa398" />
      </mesh>
    </group>
  );
}

function Signal({ from, to, offset = 0 }) {
  const dot = useRef();
  useFrame(({ clock }) => {
    if (!dot.current) return;
    const t = (clock.getElapsedTime() * 0.16 + offset) % 1;
    dot.current.position.x = from[0] + (to[0] - from[0]) * t;
    dot.current.position.y = from[1] + (to[1] - from[1]) * t;
    dot.current.position.z = from[2] + (to[2] - from[2]) * t;
  });

  return (
    <>
      <mesh position={[
        (from[0] + to[0]) / 2,
        (from[1] + to[1]) / 2,
        (from[2] + to[2]) / 2,
      ]}>
        <boxGeometry args={[Math.abs(to[0] - from[0]) || 0.02, 0.014, 0.014]} />
        <meshBasicMaterial color="#6e8eff" transparent opacity={0.28} />
      </mesh>
      <mesh ref={dot} position={from}>
        <sphereGeometry args={[0.045, 18, 18]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <group rotation={[0.02, -0.08, 0]}>
      <mesh position={[0.55, -1.45, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.18, 80]} />
        <meshStandardMaterial color="#ebe6df" roughness={1} />
      </mesh>

      <Desk />
      <Person />
      <Laptop />
      <Phone />

      <Signal from={[-0.15, 0.8, 0.25]} to={[0.7, 0.75, 0.25]} offset={0} />
      <Signal from={[0.7, 0.7, 0.2]} to={[1.95, 0.7, 0.2]} offset={0.4} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas-wrap">
      <div className="hero-canvas-glow" />
      <Canvas camera={{ position: [4.8, 3.1, 6.4], fov: 38 }} dpr={[1, 1.75]}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 6, 4]} intensity={3.2} color="#fff4e8" />
        <directionalLight position={[-4, 2, 1]} intensity={1.6} color="#7b9bff" />
        <Scene />
        <Environment preset="city" />
      </Canvas>
      <span className="scene-pill scene-pill-a">Everyday life</span>
      <span className="scene-pill scene-pill-b">Things are changing</span>
      <span className="scene-pill scene-pill-c">Look closer</span>
    </div>
  );
}
