import { AtSign, BriefcaseBusiness, Code2 } from 'lucide-react';

import { ABOUT_DEVICE_SPECIFICATIONS } from '@/features/about/domain/constants/about-device-specifications';
import { cn } from '@/shared/utils/cn';

export function AboutContent() {
  return (
    <div
      className={cn(
        'about-app',
        '[&.about-app]:h-full [&.about-app]:p-7 [&.about-app]:flex [&.about-app]:flex-col [&.about-app]:items-center [&.about-app]:text-[oklch(0.2_0.01_250)] [&.about-app]:[background:var(--material-content)] [&.about-app]:text-center',
        '[&.about-app_h1]:m-[13px_0_0] [&.about-app_h1]:text-[28px] [&.about-app_h1]:tracking-[-0.03em]',
        '[&.about-app_h2]:m-[1px_0_10px] [&.about-app_h2]:text-[14px] [&.about-app_h2]:font-medium',
        '[&.about-app_dl]:w-70 [&.about-app_dl]:m-[0_0_12px]',
        '[&.about-app_dl_div]:grid [&.about-app_dl_div]:grid-cols-[1fr_1.4fr] [&.about-app_dl_div]:gap-2.5 [&.about-app_dl_div]:text-[12px] [&.about-app_dl_div]:text-left [&.about-app_dl_div]:leading-[1.6]',
        '[&.about-app_dt]:text-[oklch(0.48_0.01_250)] [&.about-app_dt]:text-right',
        '[&.about-app_dd]:m-0',
        '[&.about-app_>_button]:p-[6px_16px] [&.about-app_>_button]:[border:0] [&.about-app_>_button]:rounded-[7px] [&.about-app_>_button]:text-[white] [&.about-app_>_button]:[background:var(--system-blue-deep)] [&.about-app_>_button]:text-[12px]',
        '[&.about-app_footer]:flex [&.about-app_footer]:gap-3.25 [&.about-app_footer]:mt-auto',
        '[&.about-app_footer_a]:text-[oklch(0.44_0.01_250)]',
      )}
    >
      <div className='mac-mark [&.mac-mark]:w-27 [&.mac-mark]:h-27 [&.mac-mark]:grid [&.mac-mark]:place-items-center [&.mac-mark]:rounded-[25px] [&.mac-mark]:text-[white] [&.mac-mark]:[background:radial-gradient(circle_at_70%_20%,oklch(0.9_0.12_210),transparent_25%),linear-gradient(145deg,oklch(0.45_0.16_250),oklch(0.64_0.2_310),oklch(0.8_0.17_75))] [&.mac-mark]:[box-shadow:0_7px_14px_oklch(0.2_0.07_270/0.25),inset_0_0_0_1px_oklch(1_0_0/0.4)] [&.mac-mark_span]:text-[38px] [&.mac-mark_span]:font-bold [&.mac-mark_span]:tracking-tighter [&.mac-mark_span]:[text-shadow:0_2px_8px_oklch(0.2_0.05_250/0.3)]'>
        <span>27</span>
      </div>
      <h1>macOS</h1>
      <h2>Tahoe 27.0</h2>
      <p className='about-device [&.about-device]:m-[0_0_12px] [&.about-device]:text-[14px] [&.about-device]:font-[650]'>
        Renan's Mac
      </p>
      <dl>
        {ABOUT_DEVICE_SPECIFICATIONS.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <button type='button'>More Info…</button>
      <footer>
        <a href='https://github.com' aria-label='GitHub'>
          <Code2 size={18} />
        </a>
        <a href='https://linkedin.com' aria-label='LinkedIn'>
          <BriefcaseBusiness size={18} />
        </a>
        <a href='mailto:renan@example.com' aria-label='Email'>
          <AtSign size={18} />
        </a>
      </footer>
    </div>
  );
}
