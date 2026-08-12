import type { Article } from '@/features/safari/domain/models/article';

/** How many posts the Articles section shows. */
export const ARTICLE_LIMIT = 5;

/**
 * Shown until the dev.to API answers, and kept if it never does. Mirrors the
 * five most recent posts; refresh it when older entries fall off the list.
 */
export const FALLBACK_ARTICLES: Article[] = [
  {
    title: 'Building a Scalable i18n System in React',
    url: 'https://dev.to/renao/building-a-scalable-i18n-system-in-react-5hk',
    publishedAt: '2025-05-02',
    readingMinutes: 4,
  },
  {
    title: 'Mastering React Performance',
    url: 'https://dev.to/renao/mastering-react-performance-4dd7',
    publishedAt: '2025-03-13',
    readingMinutes: 13,
  },
  {
    title: 'Virtualizing React',
    url: 'https://dev.to/renao/virtualizing-react-20fb',
    publishedAt: '2025-03-05',
    readingMinutes: 7,
  },
  {
    title: 'Dockerizing Next.js',
    url: 'https://dev.to/renao/dockerizing-nextjs-2opd',
    publishedAt: '2024-04-20',
    readingMinutes: 8,
  },
  {
    title: 'Next.js 14 authentication',
    url: 'https://dev.to/renao/nextjs-14-authentication-38o7',
    publishedAt: '2024-03-05',
    readingMinutes: 4,
  },
];
