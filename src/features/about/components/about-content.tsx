import { AtSign, BookOpen, BriefcaseBusiness, Code2, PenLine } from 'lucide-react';

import { ABOUT_DEVICE_SPECIFICATIONS } from '@/features/about/domain/constants/about-device-specifications';
import { PROFILE, PROFILE_LINKS } from '@/shared/domain/constants/profile';
import { cn } from '@/shared/utils/cn';

export function AboutContent() {
  return (
    <div
      className={cn(
        'about-app',
        '[&.about-app]:h-full [&.about-app]:overflow-y-auto [&.about-app]:p-[28px_28px_22px] [&.about-app]:flex [&.about-app]:flex-col [&.about-app]:items-center [&.about-app]:text-[oklch(0.2_0.01_250)] [&.about-app]:[background:var(--material-content)] [&.about-app]:text-center',
        '[&.about-app_h1]:m-[13px_0_0] [&.about-app_h1]:text-[25px] [&.about-app_h1]:tracking-[-0.03em]',
        '[&.about-app_h2]:m-[1px_0_10px] [&.about-app_h2]:text-[14px] [&.about-app_h2]:font-medium',
        '[&.about-app_dl]:w-full [&.about-app_dl]:max-w-88 [&.about-app_dl]:m-[0_0_12px]',
        '[&.about-app_dl_div]:grid [&.about-app_dl_div]:grid-cols-[86px_1fr] [&.about-app_dl_div]:gap-2.5 [&.about-app_dl_div]:text-[12px] [&.about-app_dl_div]:text-left [&.about-app_dl_div]:leading-[1.6]',
        '[&.about-app_dt]:text-[oklch(0.48_0.01_250)] [&.about-app_dt]:text-right',
        '[&.about-app_dd]:m-0',
        
        '[&.about-app_footer]:flex [&.about-app_footer]:gap-3.25 [&.about-app_footer]:mt-auto [&.about-app_footer]:pt-6',
        '[&.about-app_footer_a]:text-[oklch(0.44_0.01_250)]',
      )}
    >
      <div className='mac-mark [&.mac-mark]:w-27 [&.mac-mark]:h-27 [&.mac-mark]:grid [&.mac-mark]:place-items-center [&.mac-mark]:rounded-[25px] [&.mac-mark]:text-[white] [&.mac-mark]:[background:radial-gradient(circle_at_70%_20%,oklch(0.9_0.12_210),transparent_25%),linear-gradient(145deg,oklch(0.45_0.16_250),oklch(0.64_0.2_310),oklch(0.8_0.17_75))] [&.mac-mark]:[box-shadow:0_7px_14px_oklch(0.2_0.07_270/0.25),inset_0_0_0_1px_oklch(1_0_0/0.4)] [&.mac-mark_span]:text-[38px] [&.mac-mark_span]:font-bold [&.mac-mark_span]:tracking-tighter [&.mac-mark_span]:[text-shadow:0_2px_8px_oklch(0.2_0.05_250/0.3)]'>
        <span>{PROFILE.initial}</span>
      </div>
      <h1>{PROFILE.name}</h1>
      <h2>{PROFILE.role}</h2>
      <p className='about-device [&.about-device]:m-[0_0_12px] [&.about-device]:text-[14px] [&.about-device]:font-[650]'>
        {PROFILE.location}
      </p>
      <dl>
        {ABOUT_DEVICE_SPECIFICATIONS.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <a
        className='about-resume [&.about-resume]:p-[6px_16px] [&.about-resume]:rounded-[7px] [&.about-resume]:text-[white] [&.about-resume]:[background:var(--system-blue-deep)] [&.about-resume]:text-[12px] [&.about-resume]:font-[650]'
        href={PROFILE.resumePath}
        download={PROFILE.resumeFileName}
      >
        Download CV
      </a>
      <footer>
        <a href={PROFILE_LINKS.github} aria-label='GitHub' target='_blank' rel='noreferrer noopener'>
          <Code2 size={18} />
        </a>
        <a
          href={PROFILE_LINKS.linkedin}
          aria-label='LinkedIn'
          target='_blank'
          rel='noreferrer noopener'
        >
          <BriefcaseBusiness size={18} />
        </a>
        <a href={PROFILE_LINKS.devto} aria-label='dev.to' target='_blank' rel='noreferrer noopener'>
          <PenLine size={18} />
        </a>
        <a href={PROFILE_LINKS.medium} aria-label='Medium' target='_blank' rel='noreferrer noopener'>
          <BookOpen size={18} />
        </a>
        <a href={PROFILE_LINKS.email} aria-label='Email'>
          <AtSign size={18} />
        </a>
      </footer>
    </div>
  );
}
