import { Canvas } from "@react-three/fiber";
import { Environment, Line, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import PhoneScreen from "./PhoneScreen";

const PHONE_PATH = "/models/hero/hero-phone-modern.glb";

const PHONE_POSITION = [0.35, 0.12, 0.15];
const PHONE_ROTATION = [-Math.PI / 2, 0, -0.24];

function PhoneBody({ stage }) {
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

    const targetHeight = 2.8;
    const normalizedScale = targetHeight / size.y;

    return {
      phone: cloned,
      scale: normalizedScale,
    };
  }, [scene]);

  const isReveal = stage === "signal";

  return (
    <group
      position={
        isReveal
          ? [0.75, 0.12, 0.08]
          : PHONE_POSITION
      }
      rotation={PHONE_ROTATION}
      scale={isReveal ? scale * 0.9 : scale}
    >
      <primitive object={phone} />
    </group>
  );
}

function ExperienceScreen({ stage }) {
  const isReveal = stage === "signal";

  return (
    <group
      position={
        isReveal
          ? [0.75, 0.225, 0.08]
          : [PHONE_POSITION[0], 0.225, PHONE_POSITION[2]]
      }
      rotation={[-Math.PI / 2, 0, -0.24]}
      scale={isReveal ? 0.9 : 1}
    >
      <PhoneScreen />
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
      <planeGeometry args={[9, 8]} />

      <meshStandardMaterial
        color="#dfd1bd"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}

function FirstReveal() {
  const source = [-1.4, 1.55, -0.45];
  const destination = [0.7, 0.33, 0.08];

  return (
    <group>
      {/* restrained source marker */}
      <mesh position={source}>
        <sphereGeometry args={[0.065, 32, 32]} />
        <meshBasicMaterial
          color="#e87524"
          toneMapped={false}
        />
      </mesh>

      {/* source halo */}
      <mesh position={source}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshBasicMaterial
          color="#e87524"
          transparent
          opacity={0.12}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* invisible signal path becomes visible */}
      <Line
        points={[source, destination]}
        color="#245cff"
        lineWidth={1.6}
        transparent
        opacity={0.68}
      />

      {/* small timing marks along path */}
      <mesh position={[-0.85, 1.23, -0.29]}>
        <sphereGeometry args={[0.035, 24, 24]} />
        <meshBasicMaterial
          color="#245cff"
          toneMapped={false}
        />
      </mesh>

      <mesh position={[-0.22, 0.86, -0.13]}>
        <sphereGeometry args={[0.035, 24, 24]} />
        <meshBasicMaterial
          color="#245cff"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(PHONE_PATH);

export default function LocationScene({ stage = "idle" }) {
  const showReveal = stage === "signal";

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows
        camera={{
          position: [0.15, 6.7, 2.9],
          fov: 29,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
      >
        <color attach="background" args={["#f6f0e6"]} />

        <ambientLight intensity={0.85} />

        <directionalLight
          castShadow
          position={[-4, 7, 5]}
          intensity={2.1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <directionalLight
          position={[5, 4, -2]}
          intensity={0.55}
        />

        <Tabletop />

        <Suspense fallback={null}>
          <PhoneBody stage={stage} />
          <ExperienceScreen stage={stage} />

          {showReveal && <FirstReveal />}

          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
}