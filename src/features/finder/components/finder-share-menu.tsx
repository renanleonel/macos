import { ExternalLink, Mail, MessageCircle } from 'lucide-react';

import type { FinderSection } from '@/features/finder/domain/enums/finder-section';
import { FINDER_TOOLBAR_POPOVER_CLASSES } from '@/features/finder/utils/finder-toolbar-popover-classes';
import { cn } from '@/shared/utils/cn';

type FinderShareMenuProps = {
  section: FinderSection;
  shareStatus: string;
  onShareInMessages: () => void;
  onCopyPortfolioLink: () => void;
};

export function FinderShareMenu({
  section,
  shareStatus,
  onShareInMessages,
  onCopyPortfolioLink,
}: FinderShareMenuProps) {
  return (
    <div
      className={cn(
        'finder-toolbar-popover',
        'finder-share-popover',
        ...FINDER_TOOLBAR_POPOVER_CLASSES,
        '[&.finder-share-popover]:right-52.5',
      )}
      role='menu'
      aria-label='Share Portfolio'
      onPointerDown={(event) => event.stopPropagation()}
    >
      <strong>Share “{section}”</strong>
      <button type='button' role='menuitem' onClick={onShareInMessages}>
        <MessageCircle size={15} />
        <span>Messages</span>
      </button>
      <button type='button' role='menuitem' onClick={onShareInMessages}>
        <Mail size={15} />
        <span>Mail</span>
      </button>
      <button type='button' role='menuitem' onClick={onCopyPortfolioLink}>
        <ExternalLink size={15} />
        <span>Copy Link</span>
      </button>
      <small aria-live='polite'>{shareStatus}</small>
    </div>
  );
}
