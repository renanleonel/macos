import {
  Compass,
  Grid2X2,
  Mail,
  MessageCircle,
  Settings,
  SquareTerminal,
  Trash2,
  UserRound,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType, CSSProperties } from 'react';

import { FilesAppGlyph } from '@/shared/components/files-app-glyph';
import { NotesAppGlyph } from '@/shared/components/notes-app-glyph';
import { PhotosAppGlyph } from '@/shared/components/photos-app-glyph';
import { AppId } from '@/shared/domain/enums/app-id';
import { DockUtilityId } from '@/shared/domain/enums/dock-utility-id';
import type { DockId } from '@/shared/domain/models/dock-id';
import { cn } from '@/shared/utils/cn';

type AppIconProps = {
  app: DockId;
  size?: number;
};

const APP_ICON_COMPONENTS: Record<DockId, ComponentType<LucideProps>> = {
  [AppId.FINDER]: FilesAppGlyph,
  [DockUtilityId.LAUNCHPAD]: Grid2X2,
  [AppId.SAFARI]: Compass,
  [AppId.MESSAGES]: MessageCircle,
  [DockUtilityId.MAIL]: Mail,
  [AppId.PHOTOS]: PhotosAppGlyph,
  [AppId.NOTES]: NotesAppGlyph,
  [AppId.TERMINAL]: SquareTerminal,
  [AppId.SETTINGS]: Settings,
  [DockUtilityId.TRASH]: Trash2,
  [AppId.ABOUT]: UserRound,
};

export function AppIcon({ app, size = 48 }: AppIconProps) {
  const Icon = APP_ICON_COMPONENTS[app];

  return (
    <span
      className={cn(
        `app-icon app-icon--${app}`,
        '[&.app-icon]:[--icon-size:48px] [&.app-icon]:w-(--icon-size) [&.app-icon]:h-(--icon-size) [&.app-icon]:grid [&.app-icon]:place-items-center [&.app-icon]:rounded-[calc(var(--icon-size)*0.235)] [&.app-icon]:text-[white] [&.app-icon]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.36),inset_0_-1px_oklch(0.12_0.03_250/0.12),0_3px_7px_oklch(0.08_0.03_245/0.28)] [&.app-icon]:overflow-hidden [&.app-icon]:relative [&.app-icon]:isolate',
        "[&.app-icon::before]:[content:''] [&.app-icon::before]:absolute [&.app-icon::before]:z-1 [&.app-icon::before]:inset-[1px_2px_46%] [&.app-icon::before]:rounded-[inherit] [&.app-icon::before]:[background:linear-gradient(180deg,oklch(1_0_0/0.48),transparent)] [&.app-icon::before]:mix-blend-soft-light [&.app-icon::before]:pointer-events-none",
        "[&.app-icon::after]:[content:''] [&.app-icon::after]:absolute [&.app-icon::after]:z-1 [&.app-icon::after]:inset-[54%_4px_3px] [&.app-icon::after]:rounded-[0_0_calc(var(--icon-size)*0.18)_calc(var(--icon-size)*0.18)] [&.app-icon::after]:[background:linear-gradient(180deg,transparent,oklch(0.08_0.03_250/0.12))] [&.app-icon::after]:pointer-events-none",
        '[&.app-icon_svg]:relative [&.app-icon_svg]:z-2 [&.app-icon_svg]:filter-[drop-shadow(0_1px_1px_oklch(0.08_0.02_250/0.12))]',
        '[&.app-icon.app-icon--finder]:[background:linear-gradient(145deg,#2c9bd8,#4663c5)]',
        '[&.app-icon.app-icon--launchpad]:[background:linear-gradient(145deg,#86909c,#4d5868)]',
        '[&.app-icon.app-icon--safari]:[background:linear-gradient(145deg,#37b7ad,#2365a8)]',
        '[&.app-icon.app-icon--messages]:[background:linear-gradient(145deg,#56b876,#2f8557)]',
        '[&.app-icon.app-icon--mail]:[background:linear-gradient(145deg,#568be7,#5d51be)]',
        '[&.app-icon.app-icon--photos]:text-[#b8456e] [&.app-icon.app-icon--photos]:[background:linear-gradient(145deg,#ffd176,#ef759c)]',
        '[&.app-icon.app-icon--notes]:text-[#654a16] [&.app-icon.app-icon--notes]:[background:linear-gradient(145deg,#ffdb69,#d8aa36)]',
        '[&.app-icon.app-icon--terminal]:text-[#8be3ad] [&.app-icon.app-icon--terminal]:[background:linear-gradient(145deg,#303a43,#12181e)]',
        '[&.app-icon.app-icon--settings]:[background:radial-gradient(circle_at_35%_28%,#9ba7b4,#515b68)]',
        '[&.app-icon.app-icon--trash]:text-[#52606d] [&.app-icon.app-icon--trash]:[background:linear-gradient(145deg,oklch(0.96_0.025_220/0.95),oklch(0.75_0.055_225/0.86))]',
        '[&.app-icon.app-icon--about]:[background:linear-gradient(145deg,#e59d4f,#a95863)]',
      )}
      style={{ '--icon-size': `${size}px` } as CSSProperties}
    >
      <Icon
        size={Math.round(size * 0.52)}
        strokeWidth={1.7}
        fill={app === AppId.MESSAGES ? 'currentColor' : undefined}
      />
    </span>
  );
}
