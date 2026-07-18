import { APPLICATION_REGISTRY } from '@/shared/domain/constants/application-registry';
import { AppId } from '@/shared/domain/enums/app-id';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

const FINDER_METADATA = APPLICATION_REGISTRY[AppId.FINDER];

export const INITIAL_WINDOW: WindowState = {
  id: 1,
  app: AppId.FINDER,
  title: FINDER_METADATA.title,
  x: FINDER_METADATA.x,
  y: FINDER_METADATA.y,
  width: FINDER_METADATA.width,
  height: FINDER_METADATA.height,
  z: 1,
  minimized: false,
  maximized: false,
};
