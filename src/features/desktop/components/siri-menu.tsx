import { useState } from 'react';
import { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';
type SiriMenuProps = { openApp: (app: AppId) => void };
export function SiriMenu({ openApp }: SiriMenuProps) {
  const [query, setQuery] = useState('');
  return (
    <div
      className={cn(
        'siri-panel',
        '[&.siri-panel]:fixed [&.siri-panel]:z-810 [&.siri-panel]:top-9 [&.siri-panel]:right-26 [&.siri-panel]:w-85 [&.siri-panel]:min-h-45 [&.siri-panel]:flex [&.siri-panel]:flex-col [&.siri-panel]:items-center [&.siri-panel]:p-5 [&.siri-panel]:rounded-[18px] [&.siri-panel]:text-[white] [&.siri-panel]:[background:oklch(0.12_0.035_270/0.6)] [&.siri-panel]:[backdrop-filter:blur(48px)_saturate(1.55)] [&.siri-panel]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.22),inset_0_1px_oklch(1_0_0/0.24),0_18px_44px_oklch(0.06_0.04_260/0.34)] [&.siri-panel]:[-webkit-backdrop-filter:blur(48px)_saturate(1.55)]',
        '[&.siri-panel_form]:w-full [&.siri-panel_form]:mt-3.5',
        '[&.siri-panel_input]:w-full [&.siri-panel_input]:h-8.5 [&.siri-panel_input]:p-[0_12px] [&.siri-panel_input]:[border:0] [&.siri-panel_input]:rounded-[9px] [&.siri-panel_input]:[outline:0] [&.siri-panel_input]:text-[white] [&.siri-panel_input]:[background:oklch(1_0_0/0.15)] [&.siri-panel_input]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.14)]',
        '[&.siri-panel_input::placeholder]:text-[oklch(1_0_0/0.65)]',
        '[&.siri-panel_p]:m-[10px_0_0] [&.siri-panel_p]:text-[oklch(0.9_0.02_260)] [&.siri-panel_p]:text-[12px]',
      )}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div
        className={cn(
          'siri-panel__orb',
          '[&.siri-panel\\_\\_orb]:w-14 [&.siri-panel\\_\\_orb]:h-14 [&.siri-panel\\_\\_orb]:p-1 [&.siri-panel\\_\\_orb]:mb-2.5 [&.siri-panel\\_\\_orb]:rounded-[50%] [&.siri-panel\\_\\_orb]:[background:conic-gradient(from_220deg,oklch(0.7_0.21_160),oklch(0.68_0.22_225),oklch(0.63_0.26_305),oklch(0.69_0.23_20),oklch(0.78_0.2_80),oklch(0.7_0.21_160))] [&.siri-panel\\_\\_orb]:animate-[siri-orbit_4s_linear_infinite]',
          '[&.siri-panel\\_\\_orb_span]:block [&.siri-panel\\_\\_orb_span]:w-full [&.siri-panel\\_\\_orb_span]:h-full [&.siri-panel\\_\\_orb_span]:rounded-[inherit] [&.siri-panel\\_\\_orb_span]:[background:oklch(0.16_0.04_270/0.7)] [&.siri-panel\\_\\_orb_span]:[box-shadow:inset_0_0_16px_oklch(0.75_0.24_305/0.6)]',
        )}
      >
        <span />
      </div>
      <strong>{query ? 'Here’s what I found.' : 'What can I help with?'}</strong>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (query.toLowerCase().includes('project')) openApp(AppId.SAFARI);
        }}
      >
        <input
          autoFocus
          aria-label='Ask Siri'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Ask Siri'
        />
      </form>
      {query ? <p>Try “open projects” or use Spotlight with ⌘ Space.</p> : null}
    </div>
  );
}
