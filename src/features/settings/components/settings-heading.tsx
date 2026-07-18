import type { CSSProperties } from 'react';

import { SettingsSectionIcon } from '@/features/settings/components/settings-section-icon';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import type { SettingsSection } from '@/features/settings/domain/models/settings-section';

type SettingsHeadingProps = {
  selected: SettingsSection;
  description?: string;
};

export function SettingsHeading({ selected, description }: SettingsHeadingProps) {
  return (
    <header className='settings-heading [&.settings-heading]:flex [&.settings-heading]:items-center [&.settings-heading]:gap-3 [&.settings-heading]:mb-4.5 [&.settings-heading_p]:max-w-[52ch] [&.settings-heading_p]:m-[2px_0_0] [&.settings-heading_p]:text-(--label-secondary) [&.settings-heading_p]:text-[12px] [&.settings-heading_p]:leading-[1.35]'>
      <span
        className='settings-heading-icon [&.settings-heading-icon]:w-11 [&.settings-heading-icon]:h-11 [&.settings-heading-icon]:flex-[0_0_44px] [&.settings-heading-icon]:grid [&.settings-heading-icon]:place-items-center [&.settings-heading-icon]:rounded-[11px] [&.settings-heading-icon]:text-[white] [&.settings-heading-icon]:[background:var(--settings-icon-tint)] [&.settings-heading-icon]:[box-shadow:inset_0_1px_oklch(1_0_0/0.32),0_3px_7px_oklch(0.15_0.02_250/0.15)]'
        style={{ '--settings-icon-tint': selected.tint } as CSSProperties}
      >
        <SettingsSectionIcon sectionId={selected.id} size={24} strokeWidth={1.8} />
      </span>
      <div>
        <h1>{selected.label}</h1>
        <p>
          {selected.id === SettingsSectionId.APPEARANCE
            ? 'Choose how windows and controls look across the portfolio.'
            : description}
        </p>
      </div>
    </header>
  );
}
