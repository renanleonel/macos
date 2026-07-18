import type { WindowActionType } from '@/features/window-manager/domain/enums/window-action-type';
import type { WindowLayout } from '@/features/window-manager/domain/enums/window-layout';
import type { ViewportSize } from '@/features/window-manager/domain/models/viewport-size';
import type { AppId } from '@/shared/domain/enums/app-id';

export type WindowAction =
  | { type: WindowActionType.OPEN; app: AppId; id: number }
  | { type: WindowActionType.CLOSE; id: number }
  | { type: WindowActionType.FOCUS; id: number }
  | { type: WindowActionType.MOVE; id: number; x: number; y: number; viewport: ViewportSize }
  | { type: WindowActionType.ARRANGE; id: number; layout: WindowLayout; viewport: ViewportSize }
  | { type: WindowActionType.MINIMIZE; id: number }
  | { type: WindowActionType.TOGGLE_MAXIMIZE; id: number };
