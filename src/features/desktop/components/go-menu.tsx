import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { AppId } from '@/shared/domain/enums/app-id';
type GoMenuProps = { openApp: (app: AppId) => void; close: () => void };
export function GoMenu({ openApp, close }: GoMenuProps) {
  return (
    <SystemMenu className='go-menu [&.go-menu]:left-54.5'>
      <MenuCommand shortcut='⌘[' onClick={close}>
        Back
      </MenuCommand>
      <MenuCommand shortcut='⌘]' disabled>
        Forward
      </MenuCommand>
      <MenuCommand onClick={close}>
        Enclosing Folder <span>›</span>
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⇧⌘F' onClick={() => openApp(AppId.FINDER)}>
        Recents
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘O' onClick={() => openApp(AppId.ABOUT)}>
        About Me
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘D' onClick={() => openApp(AppId.FINDER)}>
        Desktop
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘P' onClick={() => openApp(AppId.FINDER)}>
        Portfolio
      </MenuCommand>
      <MenuCommand shortcut='⌥⌘L' onClick={() => openApp(AppId.PHOTOS)}>
        Downloads
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⇧⌘G' onClick={close}>
        Go to Folder…
      </MenuCommand>
    </SystemMenu>
  );
}
