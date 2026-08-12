import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Grid2X2,
  PanelLeft,
  Share,
  Star,
} from 'lucide-react';

import { useDevtoArticles } from '@/features/safari/hooks/use-devto-articles';
import { useGithubRepositories } from '@/features/safari/hooks/use-github-repositories';
import { PROFILE, PROFILE_LINKS } from '@/shared/domain/constants/profile';
import { cn } from '@/shared/utils/cn';

const ARTICLE_DATE_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };

export function SafariContent() {
  const { repositories } = useGithubRepositories();
  const { articles } = useDevtoArticles();

  return (
    <div className='safari-app [&.safari-app]:h-full [&.safari-app]:flex [&.safari-app]:flex-col [&.safari-app]:[background:oklch(0.985_0_0)]'>
      <div className='safari-toolbar [&.safari-toolbar]:h-12.5 [&.safari-toolbar]:flex-[0_0_46px] [&.safari-toolbar]:flex [&.safari-toolbar]:items-center [&.safari-toolbar]:gap-4.25 [&.safari-toolbar]:p-[0_14px] [&.safari-toolbar]:[border-bottom:1px_solid_var(--separator)] [&.safari-toolbar]:[background:linear-gradient(180deg,oklch(1_0_0/0.28),transparent_52%),var(--material-toolbar)] [&.safari-toolbar]:basis-12.5 [&.safari-toolbar]:border-b-[oklch(0.36_0.01_250/0.15)] [&.safari-toolbar]:[backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar]:[-webkit-backdrop-filter:blur(28px)_saturate(1.25)] [&.safari-toolbar_>_svg]:text-[oklch(0.34_0.012_250)] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[backdrop-filter:none] [@media(prefers-reduced-transparency:_reduce)]:[&.safari-toolbar]:[-webkit-backdrop-filter:none]'>
        <PanelLeft size={17} />
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
        <div className='address-bar [&.address-bar]:h-7 [&.address-bar]:flex-1 [&.address-bar]:grid [&.address-bar]:place-items-center [&.address-bar]:rounded-lg [&.address-bar]:[background:oklch(1_0_0/0.56)] [&.address-bar]:[box-shadow:inset_0_0_0_1px_oklch(0.32_0.01_250/0.13),inset_0_1px_oklch(1_0_0/0.7),0_1px_3px_oklch(0.16_0.02_250/0.08)] [&.address-bar]:text-[oklch(0.4_0.01_250)] [&.address-bar]:text-[12px]'>
          <span>{PROFILE.site}</span>
        </div>
        <Share size={17} />
        <ExternalLink size={17} />
        <Grid2X2 size={17} />
      </div>
      <main
        className={cn(
          'portfolio-page',
          '[&.portfolio-page]:flex-1 [&.portfolio-page]:overflow-auto [&.portfolio-page]:text-[oklch(0.16_0.01_250)] [&.portfolio-page]:[background:oklch(0.985_0.004_250)] [&.portfolio-page]:[user-select:text] [&.portfolio-page]:scroll-smooth',
          '[&.portfolio-page_nav]:min-h-18 [&.portfolio-page_nav]:flex [&.portfolio-page_nav]:flex-wrap [&.portfolio-page_nav]:items-center [&.portfolio-page_nav]:justify-between [&.portfolio-page_nav]:gap-y-2 [&.portfolio-page_nav]:max-w-225 [&.portfolio-page_nav]:m-auto [&.portfolio-page_nav]:p-[0_30px] [&.portfolio-page_nav]:text-[12px] [&.portfolio-page_nav]:font-bold [&.portfolio-page_nav]:tracking-[0.02em]',
          '[&.portfolio-page_nav_div]:flex [&.portfolio-page_nav_div]:flex-wrap [&.portfolio-page_nav_div]:gap-x-5.5 [&.portfolio-page_nav_div]:gap-y-1.5 [&.portfolio-page_nav_div]:font-medium',
          '[&.portfolio-page_nav_a:hover]:[border-bottom:1px_solid_currentColor]',
        )}
      >
        <nav>
          <span>{PROFILE.site.toUpperCase()}</span>
          <div>
            <a href={PROFILE_LINKS.github} target='_blank' rel='noreferrer noopener'>
              GitHub
            </a>
            <a href={PROFILE_LINKS.linkedin} target='_blank' rel='noreferrer noopener'>
              LinkedIn
            </a>
            <a href={PROFILE_LINKS.devto} target='_blank' rel='noreferrer noopener'>
              dev.to
            </a>
            <a href={PROFILE_LINKS.medium} target='_blank' rel='noreferrer noopener'>
              Medium
            </a>
            <a href={PROFILE_LINKS.email}>Contact</a>
          </div>
        </nav>

        <section
          className={cn(
            'portfolio-projects',
            '[&.portfolio-projects]:max-w-225 [&.portfolio-projects]:m-auto [&.portfolio-projects]:p-[26px_30px_44px]',
            '[&.portfolio-projects_>_h2]:m-[0_0_5px] [&.portfolio-projects_>_h2]:text-[12px] [&.portfolio-projects_>_h2]:font-bold [&.portfolio-projects_>_h2]:tracking-[0.08em] [&.portfolio-projects_>_h2]:text-[oklch(0.5_0.01_250)]',
            '[&.portfolio-projects_>_p]:m-[0_0_18px] [&.portfolio-projects_>_p]:text-[13px] [&.portfolio-projects_>_p]:text-[oklch(0.5_0.01_250)]',
            '[&.portfolio-projects_.repo-grid]:grid [&.portfolio-projects_.repo-grid]:grid-cols-[1fr_1fr] [&.portfolio-projects_.repo-grid]:gap-3',
            'max-[600px]:[&.portfolio-projects_.repo-grid]:grid-cols-[1fr]',
            '[&.portfolio-projects_.repo]:flex [&.portfolio-projects_.repo]:flex-col [&.portfolio-projects_.repo]:gap-1.5 [&.portfolio-projects_.repo]:p-[14px_16px] [&.portfolio-projects_.repo]:rounded-xl [&.portfolio-projects_.repo]:[background:white] [&.portfolio-projects_.repo]:[box-shadow:inset_0_0_0_1px_oklch(0.36_0.01_250/0.12),0_1px_2px_oklch(0.16_0.02_250/0.05)] [&.portfolio-projects_.repo]:[transition:box-shadow_160ms_var(--ease-mac),transform_160ms_var(--ease-mac)]',
            '[&.portfolio-projects_.repo:hover]:[box-shadow:inset_0_0_0_1px_oklch(0.36_0.01_250/0.2),0_6px_16px_oklch(0.16_0.02_250/0.1)] [&.portfolio-projects_.repo:hover]:transform-[translateY(-1px)]',
            '[&.portfolio-projects_.repo_strong]:text-[14px] [&.portfolio-projects_.repo_strong]:text-[oklch(0.42_0.16_250)]',
            '[&.portfolio-projects_.repo_p]:m-0 [&.portfolio-projects_.repo_p]:text-[13px] [&.portfolio-projects_.repo_p]:leading-[1.5] [&.portfolio-projects_.repo_p]:text-[oklch(0.38_0.01_250)]',
            '[&.portfolio-projects_.repo-meta]:flex [&.portfolio-projects_.repo-meta]:items-center [&.portfolio-projects_.repo-meta]:gap-3.5 [&.portfolio-projects_.repo-meta]:mt-auto [&.portfolio-projects_.repo-meta]:pt-1 [&.portfolio-projects_.repo-meta]:text-[12px] [&.portfolio-projects_.repo-meta]:text-[oklch(0.5_0.01_250)]',
            '[&.portfolio-projects_.repo-meta_span]:inline-flex [&.portfolio-projects_.repo-meta_span]:items-center [&.portfolio-projects_.repo-meta_span]:gap-1.25',
          )}
          id='projects'
        >
          <h2>OPEN SOURCE</h2>
          <p>Selected repositories, pulled live from GitHub.</p>
          <div className='repo-grid'>
            {repositories.map((repository) => (
              <a
                className='repo'
                key={repository.name}
                href={repository.url}
                target='_blank'
                rel='noreferrer noopener'
              >
                <strong>{repository.name}</strong>
                <p>{repository.description}</p>
                <div className='repo-meta'>
                  {repository.language ? <span>{repository.language}</span> : null}
                  {repository.stars > 0 ? (
                    <span>
                      <Star size={12} /> {repository.stars}
                    </span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section
          className={cn(
            'portfolio-writing',
            '[&.portfolio-writing]:max-w-225 [&.portfolio-writing]:m-auto [&.portfolio-writing]:p-[10px_30px_70px]',
            '[&.portfolio-writing_>_h2]:m-[0_0_5px] [&.portfolio-writing_>_h2]:text-[12px] [&.portfolio-writing_>_h2]:font-bold [&.portfolio-writing_>_h2]:tracking-[0.08em] [&.portfolio-writing_>_h2]:text-[oklch(0.5_0.01_250)]',
            '[&.portfolio-writing_>_p]:m-[0_0_10px] [&.portfolio-writing_>_p]:text-[13px] [&.portfolio-writing_>_p]:text-[oklch(0.5_0.01_250)]',
            '[&.portfolio-writing_.article]:flex [&.portfolio-writing_.article]:items-baseline [&.portfolio-writing_.article]:justify-between [&.portfolio-writing_.article]:gap-6 [&.portfolio-writing_.article]:p-[13px_0] [&.portfolio-writing_.article]:[border-top:1px_solid_oklch(0.36_0.01_250/0.14)]',
            '[&.portfolio-writing_.article:hover_strong]:[border-bottom:1px_solid_currentColor]',
            '[&.portfolio-writing_.article_strong]:text-[15px] [&.portfolio-writing_.article_strong]:font-[650] [&.portfolio-writing_.article_strong]:tracking-[-0.01em] [&.portfolio-writing_.article_strong]:text-pretty',
            '[&.portfolio-writing_.article_span]:flex-none [&.portfolio-writing_.article_span]:text-[12px] [&.portfolio-writing_.article_span]:text-[oklch(0.5_0.01_250)] [&.portfolio-writing_.article_span]:[font-variant-numeric:tabular-nums]',
            'max-[600px]:[&.portfolio-writing_.article]:flex-col max-[600px]:[&.portfolio-writing_.article]:gap-1',
          )}
          id='writing'
        >
          <h2>WRITING</h2>
          <p>Recent posts, pulled live from dev.to.</p>
          {articles.map((article) => (
            <a
              className='article'
              key={article.url}
              href={article.url}
              target='_blank'
              rel='noreferrer noopener'
            >
              <strong>{article.title}</strong>
              <span>
                {formatArticleDate(article.publishedAt)}
                {article.readingMinutes > 0 ? ` · ${article.readingMinutes} min` : ''}
              </span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

function formatArticleDate(publishedAt: string) {
  const date = new Date(publishedAt);
  return Number.isNaN(date.getTime())
    ? publishedAt
    : date.toLocaleDateString('en-US', ARTICLE_DATE_FORMAT);
}
