import { useFrame, useThree } from '@react-three/fiber';
import { Encoders } from 'canvas-record';
import { useControls, button } from 'leva';
import { useEffect, useRef } from 'react';
import React from 'react';
import * as THREE from 'three';
import useCanvasRecorder from '../../src';

const extensions = [
  ...new Set(
    Object.values(Encoders).flatMap((Encoder) => Encoder.supportedExtensions),
  ),
];

const encoderOptions = [
  '',
  ...Object.keys(Encoders).filter((e) => e !== 'Encoder'),
];

const targets = [
  ...new Set(
    Object.values(Encoders).flatMap((Encoder) => Encoder.supportedTargets),
  ),
];

const detailsEl = document.getElementById('details')!;

export const App = () => {
  const state = useThree();

  const { startRecording, stopRecording, isRecording, getStats } =
    useCanvasRecorder(state, {
      duration: 3,
    });

  const ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
    }
  });

  useEffect(() => {
    function updateStatus() {
      if (isRecording()) {
        const stats = getStats();
        detailsEl.innerText = stats?.detail ?? '';
      }
      requestAnimationFrame(updateStatus);
    }
    updateStatus();
  }, []);

  useControls({
    extensions: {
      options: extensions,
    },
    encoder: {
      options: encoderOptions,
    },
    target: {
      options: targets,
    },
    duration: {
      value: 10,
      step: 1,
      min: 1,
      max: 30,
    },
    frameRate: {
      value: 30,
      step: 1,
      min: 1,
      max: 60,
    },
    filename: '',
    '⏺ Start': button(() => {
      startRecording();
    }),
    '⏹ Stop': button(() => {
      stopRecording();
    }),
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
};
