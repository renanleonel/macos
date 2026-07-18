import { useReducer, type ReactNode } from 'react';

import {
  WindowActionsContext,
  type WindowActions,
} from '@/features/window-manager/contexts/window-actions-context';
import { WindowStateContext } from '@/features/window-manager/contexts/window-state-context';
import {
  createWindowId,
  readViewportSize,
} from '@/features/window-manager/adapters/browser-window';
import { INITIAL_WINDOW } from '@/features/window-manager/domain/constants/initial-window';
import { WindowActionType } from '@/features/window-manager/domain/enums/window-action-type';
import { windowReducer } from '@/features/window-manager/domain/reducers/window-reducer';
import type { AppId } from '@/shared/domain/enums/app-id';

type WindowManagerProviderProps = {
  children: ReactNode;
};

export function WindowManagerProvider({ children }: WindowManagerProviderProps) {
  const [windows, dispatch] = useReducer(windowReducer, [INITIAL_WINDOW]);

  const openWindow = (app: AppId) => {
    dispatch({ type: WindowActionType.OPEN, app, id: createWindowId() });
  };
  const closeWindow = (id: number) => {
    dispatch({ type: WindowActionType.CLOSE, id });
  };
  const focusWindow = (id: number) => {
    dispatch({ type: WindowActionType.FOCUS, id });
  };
  const moveWindow = (id: number, x: number, y: number) => {
    dispatch({ type: WindowActionType.MOVE, id, x, y, viewport: readViewportSize() });
  };
  const minimizeWindow = (id: number) => {
    dispatch({ type: WindowActionType.MINIMIZE, id });
  };
  const toggleMaximizeWindow = (id: number) => {
    dispatch({ type: WindowActionType.TOGGLE_MAXIMIZE, id });
  };

  const actions: WindowActions = {
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    minimizeWindow,
    toggleMaximizeWindow,
  };

  return (
    <WindowActionsContext value={actions}>
      <WindowStateContext value={windows}>{children}</WindowStateContext>
    </WindowActionsContext>
  );
}
