import { createContext } from 'react';

import type { WindowState } from '@/features/window-manager/domain/models/window-state';

export const WindowStateContext = createContext<WindowState[] | null>(null);
