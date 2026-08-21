import { SystemMenu } from '@/features/desktop/components/system-menu';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { cn } from '@/shared/utils/cn';
import { Check, Wifi } from 'lucide-react';
import { useState } from 'react';

type WifiMenuProps = { openSettings: (section: SettingsSectionId) => void };
export function WifiMenu({ openSettings }: WifiMenuProps) {
  const [enabled, setEnabled] = useState(true);
  const [network, setNetwork] = useState('Studio Wi-Fi');
  const [showOtherNetworks, setShowOtherNetworks] = useState(false);
  return (
    <SystemMenu className='status-menu wifi-menu [&.status-menu]:w-65 [&.wifi-menu]:right-68'>
      <div
        className={cn(
          'status-menu__heading flex items-center justify-between p-[6px_10px_5px]',
          '[&.status-menu\\_\\_heading]:min-h-10 [&.status-menu\\_\\_heading]:flex [&.status-menu\\_\\_heading]:items-center [&.status-menu\\_\\_heading]:justify-between [&.status-menu\\_\\_heading]:p-[6px_10px_5px]',
          '[&.status-menu\\_\\_heading_>_strong]:text-[15px] [&.status-menu\\_\\_heading_>_strong]:tracking-[-0.01em]',
          '[&.status-menu\\_\\_heading_>_span]:flex [&.status-menu\\_\\_heading_>_span]:flex-col',
          '[&.status-menu\\_\\_heading_small]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_heading_small]:text-[11px] [&.status-menu\\_\\_heading_small]:font-normal',
        )}>
        <strong>Wi-Fi</strong>
        <button
          type='button'
          className={cn(
            `mac-switch${enabled ? ' is-on' : ''}`,
            '[&.mac-switch]:relative [&.mac-switch]:w-9.5! [&.mac-switch]:min-h-5.5! [&.mac-switch]:flex-[0_0_38px] [&.mac-switch]:p-0! [&.mac-switch]:rounded-[999px]! [&.mac-switch]:[background:oklch(0.62_0.008_250/0.32)]! [&.mac-switch]:[box-shadow:inset_0_0_0_1px_oklch(0.4_0.01_250/0.12),inset_0_1px_2px_oklch(0.2_0.02_250/0.18)] [&.mac-switch]:[backdrop-filter:blur(8px)] [&.mac-switch]:[-webkit-backdrop-filter:blur(8px)] [&.mac-switch]:[transition:background-color_180ms_var(--ease-mac),box-shadow_180ms_var(--ease-mac)]',
            '[&.mac-switch_i]:absolute [&.mac-switch_i]:top-0.5 [&.mac-switch_i]:left-0.5 [&.mac-switch_i]:w-4.5 [&.mac-switch_i]:h-4.5 [&.mac-switch_i]:rounded-[50%] [&.mac-switch_i]:[background:linear-gradient(180deg,white,oklch(0.97_0.002_250))] [&.mac-switch_i]:[box-shadow:0_1px_3px_oklch(0.2_0.01_250/0.34),0_0_0_0.5px_oklch(0.2_0.01_250/0.06)] [&.mac-switch_i]:[transition:transform_220ms_var(--ease-mac)]',
            '[&.mac-switch.is-on]:[background:linear-gradient(180deg,oklch(0.68_0.18_248),var(--system-blue-deep))]! [&.mac-switch.is-on]:[box-shadow:inset_0_1px_oklch(1_0_0/0.32),0_1px_5px_oklch(0.5_0.18_248/0.4)]',
            '[&.mac-switch.is-on_i]:transform-[translateX(16px)]',
          )}
          aria-label='Toggle Wi-Fi'
          onClick={() => setEnabled(!enabled)}>
          <i />
        </button>
      </div>
      <hr />
      <span className='status-menu__label [&.status-menu\\_\\_label]:block [&.status-menu\\_\\_label]:p-[4px_9px] [&.status-menu\\_\\_label]:text-[oklch(0.49_0.01_250)] [&.status-menu\\_\\_label]:text-[11px] [&.status-menu\\_\\_label]:font-[650]'>
        Known Networks
      </span>
      {['Studio Wi-Fi', 'iPhone', 'Guest Network'].map((name, index) => (
        <button
          type='button'
          className='network-row'
          key={name}
          disabled={!enabled}
          onClick={() => setNetwork(name)}>
          <Wifi size={15} />
          <span>{name}</span>
          {network === name ? (
            <Check size={13} />
          ) : index === 0 ? null : (
            <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
              ●
            </span>
          )}
        </button>
      ))}
      <hr />
      <button
        type='button'
        aria-expanded={showOtherNetworks}
        aria-controls='other-networks'
        onClick={() => setShowOtherNetworks((visible) => !visible)}>
        Other Networks… <span>{showOtherNetworks ? '⌄' : '›'}</span>
      </button>
      {showOtherNetworks ? (
        <div
          className='other-networks [&.other-networks]:m-[2px_0_4px] [&.other-networks]:p-1 [&.other-networks]:rounded-lg [&.other-networks]:[background:oklch(1_0_0/0.16)] [&.other-networks]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.24),inset_0_1px_3px_oklch(0.2_0.02_250/0.12)] [&.other-networks]:[backdrop-filter:blur(10px)_saturate(1.4)] [&.other-networks]:[-webkit-backdrop-filter:blur(10px)_saturate(1.4)] [&.other-networks]:animate-[other-networks-in_140ms_var(--ease-mac)_both] [&.other-networks_.network-row]:min-h-6.75'
          id='other-networks'
          role='region'
          aria-label='Other Networks'>
          {['Coffee Shop Guest', 'Library Public', 'Phone Hotspot'].map((name, index) => (
            <button
              type='button'
              className='network-row'
              key={name}
              disabled={!enabled}
              onClick={() => {
                setNetwork(name);
                setShowOtherNetworks(false);
              }}>
              <Wifi size={15} />
              <span>{name}</span>
              {network === name ? (
                <Check size={13} />
              ) : index === 1 ? null : (
                <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
                  ●
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
      <button type='button' onClick={() => openSettings(SettingsSectionId.WIFI)}>
        Wi-Fi Settings…
      </button>
    </SystemMenu>
  );
}
