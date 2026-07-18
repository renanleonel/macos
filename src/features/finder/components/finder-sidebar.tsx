import {
  BriefcaseBusiness,
  CloudSun,
  Folder,
  GalleryVerticalEnd,
  Trash2,
  UserRound,
} from 'lucide-react';

import { FINDER_FAVORITES } from '@/features/finder/domain/constants/finder-favorites';
import { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { cn } from '@/shared/utils/cn';

type FinderSidebarProps = {
  section: FinderSection;
  onSelectSection: (section: FinderSection) => void;
};

export function FinderSidebar({ section, onSelectSection }: FinderSidebarProps) {
  return (
    <aside
      className={cn(
        'finder-sidebar',
        '[&.finder-sidebar]:w-56.25 [&.finder-sidebar]:flex-[0_0_225px] [&.finder-sidebar]:p-[12px_6px] [&.finder-sidebar]:overflow-y-auto [&.finder-sidebar]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.finder-sidebar]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.finder-sidebar]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)] [&.finder-sidebar]:[border-right:1px_solid_oklch(0.36_0.01_250/0.15)]',
        '[&.finder-sidebar_button]:w-full [&.finder-sidebar_button]:h-7.25 [&.finder-sidebar_button]:flex [&.finder-sidebar_button]:items-center [&.finder-sidebar_button]:gap-2 [&.finder-sidebar_button]:p-[0_10px] [&.finder-sidebar_button]:[border:0] [&.finder-sidebar_button]:rounded-[7px] [&.finder-sidebar_button]:[background:transparent] [&.finder-sidebar_button]:text-left [&.finder-sidebar_button]:text-[13px]',
        '[&.finder-sidebar_button.selected]:text-(--ink) [&.finder-sidebar_button.selected]:[background:oklch(0.71_0.13_245/0.55)] [&.finder-sidebar_button.selected]:[box-shadow:inset_0_1px_oklch(1_0_0/0.38),inset_0_0_0_1px_oklch(0.4_0.08_245/0.08)]',
        '[@media(prefers-reduced-transparency:_reduce)]:[&.finder-sidebar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.finder-sidebar]:[-webkit-backdrop-filter:none]',
        'max-[900px]:[&.finder-sidebar]:w-41.25 max-[900px]:[&.finder-sidebar]:basis-41.25',
        'max-[600px]:[&.finder-sidebar]:hidden',
      )}
    >
      <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
        Favorites
      </span>
      {FINDER_FAVORITES.map((item) => (
        <button
          type='button'
          key={item}
          className={cn(section === item ? 'selected' : '')}
          aria-current={section === item ? 'page' : undefined}
          onClick={() => onSelectSection(item)}
        >
          {item === FinderSection.PORTFOLIO ? (
            <Folder size={16} />
          ) : item === FinderSection.ABOUT_ME ? (
            <UserRound size={16} />
          ) : (
            <GalleryVerticalEnd size={16} />
          )}
          {item}
        </button>
      ))}
      <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
        Locations
      </span>
      <button type='button'>
        <BriefcaseBusiness size={16} />
        Renan's Mac
      </button>
      <button type='button'>
        <CloudSun size={16} />
        iCloud
      </button>
      <button
        type='button'
        className={cn(section === FinderSection.TRASH ? 'selected' : '')}
        aria-current={section === FinderSection.TRASH ? 'page' : undefined}
        onClick={() => onSelectSection(FinderSection.TRASH)}
      >
        <Trash2 size={16} />
        Trash
      </button>
      <span className='sidebar-heading [&.sidebar-heading]:block [&.sidebar-heading]:m-[8px_10px_4px] [&.sidebar-heading]:text-[oklch(0.43_0.012_250)] [&.sidebar-heading]:text-[11px] [&.sidebar-heading]:font-[620]'>
        Tags
      </span>
      <button type='button'>
        <i className='tag tag--red [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--red]:[background:oklch(0.66_0.23_25)]' />
        Important
      </button>
      <button type='button'>
        <i className='tag tag--orange [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--orange]:[background:oklch(0.76_0.18_65)]' />
        In progress
      </button>
      <button type='button'>
        <i className='tag tag--green [&.tag]:w-2.75 [&.tag]:h-2.75 [&.tag]:rounded-[50%] [&.tag--green]:[background:oklch(0.69_0.2_145)]' />
        Shipped
      </button>
    </aside>
  );
}
