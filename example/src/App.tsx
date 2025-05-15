import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { button, useControls } from 'leva';
import React, { useRef } from 'react';
import type * as THREE from 'three';
import { type RecorderOptions, useCanvasRecorder } from '../../src';

const statsEl = document.getElementById('stats');

function Recorder(options: RecorderOptions) {
  const state = useThree();

  const { startRecording, stopRecording, isRecording, getStats } =
    useCanvasRecorder(state, options);

  useControls({
    '⏺ start': button(() => {
      startRecording();
    }),
    '⏹ stop': button(() => {
      stopRecording();
    }),
  });

  useFrame(() => {
    if (statsEl && isRecording()) {
      statsEl.innerText = `${getStats()?.detail}`;
    }
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
