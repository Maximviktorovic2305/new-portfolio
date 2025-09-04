"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';

function ParticleSystem({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });
    // Convert to organic, non-geometric shapes by modifying positions
    for (let i = 0; i < positions.length; i += 3) {
      // Apply organic displacement
      const distance = Math.sqrt(
        positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
      );
      
      // Create vortex-like patterns
      const angle = Math.atan2(positions[i + 1], positions[i]);
      const radius = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2);
      
      // Apply spiral transformation
      positions[i] += Math.cos(angle * 3) * 0.1;
      positions[i + 1] += Math.sin(angle * 3) * 0.1;
      positions[i + 2] += Math.sin(radius * 5) * 0.05;
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeScene() {
  const [color, setColor] = useState('#74dde3');
  
  useEffect(() => {
    // Listen for theme changes to update particle color
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const theme = document.documentElement.getAttribute('data-theme');
          setColor(theme === 'dark' ? '#74dde3' : '#74dde3'); // Same color for both themes as requested
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSystem color={color} />
      </Canvas>
    </div>
  );
}