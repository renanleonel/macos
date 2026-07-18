import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import type { WindowState } from '@/features/window-manager/domain/models/window-state';

type WindowMenuProps = {
  window?: WindowState;
  minimize: () => void;
  maximize: () => void;
  bringToFront: () => void;
};

export function WindowMenu({ window, minimize, maximize, bringToFront }: WindowMenuProps) {
  return (
    <SystemMenu className='window-menu [&.window-menu]:left-77.5 [&.window-menu]:w-66.25'>
      <MenuCommand shortcut='⌘M' disabled={!window} onClick={minimize}>
        Minimize
      </MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>
        Zoom
      </MenuCommand>
      <MenuCommand disabled={!window} onClick={maximize}>
        Fill
      </MenuCommand>
      <MenuCommand disabled>Center</MenuCommand>
      <MenuCommand>
        Move & Resize <span>›</span>
      </MenuCommand>
      <hr />
      <MenuCommand disabled={!window} onClick={bringToFront}>
        Bring All to Front
      </MenuCommand>
      <hr />
      <MenuCommand checked={Boolean(window)} onClick={bringToFront}>
        {window?.title ?? 'No Open Windows'}
      </MenuCommand>
    </SystemMenu>
  );
}
