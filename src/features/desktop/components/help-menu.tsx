import { Search } from 'lucide-react';
import { useState } from 'react';
import { MenuCommand } from '@/features/desktop/components/menu-command';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';
type HelpMenuProps = { openApp: (app: AppId) => void; openShortcuts: () => void };

export function HelpMenu({ openApp, openShortcuts }: HelpMenuProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = (label: string) => label.toLocaleLowerCase().includes(normalizedQuery);
  const hasResults = ['macOS Help', 'About This Portfolio', 'Keyboard Shortcuts'].some(matches);

  return (
    <SystemMenu className='help-menu [&.help-menu]:left-97 [&.help-menu]:w-70'>
      <label
        className={cn(
          'help-search',
          '[&.help-search]:h-6.75 [&.help-search]:flex [&.help-search]:items-center [&.help-search]:gap-1.5 [&.help-search]:m-0.5 [&.help-search]:p-[0_8px] [&.help-search]:rounded-md [&.help-search]:[background:oklch(1_0_0/0.56)] [&.help-search]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)]',
          '[&.help-search_input]:min-w-0 [&.help-search_input]:flex-1 [&.help-search_input]:[border:0] [&.help-search_input]:[outline:0] [&.help-search_input]:[background:transparent] [&.help-search_input]:text-[12px]',
        )}
      >
        <Search size={13} />
        <input
          aria-label='Search Help'
          placeholder='Search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <hr />
      {matches('macOS Help') ? (
        <MenuCommand onClick={() => openApp(AppId.NOTES)}>macOS Help</MenuCommand>
      ) : null}
      {matches('About This Portfolio') ? (
        <MenuCommand onClick={() => openApp(AppId.ABOUT)}>About This Portfolio</MenuCommand>
      ) : null}
      {matches('Keyboard Shortcuts') ? (
        <MenuCommand onClick={openShortcuts}>Keyboard Shortcuts</MenuCommand>
      ) : null}
      {!hasResults ? (
        <p className='m-0 p-3 text-center text-[12px] text-(--label-secondary)'>
          No help topics found.
        </p>
      ) : null}
    </SystemMenu>
  );
}
