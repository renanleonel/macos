import { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

export function desktopRevealTransform(window: WindowState, edge: DesktopRevealEdge): string {
  switch (edge) {
    case DesktopRevealEdge.LEFT:
      return `translate3d(calc(-100% - ${window.x}px + 52px), 0, 0)`;
    case DesktopRevealEdge.RIGHT:
      return `translate3d(calc(100vw - ${window.x + 52}px), 0, 0)`;
    case DesktopRevealEdge.BOTTOM:
      return `translate3d(0, calc(100vh - ${window.y + 52}px), 0)`;
    case DesktopRevealEdge.TOP:
      return `translate3d(0, calc(-100% - ${window.y}px + 44px), 0)`;
  }
}
