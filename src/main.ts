import { useThree } from '@react-three/fiber';
import { Recorder, RecorderStatus, RecorderOptions } from 'canvas-record';

let canvasRecorder: Recorder | null = null;
let t = 0;
let raf: number | null = null;

export default function useCanvasRecorder(options?: RecorderOptions) {
  const { gl, setFrameloop, advance, frameloop: initFrameloop } = useThree();

  const startRecording = async () => {
    await reset();
    canvasRecorder = new Recorder(gl.getContext(), {
      ...Recorder.defaultOptions,
      ...options,
      encoderOptions: options?.encoderOptions || {},
    });
    await canvasRecorder.start();
    setFrameloop('never');
    tick();
  };

  const stopRecording = async () => {
    await reset();
  };

  const isRecording = () => canvasRecorder?.status === RecorderStatus.Recording;

  const getStats = () => canvasRecorder?.stats;

  const reset = async () => {
    console.log('reset', raf, canvasRecorder);
    if (raf !== null) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    if (canvasRecorder !== null) {
      console.log('reset');
      await canvasRecorder.stop();
      await canvasRecorder.dispose();
      canvasRecorder = null;
      setFrameloop(initFrameloop);
    }
    t = 0;
  };

  const tick = async () => {
    if (!canvasRecorder) return;

    if (canvasRecorder.frame >= canvasRecorder.frameTotal) reset();

    if (canvasRecorder.status !== RecorderStatus.Recording) return;

    advance(t);
    await canvasRecorder.step();
    t += 1 / (options?.frameRate || Recorder.defaultOptions.frameRate!);

    if (canvasRecorder.status === RecorderStatus.Recording) {
      raf = requestAnimationFrame(tick);
    }
  };

  return { startRecording, stopRecording, isRecording, getStats };
}
