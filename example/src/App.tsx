import { useFrame, Canvas } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useControls, button } from 'leva';
import { useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import { RecorderOptions, useCanvasRecorder } from '../../src';

function Recorder(options: RecorderOptions) {
  const state = useThree();

  const { startRecording, stopRecording } = useCanvasRecorder(state, options);

  useControls({
    '⏺ start': button(() => {
      startRecording();
    }),
    '⏹ stop': button(() => {
      stopRecording();
    }),
  });

  return null;
}

function Scene() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  return (
    <>
      <ambientLight />
      <directionalLight />
      <mesh ref={ref}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}

export const App = () => {
  return (
    <Canvas
      gl={{
        preserveDrawingBuffer: true,
      }}
    >
      <color attach="background" args={['#f0f0f0']} />
      <Scene />
      <Recorder frameRate={60} duration={3} />
    </Canvas>
  );
};
