import { DesktopRevealEdge } from '@/features/window-manager/domain/enums/desktop-reveal-edge';

export const DESKTOP_REVEAL_EDGES = [
  DesktopRevealEdge.LEFT,
  DesktopRevealEdge.RIGHT,
  DesktopRevealEdge.BOTTOM,
  DesktopRevealEdge.TOP,
] as const;
