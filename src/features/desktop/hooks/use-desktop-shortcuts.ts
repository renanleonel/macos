import { useEffect, type Dispatch, type SetStateAction } from 'react';

import { subscribeDesktopKeydown } from '@/features/desktop/adapters/desktop-keyboard';
import { OverlayId } from '@/features/desktop/domain/enums/overlay-id';
import type { Overlay } from '@/features/desktop/domain/models/overlay';

export function useDesktopShortcuts(
  setOverlay: Dispatch<SetStateAction<Overlay>>,
  setShowDesktop: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(
    () =>
      subscribeDesktopKeydown((event) => {
        if ((event.metaKey || event.ctrlKey) && event.code === 'Space') {
          event.preventDefault();
          setOverlay((current) => (current === OverlayId.SPOTLIGHT ? null : OverlayId.SPOTLIGHT));
        }
        if (event.key === 'Escape') {
          setOverlay(null);
          setShowDesktop(false);
        }
      }),
    [setOverlay, setShowDesktop],
  );
}
