import { Bluetooth, Moon, Sun, Volume2, Wifi } from 'lucide-react';
import { useState } from 'react';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { cn } from '@/shared/utils/cn';
type ControlCenterProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  doNotDisturb: boolean;
  setDoNotDisturb: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
};
export function ControlCenter({
  dark,
  setDark,
  brightness,
  setBrightness,
  doNotDisturb,
  setDoNotDisturb,
  volume,
  setVolume,
}: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  return (
    <SystemMenu className='control-center [&.control-center]:fixed [&.control-center]:z-800 [&.control-center]:rounded-[14px] [&.control-center]:[background:linear-gradient(145deg,oklch(1_0_0/0.34),transparent_48%),var(--material-menu)] [&.control-center]:[backdrop-filter:blur(44px)_saturate(1.55)] [&.control-center]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_18px_44px_oklch(0.08_0.035_245/0.28),0_4px_12px_oklch(0.08_0.03_245/0.18)] [&.control-center]:top-8.5 [&.control-center]:right-2.5 [&.control-center]:w-82.5 [&.control-center]:p-3 [&.control-center]:[-webkit-backdrop-filter:blur(44px)_saturate(1.55)] contrast-more:[&.control-center]:[outline:1px_solid_var(--separator)] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[-webkit-backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.control-center]:[background:var(--material-menu)] max-[600px]:[&.control-center]:right-1.5 max-[600px]:[&.control-center]:w-[min(330px,calc(100vw-12px))]'>
      <div
        className={cn(
          'control-grid',
          '[&.control-grid]:grid [&.control-grid]:grid-cols-[1fr_1fr] [&.control-grid]:gap-2',
          '[&.control-grid_button]:min-h-15.25 [&.control-grid_button]:flex [&.control-grid_button]:items-center [&.control-grid_button]:gap-2.25 [&.control-grid_button]:p-2 [&.control-grid_button]:[border:0] [&.control-grid_button]:rounded-xl [&.control-grid_button]:[background:oklch(1_0_0/0.5)] [&.control-grid_button]:text-left [&.control-grid_button]:[transition-property:background-color,box-shadow,filter,scale] [&.control-grid_button]:duration-[180ms,180ms,180ms,120ms] [&.control-grid_button]:ease-[var(--ease-mac),var(--ease-mac),var(--ease-mac),ease-out] [&.control-grid_button]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)] [&.control-grid_button]:overflow-hidden [&.control-grid_button]:text-(--label-primary) [&.control-grid_button]:bg-[oklch(1_0_0/0.48)] [&.control-grid_button]:bg-[linear-gradient(145deg,oklch(1_0_0/0.46),oklch(1_0_0/0)_62%)] [&.control-grid_button]:[backdrop-filter:blur(18px)_saturate(1.25)] [&.control-grid_button]:[-webkit-backdrop-filter:blur(18px)_saturate(1.25)]',
          '[&.control-grid_button_>_span]:w-8 [&.control-grid_button_>_span]:h-8 [&.control-grid_button_>_span]:grid [&.control-grid_button_>_span]:place-items-center [&.control-grid_button_>_span]:rounded-[50%] [&.control-grid_button_>_span]:[background:oklch(0.84_0.01_250)]',
          '[&.control-grid_button.on_>_span]:text-[white] [&.control-grid_button.on_>_span]:[background:var(--system-blue-deep)]',
          '[&.control-grid_button_div]:flex [&.control-grid_button_div]:flex-col',
          '[&.control-grid_small]:text-inherit [&.control-grid_small]:opacity-[0.66]',
          '[&.control-grid_button:active]:scale-[0.96]',
          '[&.control-grid_button:hover]:text-(--label-primary) [&.control-grid_button:hover]:bg-(--control-hover) [&.control-grid_button:hover]:bg-[linear-gradient(145deg,oklch(1_0_0/0.46),oklch(1_0_0/0)_62%)] [&.control-grid_button:hover]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.62),inset_0_1px_oklch(1_0_0/0.76),0_5px_13px_oklch(0.08_0.025_245/0.12)] [&.control-grid_button:hover]:filter-[saturate(1.06)_brightness(1.02)]',
        )}
      >
        <button type='button' className={cn(wifi ? 'on' : '')} onClick={() => setWifi(!wifi)}>
          <span>
            <Wifi size={18} />
          </span>
          <div>
            <strong>Wi-Fi</strong>
            <small>{wifi ? 'Home' : 'Off'}</small>
          </div>
        </button>
        <button
          type='button'
          className={cn(bluetooth ? 'on' : '')}
          onClick={() => setBluetooth(!bluetooth)}
        >
          <span>
            <Bluetooth size={18} />
          </span>
          <div>
            <strong>Bluetooth</strong>
            <small>{bluetooth ? 'On' : 'Off'}</small>
          </div>
        </button>
        <button type='button' onClick={() => setDark(!dark)}>
          <span>{dark ? <Moon size={18} /> : <Sun size={18} />}</span>
          <div>
            <strong>Appearance</strong>
            <small>{dark ? 'Dark' : 'Light'}</small>
          </div>
        </button>
        <button
          type='button'
          className={cn(doNotDisturb ? 'on' : '')}
          aria-pressed={doNotDisturb}
          onClick={() => setDoNotDisturb(!doNotDisturb)}
        >
          <span>
            <Moon size={18} />
          </span>
          <div>
            <strong>Focus</strong>
            <small>{doNotDisturb ? 'Do Not Disturb' : 'Off'}</small>
          </div>
        </button>
      </div>
      <label
        className={cn(
          'slider-control',
          '[&.slider-control]:block [&.slider-control]:mt-2 [&.slider-control]:p-2.5 [&.slider-control]:rounded-xl [&.slider-control]:[background:oklch(1_0_0/0.5)] [&.slider-control]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)]',
          '[&.slider-control_span]:flex [&.slider-control_span]:items-center [&.slider-control_span]:gap-1.5 [&.slider-control_span]:text-[12px] [&.slider-control_span]:font-[650]',
          '[&.slider-control_input]:w-full [&.slider-control_input]:mt-2 [&.slider-control_input]:accent-[white]',
        )}
      >
        <span>
          <Volume2 size={16} /> Sound
        </span>
        <input
          aria-label='Sound volume'
          type='range'
          min='0'
          max='100'
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      </label>
      <label
        className={cn(
          'slider-control',
          '[&.slider-control]:block [&.slider-control]:mt-2 [&.slider-control]:p-2.5 [&.slider-control]:rounded-xl [&.slider-control]:[background:oklch(1_0_0/0.5)] [&.slider-control]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.38),inset_0_1px_oklch(1_0_0/0.46)]',
          '[&.slider-control_span]:flex [&.slider-control_span]:items-center [&.slider-control_span]:gap-1.5 [&.slider-control_span]:text-[12px] [&.slider-control_span]:font-[650]',
          '[&.slider-control_input]:w-full [&.slider-control_input]:mt-2 [&.slider-control_input]:accent-[white]',
        )}
      >
        <span>
          <Sun size={16} /> Display
        </span>
        <input
          aria-label='Display brightness'
          type='range'
          min='10'
          max='100'
          value={brightness}
          onChange={(event) => setBrightness(Number(event.target.value))}
        />
      </label>
    </SystemMenu>
  );
}
