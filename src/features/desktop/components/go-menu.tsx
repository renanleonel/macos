import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';

type GoMenuProps = { openFinderSection: (section: FinderSection) => void };

export function GoMenu({ openFinderSection }: GoMenuProps) {
  return (
    <SystemMenu className='go-menu [&.go-menu]:left-54.5'>
      <MenuCommand shortcut='⌘[' disabled>
        Back
      </MenuCommand>
      <MenuCommand shortcut='⌘]' disabled>
        Forward
      </MenuCommand>
      <MenuCommand disabled>
        Enclosing Folder <span>›</span>
      </MenuCommand>
      <hr />
      <MenuCommand
        shortcut='⇧⌘F'
        onClick={() => openFinderSection(FinderSection.RECENTS)}
      >
        Recents
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘O'
        onClick={() => openFinderSection(FinderSection.ABOUT_ME)}
      >
        About Me
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘A'
        onClick={() => openFinderSection(FinderSection.APPLICATIONS)}
      >
        Applications
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘D'
        onClick={() => openFinderSection(FinderSection.DESKTOP)}
      >
        Desktop
      </MenuCommand>
      <MenuCommand
        shortcut='⇧⌘P'
        onClick={() => openFinderSection(FinderSection.PORTFOLIO)}
      >
        Portfolio
      </MenuCommand>
      <MenuCommand
        shortcut='⌥⌘L'
        onClick={() => openFinderSection(FinderSection.DOWNLOADS)}
      >
        Downloads
      </MenuCommand>
      <MenuCommand onClick={() => openFinderSection(FinderSection.ICLOUD_DRIVE)}>
        iCloud Drive
      </MenuCommand>
      <hr />
      <MenuCommand shortcut='⇧⌘G' disabled>
        Go to Folder…
      </MenuCommand>
    </SystemMenu>
  );
}
