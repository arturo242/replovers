import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const Heart = () => {
  const heartRef = useRef();
  const texture = useTexture("/logo_blanco_rojo.png");

  // Forma del corazón
  const heartShape = new THREE.Shape();
  heartShape.moveTo(25, 25);
  heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
  heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
  heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
  heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
  heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
  heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

  return (
    <mesh ref={heartRef} position={[0, 0, 0]}>
      <extrudeGeometry args={[heartShape, { depth: 10, bevelEnabled: true, bevelThickness: 2, bevelSize: 1, bevelOffset: 0, bevelSegments: 1 }]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const HeartCanvas = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Heart />
    </Canvas>
  );
};

export default HeartCanvas;