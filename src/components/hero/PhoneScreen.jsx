import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LocationPulse() {
  const haloRef = useRef(null);

  useFrame(({ clock }) => {
    const halo = haloRef.current;

    if (!halo) return;

    const time = clock.getElapsedTime();
    const pulse = (Math.sin(time * 2.2) + 1) / 2;

    const scale = 1 + pulse * 0.32;

    halo.scale.set(scale, scale, 1);

    if (halo.material) {
      halo.material.opacity = 0.18 - pulse * 0.08;
    }
  });

  return (
    <mesh ref={haloRef} position={[0.08, 0.08, 0.012]}>
      <circleGeometry args={[0.22, 64]} />

      <meshBasicMaterial
        color="#245cff"
        transparent={true}
        opacity={0.16}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function PhoneScreen() {
  const mapTexture = useMemo(() => {
    const canvas = document.createElement("canvas");

    canvas.width = 900;
    canvas.height = 1800;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    ctx.fillStyle = "#f2efe8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e6e3dc";

    const blocks = [
      [60, 80, 260, 260],
      [390, 70, 430, 190],
      [80, 420, 310, 330],
      [470, 330, 330, 350],
      [60, 850, 260, 360],
      [390, 790, 430, 260],
      [90, 1320, 330, 360],
      [510, 1170, 300, 480],
    ];

    blocks.forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 28);
      ctx.fill();
    });

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const streets = [
      [
        [0, 350],
        [230, 330],
        [480, 390],
        [900, 370],
      ],
      [
        [350, 0],
        [360, 340],
        [330, 710],
        [370, 1100],
        [350, 1800],
      ],
      [
        [0, 780],
        [270, 760],
        [530, 720],
        [900, 760],
      ],
      [
        [0, 1260],
        [250, 1210],
        [520, 1270],
        [900, 1240],
      ],
      [
        [470, 0],
        [490, 270],
        [470, 600],
        [520, 930],
        [500, 1800],
      ],
    ];

    streets.forEach((street) => {
      ctx.beginPath();

      street.forEach(([x, y], index) => {
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
    });

    ctx.strokeStyle = "#d7d4cd";
    ctx.lineWidth = 52;

    ctx.beginPath();
    ctx.moveTo(-40, 1060);
    ctx.bezierCurveTo(250, 950, 570, 1030, 940, 910);
    ctx.stroke();

    ctx.fillStyle = "#d0d6cf";

    const details = [
      [150, 160],
      [690, 240],
      [180, 610],
      [690, 610],
      [180, 1080],
      [700, 1450],
    ];

    details.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
  }, []);

  return (
    <group>
      <mesh>
        <planeGeometry args={[1.22, 2.48]} />

        <meshBasicMaterial
          map={mapTexture}
          toneMapped={false}
        />
      </mesh>

      <LocationPulse />

      <mesh position={[0.08, 0.08, 0.018]}>
        <circleGeometry args={[0.095, 64]} />

        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0.08, 0.08, 0.024]}>
        <circleGeometry args={[0.065, 64]} />

        <meshBasicMaterial
          color="#245cff"
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}