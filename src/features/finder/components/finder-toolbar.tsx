import {
  ChevronLeft,
  ChevronRight,
  Columns3,
  GalleryVerticalEnd,
  Grid2X2,
  List,
  MoreHorizontal,
  Search,
  Share,
} from 'lucide-react';

import { FinderMoreMenu } from '@/features/finder/components/finder-more-menu';
import { FinderShareMenu } from '@/features/finder/components/finder-share-menu';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { FinderToolbarMenu } from '@/features/finder/domain/enums/finder-toolbar-menu';
import { FinderView } from '@/features/finder/domain/enums/finder-view';
import type { FinderPreferences } from '@/features/finder/domain/models/finder-preferences';
import { cn } from '@/shared/utils/cn';

type FinderToolbarProps = {
  section: FinderSection;
  query: string;
  toolbarMenu: FinderToolbarMenu | null;
  shareStatus: string;
  preferences: FinderPreferences;
  onQueryChange: (query: string) => void;
  onToggleShareMenu: () => void;
  onToggleMoreMenu: () => void;
  onCloseMenu: () => void;
  onShareInMessages: () => void;
  onCopyPortfolioLink: () => void;
  onUpdatePreferences: (patch: Partial<FinderPreferences>) => void;
};

export function FinderToolbar({
  section,
  query,
  toolbarMenu,
  shareStatus,
  preferences,
  onQueryChange,
  onToggleShareMenu,
  onToggleMoreMenu,
  onCloseMenu,
  onShareInMessages,
  onCopyPortfolioLink,
  onUpdatePreferences,
}: FinderToolbarProps) {
  return (
    <div
      className={cn(
        'finder-toolbar',
        '[&.finder-toolbar]:relative [&.finder-toolbar]:h-12.5 [&.finder-toolbar]:flex-[0_0_46px] [&.finder-toolbar]:flex [&.finder-toolbar]:items-center [&.finder-toolbar]:gap-3.25 [&.finder-toolbar]:p-[0_12px] [&.finder-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.finder-toolbar]:basis-12.5 [&.finder-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.finder-toolbar]:border-b-[oklch(0.36_0.01_250/0.15)] [&.finder-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.finder-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)]',
        '[&.finder-toolbar_>_button]:[border:0] [&.finder-toolbar_>_button]:[background:transparent] [&.finder-toolbar_>_button]:p-1 [&.finder-toolbar_>_button]:text-[oklch(0.34_0.012_250)]',
        "[&.finder-toolbar_>_button[aria-expanded='true']]:rounded-[7px] [&.finder-toolbar_>_button[aria-expanded='true']]:[background:oklch(1_0_0/0.52)] [&.finder-toolbar_>_button[aria-expanded='true']]:[box-shadow:inset_0_0_0_1px_oklch(0.35_0.01_250/0.1),0_1px_3px_oklch(0.12_0.02_250/0.12)]",
        '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-toolbar]:[-webkit-backdrop-filter:none]',
      )}
    >
      <span className='window-nav [&.window-nav]:flex [&.window-nav]:gap-2.5 [&.window-nav]:text-[oklch(0.52_0.01_250)]'>
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
      </span>
      <div
        className={cn(
          'view-switcher',
          '[&.view-switcher]:flex [&.view-switcher]:gap-px [&.view-switcher]:items-center [&.view-switcher]:p-0.75 [&.view-switcher]:rounded-[10px] [&.view-switcher]:[background:oklch(0.8_0.012_250/0.3)] [&.view-switcher]:[box-shadow:inset_0_0_0_1px_oklch(0.35_0.01_250/0.1),inset_0_1px_oklch(1_0_0/0.42)]',
          '[&.view-switcher_button]:w-6.75 [&.view-switcher_button]:h-6 [&.view-switcher_button]:grid [&.view-switcher_button]:place-items-center [&.view-switcher_button]:p-0 [&.view-switcher_button]:[border:0] [&.view-switcher_button]:rounded-[7px] [&.view-switcher_button]:[background:transparent]',
          '[&.view-switcher_button.selected]:[background:oklch(1_0_0/0.72)] [&.view-switcher_button.selected]:[box-shadow:0_1px_3px_oklch(0.16_0.02_250/0.2),inset_0_0_0_1px_oklch(1_0_0/0.5)]',
        )}
      >
        <button
          type='button'
          className={cn(preferences.view === FinderView.ICONS ? 'selected' : '')}
          aria-label='View as Icons'
          onClick={() => onUpdatePreferences({ view: FinderView.ICONS })}
        >
          <Grid2X2 size={16} />
        </button>
        <button
          type='button'
          className={cn(preferences.view === FinderView.LIST ? 'selected' : '')}
          aria-label='View as List'
          onClick={() => onUpdatePreferences({ view: FinderView.LIST })}
        >
          <List size={16} />
        </button>
        <button
          type='button'
          className={cn(preferences.view === FinderView.COLUMNS ? 'selected' : '')}
          aria-label='View as Columns'
          onClick={() => onUpdatePreferences({ view: FinderView.COLUMNS })}
        >
          <Columns3 size={16} />
        </button>
        <button
          type='button'
          className={cn(preferences.view === FinderView.GALLERY ? 'selected' : '')}
          aria-label='View as Gallery'
          onClick={() => onUpdatePreferences({ view: FinderView.GALLERY })}
        >
          <GalleryVerticalEnd size={16} />
        </button>
      </div>
      <span className='toolbar-spacer [&.toolbar-spacer]:flex-1' />
      <button
        type='button'
        aria-label='Share'
        aria-haspopup='menu'
        aria-expanded={toolbarMenu === FinderToolbarMenu.SHARE}
        onClick={onToggleShareMenu}
      >
        <Share size={16} />
      </button>
      <button
        type='button'
        aria-label='More'
        aria-haspopup='menu'
        aria-expanded={toolbarMenu === FinderToolbarMenu.MORE}
        onClick={onToggleMoreMenu}
      >
        <MoreHorizontal size={17} />
      </button>
      <label
        className={cn(
          'finder-search',
          '[&.finder-search]:w-45 [&.finder-search]:h-7 [&.finder-search]:flex [&.finder-search]:items-center [&.finder-search]:gap-1.5 [&.finder-search]:p-[0_10px] [&.finder-search]:rounded-[999px] [&.finder-search]:text-[oklch(0.53_0.01_250)] [&.finder-search]:[background:oklch(1_0_0/0.56)] [&.finder-search]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)]',
          '[&.finder-search_input]:min-w-0 [&.finder-search_input]:w-full [&.finder-search_input]:[border:0] [&.finder-search_input]:[outline:0] [&.finder-search_input]:[background:transparent] [&.finder-search_input]:text-[12px]',
          'max-[600px]:[&.finder-search]:hidden',
        )}
      >
        <Search size={14} />
        <input
          aria-label='Search files'
          placeholder={`Search ${section}`}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
      {toolbarMenu === FinderToolbarMenu.SHARE ? (
        <FinderShareMenu
          section={section}
          shareStatus={shareStatus}
          onShareInMessages={onShareInMessages}
          onCopyPortfolioLink={onCopyPortfolioLink}
        />
      ) : null}
      {toolbarMenu === FinderToolbarMenu.MORE ? (
        <FinderMoreMenu
          preferences={preferences}
          onCloseMenu={onCloseMenu}
          onUpdatePreferences={onUpdatePreferences}
        />
      ) : null}
    </div>
  );
}
