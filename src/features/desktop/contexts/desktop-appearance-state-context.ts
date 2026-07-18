import { createContext } from 'react';

import type { DesktopAppearanceState } from '@/features/desktop/domain/models/desktop-appearance-state';

export const DesktopAppearanceStateContext = createContext<DesktopAppearanceState | null>(null);
