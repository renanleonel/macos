import { useEffect } from 'react';

import {
  cancelBootCompletion,
  scheduleBootCompletion,
} from '@/features/desktop/adapters/boot-timer';
import type { BootMode } from '@/features/desktop/domain/enums/boot-mode';

export function useBootCompletion(bootMode: BootMode | null, completeBoot: () => void) {
  useEffect(() => {
    if (!bootMode) return;
    const timer = scheduleBootCompletion(completeBoot);
    return () => cancelBootCompletion(timer);
  }, [bootMode, completeBoot]);
}
