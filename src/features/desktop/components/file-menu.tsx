import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { AppId } from '@/shared/domain/enums/app-id';
type FileMenuProps = { openApp: (app: AppId) => void };
export function FileMenu({ openApp }: FileMenuProps) {
  return (
    <SystemMenu className='file-menu [&.file-menu]:left-28.75'>
      <MenuCommand shortcut='⌘N' onClick={() => openApp(AppId.FINDER)}>
        Show Finder
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘N' onClick={() => openApp(AppId.NOTES)}>
        Open Notes
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌘O' disabled>
        Open…
      </MenuCommand>
      <MenuCommand shortcut='⌘I' disabled>
        Get Info
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌘⌫' disabled>
        Move to Trash
      </MenuCommand>
    </SystemMenu>
  );
}
