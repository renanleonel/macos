import { useState } from 'react';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { AppId } from '@/shared/domain/enums/app-id';
import { PROFILE } from '@/shared/domain/constants/profile';

type AppleMenuProps = {
  openApp: (app: AppId) => void;
  openSettings: () => void;
  lock: () => void;
  sleep: () => void;
  forceQuit: () => void;
  restart: () => void;
  shutDown: () => void;
};

export function AppleMenu({
  openApp,
  openSettings,
  lock,
  sleep,
  forceQuit,
  restart,
  shutDown,
}: AppleMenuProps) {
  const [recentOpen, setRecentOpen] = useState(false);
  return (
    <SystemMenu className='apple-menu [&.apple-menu]:left-2'>
      <button type='button' onClick={() => openApp(AppId.ABOUT)}>
        About This Mac
      </button>
      <hr />
      <button type='button' onClick={openSettings}>
        {'System Settings…'}
      </button>
      <button type='button' onClick={() => openApp(AppId.SAFARI)}>
        {'App Store…'}
      </button>
      <hr />
      <button
        type='button'
        aria-expanded={recentOpen}
        onClick={() => setRecentOpen((current) => !current)}
      >
        Recent Items <span>{'›'}</span>
      </button>
      {recentOpen ? (
        <div
          className='apple-recent-items [&.apple-recent-items]:m-[2px_0_3px_12px] [&.apple-recent-items]:pl-1.5 [&.apple-recent-items]:[border-left:1px_solid_var(--separator)] [&.apple-recent-items_button]:min-h-6 [&.apple-recent-items_button]:text-(--label-secondary) [&.apple-recent-items_button]:text-[12px]'
          role='menu'
          aria-label='Recent Items'
        >
          <button type='button' role='menuitem' onClick={() => openApp(AppId.SAFARI)}>
            open source
          </button>
          <button type='button' role='menuitem' onClick={() => openApp(AppId.NOTES)}>
            read me.txt
          </button>
          <button type='button' role='menuitem' onClick={() => openApp(AppId.ABOUT)}>
            about me.md
          </button>
        </div>
      ) : null}
      <hr />
      <button type='button' onClick={forceQuit}>
        {'Force Quit…'}
      </button>
      <hr />
      <button type='button' onClick={sleep}>
        Sleep
      </button>
      <button type='button' onClick={lock}>
        Lock Screen
      </button>
      <button type='button' onClick={lock}>
        {`Log Out ${PROFILE.firstName}…`}
      </button>
      <hr />
      <button type='button' onClick={restart}>
        {'Restart…'}
      </button>
      <button type='button' onClick={shutDown}>
        {'Shut Down…'}
      </button>
    </SystemMenu>
  );
}
