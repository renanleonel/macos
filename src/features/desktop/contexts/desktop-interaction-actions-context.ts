import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { DesktopFileId } from '@/features/desktop/domain/enums/desktop-file-id';
import type { Overlay } from '@/features/desktop/domain/models/overlay';

export type DesktopInteractionActions = {
  setOverlay: Dispatch<SetStateAction<Overlay>>;
  setShowDesktop: Dispatch<SetStateAction<boolean>>;
  setSelectedDesktopFile: Dispatch<SetStateAction<DesktopFileId | null>>;
};

export const DesktopInteractionActionsContext = createContext<DesktopInteractionActions | null>(
  null,
);
