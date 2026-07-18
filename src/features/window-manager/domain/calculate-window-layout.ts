import { WindowLayout } from '@/features/window-manager/domain/enums/window-layout';
import type { ViewportSize } from '@/features/window-manager/domain/models/viewport-size';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

const WINDOW_MARGIN = 8;
const WINDOW_TOP = 36;
const WINDOW_BOTTOM = 88;
const WINDOW_GAP = 8;
const MIN_WINDOW_WIDTH = 430;
const MIN_WINDOW_HEIGHT = 300;

export function calculateWindowLayout(
  window: WindowState,
  layout: WindowLayout,
  viewport: ViewportSize,
) {
  const availableWidth = Math.max(MIN_WINDOW_WIDTH, viewport.width - WINDOW_MARGIN * 2);
  const availableHeight = Math.max(
    MIN_WINDOW_HEIGHT,
    viewport.height - WINDOW_TOP - WINDOW_BOTTOM,
  );

  if (layout === WindowLayout.CENTER) {
    const width = Math.min(window.width, availableWidth);
    const height = Math.min(window.height, availableHeight);
    return {
      x: Math.round((viewport.width - width) / 2),
      y: Math.max(WINDOW_TOP, Math.round((viewport.height - height) / 2)),
      width,
      height,
    };
  }

  const width = Math.max(MIN_WINDOW_WIDTH, Math.floor((availableWidth - WINDOW_GAP) / 2));
  return {
    x:
      layout === WindowLayout.LEFT_HALF
        ? WINDOW_MARGIN
        : viewport.width - WINDOW_MARGIN - width,
    y: WINDOW_TOP,
    width,
    height: availableHeight,
  };
}
