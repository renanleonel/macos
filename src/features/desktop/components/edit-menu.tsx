import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
export function EditMenu() {
  return (
    <SystemMenu className='edit-menu [&.edit-menu]:left-65.25'>
      <MenuCommand shortcut='⌘Z' disabled>
        Undo
      </MenuCommand>
      <MenuCommand shortcut='⇧⌘Z' disabled>
        Redo
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⌘X' disabled>
        Cut
      </MenuCommand>
      <MenuCommand shortcut='⌘C' disabled>
        Copy
      </MenuCommand>
      <MenuCommand shortcut='⌘V' disabled>
        Paste
      </MenuCommand>
      <MenuCommand shortcut='⌘A' disabled>
        Select All
      </MenuCommand>
      <hr />
      <MenuCommand disabled>
        Start Dictation… <span>🎙</span>
      </MenuCommand>
      <MenuCommand disabled>
        Emoji & Symbols <span>›</span>
      </MenuCommand>
    </SystemMenu>
  );
}
