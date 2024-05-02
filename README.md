# r3f-canvas-record

This package provides a React hook for recording a canvas in [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) using [canvas-record](https://github.com/dmnsgn/canvas-record).

## Installation

```bash
npm install r3f-canvas-record
```

## Usage

```jsx
import { Canvas, useThree } from '@react-three/fiber';
import { useControls, button } from 'leva';
import { useCanvasRecorder, RecorderOptions } from 'r3f-canvas-record';

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

function App() {
  return (
    <Canvas
      gl={{
        // Set preserveDrawingBuffer to true
        preserveDrawingBuffer: true,
      }}
    >
      {/* Set clear color to record properly */}
      <color attach="background" args={['#fff']} />
      {/* Add your scene components to render here */}
      <Recorder frameRate={60} duration={3} />
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
