import type { CSSProperties } from 'react';

import { SettingsSectionIcon } from '@/features/settings/components/settings-section-icon';
import { SETTINGS_SECTIONS } from '@/features/settings/domain/constants/settings-sections';
import type { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { cn } from '@/shared/utils/cn';

type SettingsSidebarProps = {
  selectedSection: SettingsSectionId;
  selectSection: (section: SettingsSectionId) => void;
};

export function SettingsSidebar({ selectedSection, selectSection }: SettingsSidebarProps) {
  return (
    <aside aria-label='System Settings sections'>
      <div
        className={cn(
          'settings-user',
          '[&.settings-user]:flex [&.settings-user]:gap-2.5 [&.settings-user]:items-center [&.settings-user]:m-[5px_8px_15px]',
          '[&.settings-user_>_span:last-child]:flex [&.settings-user_>_span:last-child]:flex-col',
          '[&.settings-user_small]:text-[oklch(0.5_0.01_250)]',
        )}
      >
        <span className='avatar [&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold'>
          R
        </span>
        <span>
          <strong>Renan</strong>
          <small>Portfolio profile</small>
        </span>
      </div>
      <nav>
        {SETTINGS_SECTIONS.map((section) => {
          const isSelected = section.id === selectedSection;
          return (
            <button
              type='button'
              className={cn(isSelected ? 'selected' : '')}
              aria-current={isSelected ? 'page' : undefined}
              key={section.id}
              onClick={() => selectSection(section.id)}
            >
              <span
                className='settings-sidebar-icon [&.settings-sidebar-icon]:w-5 [&.settings-sidebar-icon]:h-5 [&.settings-sidebar-icon]:flex-[0_0_20px] [&.settings-sidebar-icon]:grid [&.settings-sidebar-icon]:place-items-center [&.settings-sidebar-icon]:rounded-[5px] [&.settings-sidebar-icon]:text-[white] [&.settings-sidebar-icon]:[background:var(--settings-icon-tint)] [&.settings-sidebar-icon]:[box-shadow:inset_0_1px_oklch(1_0_0/0.28)]'
                style={{ '--settings-icon-tint': section.tint } as CSSProperties}
              >
                <SettingsSectionIcon sectionId={section.id} size={14} strokeWidth={2} />
              </span>
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
