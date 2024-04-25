import { Canvas } from '@react-three/fiber';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Canvas gl={{ preserveDrawingBuffer: true }}>
    <color attach="background" args={['#fff']} />
    <App />
  </Canvas>,
);
