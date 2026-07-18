import type { ViewportSize } from '@/features/window-manager/domain/models/viewport-size';

export function clampWindowPosition(x: number, y: number, viewport: ViewportSize) {
  return {
    x: Math.max(8, Math.min(x, viewport.width - 180)),
    y: Math.max(28, Math.min(y, viewport.height - 100)),
  };
}
