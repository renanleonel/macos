import { createContext } from 'react';

import type { DesktopInteractionState } from '@/features/desktop/domain/models/desktop-interaction-state';

export const DesktopInteractionStateContext = createContext<DesktopInteractionState | null>(null);
