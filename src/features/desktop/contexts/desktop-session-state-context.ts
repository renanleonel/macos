import { createContext } from 'react';

import type { DesktopSessionState } from '@/features/desktop/domain/models/desktop-session-state';

export const DesktopSessionStateContext = createContext<DesktopSessionState | null>(null);
