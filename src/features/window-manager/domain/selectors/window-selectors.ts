import type { WindowState } from '@/features/window-manager/domain/models/window-state';

export function selectActiveWindow(windows: WindowState[]) {
  return [...windows]
    .filter((window) => !window.minimized)
    .sort((left, right) => right.z - left.z)[0];
}

export function selectFullscreenWindow(windows: WindowState[]) {
  return windows.find((window) => window.maximized && !window.minimized);
}
