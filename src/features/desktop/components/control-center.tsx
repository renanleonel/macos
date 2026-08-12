import { Bluetooth, Moon, Sun, Volume2, Wifi } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { GLASS_TILE } from '@/shared/domain/constants/liquid-glass';
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
    <SystemMenu className='control-center top-8.5! right-2.5! w-82.5! p-3! contrast-more:[&.control-center]:[outline:1px_solid_var(--separator)] max-[600px]:right-1.5! max-[600px]:w-[min(330px,calc(100vw-12px))]!'>
      <div
        className={cn(
          'control-grid',
          '[&.control-grid]:grid [&.control-grid]:grid-cols-[1fr_1fr] [&.control-grid]:gap-2',
          '[&.control-grid_button]:min-h-15.25 [&.control-grid_button]:flex [&.control-grid_button]:items-center [&.control-grid_button]:justify-start [&.control-grid_button]:gap-2.25 [&.control-grid_button]:p-2 [&.control-grid_button]:[border:0] [&.control-grid_button]:text-left [&.control-grid_button]:text-[13px] [&.control-grid_button]:leading-[1.15] [&.control-grid_button]:text-(--label-primary)',
          '[&.control-grid_button_>_span]:w-8 [&.control-grid_button_>_span]:h-8 [&.control-grid_button_>_span]:flex-[0_0_32px] [&.control-grid_button_>_span]:grid [&.control-grid_button_>_span]:place-items-center [&.control-grid_button_>_span]:rounded-[50%] [&.control-grid_button_>_span]:[background:oklch(0.82_0.008_250/0.85)] [&.control-grid_button_>_span]:[box-shadow:inset_0_1px_oklch(1_0_0/0.6)] [&.control-grid_button_>_span]:[transition:background_200ms_var(--ease-mac),box-shadow_200ms_var(--ease-mac)]',
          // An enabled control reads as a lit lens: saturated fill plus a glow.
          '[&.control-grid_button.on_>_span]:text-[white] [&.control-grid_button.on_>_span]:[background:linear-gradient(180deg,oklch(0.68_0.18_248),var(--system-blue-deep))] [&.control-grid_button.on_>_span]:[box-shadow:inset_0_1px_oklch(1_0_0/0.45),0_2px_8px_oklch(0.5_0.18_248/0.4)]',
          '[&.control-grid_button_div]:flex [&.control-grid_button_div]:flex-col',
          '[&.control-grid_strong]:font-[650] [&.control-grid_small]:mt-0.5 [&.control-grid_small]:text-[11px] [&.control-grid_small]:leading-none [&.control-grid_small]:opacity-[0.66]',
        )}
      >
        <button
          type='button'
          className={cn(GLASS_TILE, wifi ? 'on' : '')}
          onClick={() => setWifi(!wifi)}
        >
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
          className={cn(GLASS_TILE, bluetooth ? 'on' : '')}
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
        <button
          type='button'
          className={GLASS_TILE}
          onClick={() => setDark(!dark)}
        >
          <span>{dark ? <Moon size={18} /> : <Sun size={18} />}</span>
          <div>
            <strong>Appearance</strong>
            <small>{dark ? 'Dark' : 'Light'}</small>
          </div>
        </button>
        <button
          type='button'
          className={cn(GLASS_TILE, doNotDisturb ? 'on' : '')}
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
      <ControlSlider
        icon={<Volume2 size={16} />}
        label='Sound'
        ariaLabel='Sound volume'
        min={0}
        value={volume}
        onChange={setVolume}
      />
      <ControlSlider
        icon={<Sun size={16} />}
        label='Display'
        ariaLabel='Display brightness'
        min={10}
        value={brightness}
        onChange={setBrightness}
      />
    </SystemMenu>
  );
}

type ControlSliderProps = {
  icon: ReactNode;
  label: string;
  ariaLabel: string;
  min: number;
  value: number;
  onChange: (value: number) => void;
};

function ControlSlider({ icon, label, ariaLabel, min, value, onChange }: ControlSliderProps) {
  const filled = ((value - min) / (100 - min)) * 100;
  return (
    <label className='slider-control [&.slider-control]:block [&.slider-control]:mt-2.5 [&.slider-control_>_strong]:mb-1.5 [&.slider-control_>_strong]:block [&.slider-control_>_strong]:text-[12px] [&.slider-control_>_strong]:font-[650] [&.slider-control_>_strong]:opacity-[0.7]'>
      <strong>{label}</strong>
      {/*
        macOS renders these as a tall glass capsule whose fill *is* the value,
        with the icon riding inside the track — not a thin rail with a knob.
      */}
      <span
        className={cn(
          'mac-slider',
          'relative flex items-center h-8 rounded-full overflow-hidden',
          '[background:oklch(0.46_0.012_250/0.24)] [box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.2),inset_0_1px_3px_oklch(0.18_0.02_250/0.22)]',
          '[.desktop--dark_&]:[background:oklch(1_0_0/0.1)] [.desktop--dark_&]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.12),inset_0_1px_3px_oklch(0_0_0/0.3)]',
          "[&::before]:[content:''] [&::before]:absolute [&::before]:inset-[0_auto_0_0] [&::before]:w-(--value) [&::before]:pointer-events-none",
          '[&::before]:[background:linear-gradient(180deg,oklch(1_0_0/0.97),oklch(0.95_0.002_250/0.9))] [&::before]:[transition:width_90ms_linear]',
          '[.desktop--dark_&::before]:[background:linear-gradient(180deg,oklch(0.97_0_0/0.9),oklch(0.87_0.002_250/0.84))]',
          '[&_>_svg]:relative [&_>_svg]:z-[1] [&_>_svg]:flex-none [&_>_svg]:ms-2.25 [&_>_svg]:text-[oklch(0.42_0.01_250)] [&_>_svg]:[mix-blend-mode:luminosity] [&_>_svg]:pointer-events-none',
          '[&_>_input]:absolute [&_>_input]:inset-0 [&_>_input]:z-[2] [&_>_input]:w-full [&_>_input]:h-full [&_>_input]:m-0 [&_>_input]:appearance-none [&_>_input]:[background:transparent] [&_>_input]:cursor-default',
          '[&_>_input::-webkit-slider-thumb]:appearance-none [&_>_input::-webkit-slider-thumb]:w-1 [&_>_input::-webkit-slider-thumb]:h-8 [&_>_input::-webkit-slider-thumb]:[background:transparent]',
          '[&_>_input::-moz-range-thumb]:w-1 [&_>_input::-moz-range-thumb]:h-8 [&_>_input::-moz-range-thumb]:[border:0] [&_>_input::-moz-range-thumb]:[background:transparent]',
        )}
        style={{ '--value': `${filled}%` } as CSSProperties}
      >
        {icon}
        <input
          aria-label={ariaLabel}
          type='range'
          min={min}
          max={100}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </span>
    </label>
  );
}
