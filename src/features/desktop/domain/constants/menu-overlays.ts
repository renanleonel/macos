import { MenuId } from '@/features/desktop/domain/enums/menu-id';
import { OverlayId } from '@/features/desktop/domain/enums/overlay-id';

export const MENU_OVERLAYS: Record<MenuId, OverlayId> = {
  [MenuId.FILE]: OverlayId.FILE,
  [MenuId.EDIT]: OverlayId.EDIT,
  [MenuId.VIEW]: OverlayId.VIEW,
  [MenuId.GO]: OverlayId.GO,
  [MenuId.WINDOW]: OverlayId.WINDOW,
  [MenuId.HELP]: OverlayId.HELP,
};

export const FINDER_MENUS = [
  MenuId.FILE,
  MenuId.VIEW,
  MenuId.GO,
  MenuId.EDIT,
  MenuId.WINDOW,
  MenuId.HELP,
] as const;

export const APPLICATION_MENUS = [
  MenuId.FILE,
  MenuId.EDIT,
  MenuId.VIEW,
  MenuId.WINDOW,
  MenuId.HELP,
] as const;
