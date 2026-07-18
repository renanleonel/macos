import { ChevronLeft, ChevronRight, ExternalLink, Grid2X2, PanelLeft, Share } from 'lucide-react';

import { PORTFOLIO_PROJECTS } from '@/features/safari/domain/constants/portfolio-projects';
import { PortfolioProjectVariant } from '@/features/safari/domain/enums/portfolio-project-variant';
import { cn } from '@/shared/utils/cn';

export function SafariContent() {
  return (
    <div className='safari-app [&.safari-app]:h-full [&.safari-app]:flex [&.safari-app]:flex-col [&.safari-app]:[background:oklch(0.985_0_0)]'>
      <div className='safari-toolbar [&.safari-toolbar]:h-12.5 [&.safari-toolbar]:flex-[0_0_46px] [&.safari-toolbar]:flex [&.safari-toolbar]:items-center [&.safari-toolbar]:gap-4.25 [&.safari-toolbar]:p-[0_14px] [&.safari-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.safari-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.safari-toolbar]:basis-12.5 [&.safari-toolbar]:border-b-[oklch(0.36_0.01_250/0.15)] [&.safari-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar_>_svg]:text-[oklch(0.34_0.012_250)] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[-webkit-backdrop-filter:none]'>
        <PanelLeft size={17} />
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
        <div className='address-bar [&.address-bar]:h-7 [&.address-bar]:flex-1 [&.address-bar]:grid [&.address-bar]:place-items-center [&.address-bar]:rounded-lg [&.address-bar]:[background:oklch(1_0_0/0.56)] [&.address-bar]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)] [&.address-bar]:text-[oklch(0.4_0.01_250)] [&.address-bar]:text-[12px]'>
          <span>renan.dev</span>
        </div>
        <Share size={17} />
        <ExternalLink size={17} />
        <Grid2X2 size={17} />
      </div>
      <main
        className={cn(
          'portfolio-page',
          '[&.portfolio-page]:flex-1 [&.portfolio-page]:overflow-auto [&.portfolio-page]:text-[oklch(0.16_0.01_250)] [&.portfolio-page]:[background:oklch(0.985_0.004_250)] [&.portfolio-page]:[user-select:text] [&.portfolio-page]:scroll-smooth',
          '[&.portfolio-page_nav]:h-18 [&.portfolio-page_nav]:flex [&.portfolio-page_nav]:items-center [&.portfolio-page_nav]:justify-between [&.portfolio-page_nav]:max-w-225 [&.portfolio-page_nav]:m-auto [&.portfolio-page_nav]:p-[0_30px] [&.portfolio-page_nav]:text-[12px] [&.portfolio-page_nav]:font-bold [&.portfolio-page_nav]:tracking-[0.02em]',
          '[&.portfolio-page_nav_div]:flex [&.portfolio-page_nav_div]:gap-6.5 [&.portfolio-page_nav_div]:font-medium',
        )}
      >
        <nav>
          <span>RENAN.DEV</span>
          <div>
            <a href='#work'>Work</a>
            <a href='#about'>About</a>
            <a href='mailto:hello@example.com'>Contact</a>
          </div>
        </nav>
        <section
          className={cn(
            'portfolio-hero',
            '[&.portfolio-hero]:max-w-225 [&.portfolio-hero]:min-h-125 [&.portfolio-hero]:m-auto [&.portfolio-hero]:p-[80px_30px_70px]',
            '[&.portfolio-hero_h1]:max-w-190 [&.portfolio-hero_h1]:m-0 [&.portfolio-hero_h1]:text-[clamp(3.2rem,7vw,5.6rem)] [&.portfolio-hero_h1]:leading-[0.96] [&.portfolio-hero_h1]:tracking-[-0.04em] [&.portfolio-hero_h1]:text-balance',
            '[&.portfolio-hero_p]:max-w-145 [&.portfolio-hero_p]:m-[30px_0] [&.portfolio-hero_p]:text-[oklch(0.38_0.01_250)] [&.portfolio-hero_p]:text-[18px] [&.portfolio-hero_p]:leading-[1.6] [&.portfolio-hero_p]:text-pretty',
            'max-[600px]:[&.portfolio-hero]:pt-13.75',
            'max-[600px]:[&.portfolio-hero_h1]:text-[clamp(2.8rem,16vw,4.7rem)]',
          )}
          id='about'
        >
          <span className='availability [&.availability]:inline-flex [&.availability]:items-center [&.availability]:gap-2 [&.availability]:mb-7 [&.availability]:text-[oklch(0.39_0.04_150)] [&.availability]:text-[12px] [&.availability]:font-semibold [&.availability_i]:w-2 [&.availability_i]:h-2 [&.availability_i]:rounded-[50%] [&.availability_i]:[background:oklch(0.72_0.2_145)] [&.availability_i]:[box-shadow:0_0_0_4px_oklch(0.72_0.2_145/0.12)]'>
            <i /> Available for interesting work
          </span>
          <h1>I build digital things with care.</h1>
          <p>
            Designer, developer, and relentless polisher of tiny details. This copy is a
            placeholder; the craft is real.
          </p>
          <a
            href='#work'
            className='hero-link [&.hero-link]:inline-flex [&.hero-link]:gap-3 [&.hero-link]:items-center [&.hero-link]:font-[650] [&.hero-link]:[border-bottom:1px_solid_currentColor] [&.hero-link]:pb-0.75'
          >
            Explore selected work <span>↓</span>
          </a>
        </section>
        <section
          className='portfolio-work [&.portfolio-work]:grid [&.portfolio-work]:grid-cols-[1fr_1fr] [&.portfolio-work]:min-h-107.5 max-[600px]:[&.portfolio-work]:grid-cols-[1fr]'
          id='work'
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <article
              className={cn(
                'work-feature',
                `work-feature--${project.variant}`,
                '[&.work-feature]:relative [&.work-feature]:flex [&.work-feature]:items-end [&.work-feature]:justify-between [&.work-feature]:p-9 [&.work-feature]:text-[white]',
                '[&.work-feature_>_span]:self-start [&.work-feature_>_span]:text-[12px]',
                '[&.work-feature_h2]:m-[10px_0] [&.work-feature_h2]:text-[34px] [&.work-feature_h2]:tracking-tight',
                '[&.work-feature_p]:max-w-[30ch] [&.work-feature_p]:m-0 [&.work-feature_p]:leading-normal',
                project.variant === PortfolioProjectVariant.BLUE
                  ? '[&.work-feature--blue]:[background:oklch(0.48_0.16_245)]'
                  : '[&.work-feature--amber]:[background:oklch(0.72_0.16_75)] [&.work-feature--amber]:text-[oklch(0.2_0.03_60)]',
              )}
              key={project.number}
            >
              <span>{project.number}</span>
              <div>
                <small>
                  {project.category} · {project.year}
                </small>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
