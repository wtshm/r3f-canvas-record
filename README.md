# r3f-canvas-record

This package provides a React hook for recording a canvas in [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) using [canvas-record](https://github.com/dmnsgn/canvas-record).

## Installation

```bash
npm install r3f-canvas-record
```

## Usage

```jsx
import { Html } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useCanvasRecorder } from 'r3f-canvas-record';

function Scene() {
  const state = useThree();

  const { startRecording, stopRecording } = useCanvasRecorder(state, {
    // Options are here
  });

  return (
    <>
      {/* Some content */}
      <Html>
        <button onClick={startRecording}>Start recording</button>
        <button onClick={stopRecording}>Stop recording</button>
      </Html>
    </>
  );
}

function App() {
  return (
    <Canvas
      gl={{
        preserveDrawingBuffer: true, // Mandatory
      }}
    >
      <Scene />
    </Canvas>
  );
}
```

The `useCanvasRecorder` hook returns an object with the following properties:

- `startRecording`: Function to start recording
- `stopRecording`: Function to stop recording
- `isRecording`: Boolean indicating if recording is in progress
- `getStats`: Function to get recording statistics

You can pass options to change the frame rate, encoder, and more. See [the canvas-record documentation](https://github.com/dmnsgn/canvas-record?tab=readme-ov-file#RecorderOptions) for more info.

## License

MIT
