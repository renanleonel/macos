import { Search } from 'lucide-react';
import { useState } from 'react';
import { LAUNCHPAD_APPLICATIONS } from '@/features/desktop/domain/constants/launchpad-applications';
import { AppIcon } from '@/shared/components/app-icon';
import type { AppId } from '@/shared/domain/enums/app-id';
import { cn } from '@/shared/utils/cn';
type SpotlightProps = { openApp: (app: AppId) => void; close: () => void };
export function Spotlight({ openApp, close }: SpotlightProps) {
  const [query, setQuery] = useState('');
  const results = LAUNCHPAD_APPLICATIONS.filter((app) =>
    app.label.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className='spotlight [&.spotlight]:fixed [&.spotlight]:z-800 [&.spotlight]:rounded-[14px] [&.spotlight]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.spotlight]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.spotlight]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.spotlight]:top-[18%] [&.spotlight]:left-[50%] [&.spotlight]:w-[min(680px,calc(100vw-30px))] [&.spotlight]:overflow-hidden [&.spotlight]:transform-[translateX(-50%)] [&.spotlight]:animate-[spotlight-in_160ms_var(--ease-mac)_both] [&.spotlight]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.spotlight]:[background:var(--material-menu)]'>
      <div className='spotlight-search [&.spotlight-search]:h-18 [&.spotlight-search]:flex [&.spotlight-search]:items-center [&.spotlight-search]:gap-3.25 [&.spotlight-search]:p-[0_20px] [&.spotlight-search_input]:min-w-0 [&.spotlight-search_input]:flex-1 [&.spotlight-search_input]:[border:0] [&.spotlight-search_input]:[outline:0] [&.spotlight-search_input]:[background:transparent] [&.spotlight-search_input]:text-[23px]'>
        <Search size={25} />
        <input
          autoFocus
          placeholder='Spotlight Search'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div
        className={cn(
          'spotlight-results',
          '[&.spotlight-results]:max-h-82.5 [&.spotlight-results]:p-[0_8px_8px] [&.spotlight-results]:overflow-auto [&.spotlight-results]:[border-top:1px_solid_var(--separator)] [&.spotlight-results]:border-t-[oklch(0.34_0.01_250/0.15)]',
          '[&.spotlight-results_button]:w-full [&.spotlight-results_button]:h-14.5 [&.spotlight-results_button]:flex [&.spotlight-results_button]:items-center [&.spotlight-results_button]:gap-3 [&.spotlight-results_button]:p-[7px_10px] [&.spotlight-results_button]:[border:0] [&.spotlight-results_button]:rounded-lg [&.spotlight-results_button]:[background:transparent] [&.spotlight-results_button]:text-left',
          '[&.spotlight-results_button:hover]:text-[white] [&.spotlight-results_button:hover]:[background:var(--system-blue-deep)]',
          '[&.spotlight-results_button_>_span:nth-child(2)]:flex [&.spotlight-results_button_>_span:nth-child(2)]:flex-1 [&.spotlight-results_button_>_span:nth-child(2)]:flex-col',
          '[&.spotlight-results_small]:opacity-[0.65]',
          '[&.spotlight-results_kbd]:font-[inherit] [&.spotlight-results_kbd]:opacity-[0.6]',
        )}
      >
        {results.map((app) => (
          <button
            type='button'
            key={app.id}
            onClick={() => {
              openApp(app.id);
              close();
            }}
          >
            <AppIcon app={app.id} size={38} />
            <span>
              <strong>{app.label}</strong>
              <small>Application</small>
            </span>
            <kbd>↵</kbd>
          </button>
        ))}
      </div>
    </div>
  );
}
