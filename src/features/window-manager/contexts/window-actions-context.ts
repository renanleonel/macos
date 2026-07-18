import { createContext } from 'react';

import type { AppId } from '@/shared/domain/enums/app-id';

export type WindowActions = {
  openWindow: (app: AppId) => void;
  closeWindow: (id: number) => void;
  focusWindow: (id: number) => void;
  moveWindow: (id: number, x: number, y: number) => void;
  minimizeWindow: (id: number) => void;
  toggleMaximizeWindow: (id: number) => void;
};

export const WindowActionsContext = createContext<WindowActions | null>(null);
