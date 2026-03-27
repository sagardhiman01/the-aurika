'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, MeshRefractionMaterial } from '@react-three/drei';

function Diamond(props) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.2;
    mesh.current.rotation.x += delta * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={mesh} {...props}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshRefractionMaterial
          envMapIntensity={2}
          tint="#F5E6D0"
          ior={2.4}
          bounces={3}
          aberrationStrength={0.01}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

function GoldRing(props) {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.5;
    mesh.current.rotation.z += delta * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} {...props}>
        <torusGeometry args={[1.2, 0.2, 32, 100]} />
        <meshPhysicalMaterial
          color="#C4995C"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1}
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDJewelry({ type = 'ring' }) {
  return (
    <div className="canvas-container" style={{ pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={2} angle={0.2} penumbra={1} color="#FFF8F0" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#C4995C" />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {type === 'diamond' ? <Diamond position={[0, 0, 0]} /> : <GoldRing position={[0, 0, 0]} />}
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#C4995C" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
