import type { ViewportSize } from '@/features/window-manager/domain/models/viewport-size';

export function createWindowId() {
  return Date.now();
}

export function readViewportSize(): ViewportSize {
  return { width: globalThis.innerWidth, height: globalThis.innerHeight };
}

export function requestWindowFrame(callback: FrameRequestCallback) {
  return globalThis.requestAnimationFrame(callback);
}

export function cancelWindowFrame(frame: number) {
  globalThis.cancelAnimationFrame(frame);
}
