import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
type EditMenuProps = { close: () => void };
export function EditMenu({ close }: EditMenuProps) {
  return (
    <SystemMenu className='edit-menu [&.edit-menu]:left-65.25'>
      <MenuCommand shortcut='⌘Z' disabled>
        Undo
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘Z' disabled>
        Redo
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌘X' onClick={close}>
        Cut
      </MenuCommand>
      <MenuCommand shortcut='⌘C' onClick={close}>
        Copy
      </MenuCommand>
      <MenuCommand shortcut='⌘V' onClick={close}>
        Paste
      </MenuCommand>
      <MenuCommand shortcut='⌘A' onClick={close}>
        Select All
      </MenuCommand>
      <hr />
      <MenuCommand onClick={close}>
        Start Dictation… <span>🎙</span>
      </MenuCommand>
      <MenuCommand onClick={close}>
        Emoji & Symbols <span>›</span>
      </MenuCommand>
    </SystemMenu>
  );
}
