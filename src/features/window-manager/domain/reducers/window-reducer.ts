import { WindowActionType } from '@/features/window-manager/domain/enums/window-action-type';
import { calculateWindowLayout } from '@/features/window-manager/domain/calculate-window-layout';
import { clampWindowPosition } from '@/features/window-manager/domain/clamp-window-position';
import type { WindowAction } from '@/features/window-manager/domain/models/window-action';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';
import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';

export function windowReducer(state: WindowState[], action: WindowAction): WindowState[] {
  const nextZ = Math.max(0, ...state.map((window) => window.z)) + 1;

  switch (action.type) {
    case WindowActionType.OPEN: {
      const existing = state.find((window) => window.app === action.app);
      if (existing) {
        return state.map((window) =>
          window.id === existing.id ? { ...window, minimized: false, z: nextZ } : window,
        );
      }

      const metadata = APPLICATION_REGISTRY[action.app];
      return [
        ...state,
        {
          id: action.id,
          app: action.app,
          title: metadata.title,
          x: metadata.x + (state.length % 4) * 18,
          y: metadata.y + (state.length % 4) * 16,
          width: metadata.width,
          height: metadata.height,
          z: nextZ,
          minimized: false,
          maximized: false,
        },
      ];
    }
    case WindowActionType.CLOSE:
      return state.filter((window) => window.id !== action.id);
    case WindowActionType.FOCUS:
      return state.map((window) => (window.id === action.id ? { ...window, z: nextZ } : window));
    case WindowActionType.MOVE: {
      const position = clampWindowPosition(action.x, action.y, action.viewport);
      return state.map((window) => (window.id === action.id ? { ...window, ...position } : window));
    }
    case WindowActionType.ARRANGE: {
      const target = state.find((window) => window.id === action.id);
      if (!target) return state;
      const bounds = calculateWindowLayout(target, action.layout, action.viewport);
      return state.map((window) =>
        window.id === action.id
          ? { ...window, ...bounds, maximized: false, minimized: false, z: nextZ }
          : window,
      );
    }
    case WindowActionType.MINIMIZE:
      return state.map((window) =>
        window.id === action.id ? { ...window, minimized: true } : window,
      );
    case WindowActionType.TOGGLE_MAXIMIZE: {
      const target = state.find((window) => window.id === action.id);
      if (!target) return state;
      const enteringFullscreen = !target.maximized;
      return state.map((window) => {
        if (window.id === action.id) {
          return { ...window, maximized: enteringFullscreen, z: nextZ };
        }
        return enteringFullscreen && window.maximized ? { ...window, maximized: false } : window;
      });
    }
  }
}
