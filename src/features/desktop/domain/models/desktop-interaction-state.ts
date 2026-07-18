import type { DesktopFileId } from '@/features/desktop/domain/enums/desktop-file-id';
import type { Overlay } from '@/features/desktop/domain/models/overlay';

export type DesktopInteractionState = {
  overlay: Overlay;
  showDesktop: boolean;
  selectedDesktopFile: DesktopFileId | null;
};
