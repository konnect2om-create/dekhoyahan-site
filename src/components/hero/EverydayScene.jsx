import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

const PHONE_PATH = "/models/hero/hero-phone-modern.glb";

function Phone() {
  const { scene } = useGLTF(PHONE_PATH);

  const { phone, scale } = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);
    cloned.position.sub(center);

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return {
      phone: cloned,
      scale: 2.45 / size.y,
    };
  }, [scene]);

  return (
    <group
      position={[0.45, 0.13, 0.15]}
      rotation={[-Math.PI / 2, 0, -0.28]}
      scale={scale}
    >
      <primitive object={phone} />
    </group>
  );
}

function Tabletop() {
  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 8]} />

      <meshStandardMaterial
        color="#d9c4a8"
        roughness={0.94}
        metalness={0}
      />
    </mesh>
  );
}

function SoftWindowLight() {
  return (
    <group position={[-2.5, 0.04, -1.25]} rotation={[0, -0.18, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.25, 2.7]} />
        <meshBasicMaterial
          color="#fff8e9"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(PHONE_PATH);

export default function EverydayScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows
        camera={{
          position: [0.1, 6.9, 3.15],
          fov: 30,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <color attach="background" args={["#f5ede1"]} />

        <ambientLight intensity={0.8} />

        <directionalLight
          castShadow
          position={[-4, 7, 5]}
          intensity={2}
          color="#fff4df"
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[5, 4, -2]}
          intensity={0.45}
          color="#fffaf1"
        />

        <Tabletop />
        <SoftWindowLight />

        <Suspense fallback={null}>
          <Phone />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
}