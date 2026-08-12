import type { GithubRepository } from '@/features/safari/domain/models/github-repository';
import { PROFILE } from '@/shared/domain/constants/profile';

/**
 * Repos to feature, in display order.
 *
 * The account holds ~37 public repos, most of them coursework and study
 * exercises. Listing everything the API returns would bury the real work, so
 * the API supplies live stars and descriptions for these names only.
 */
export const PINNED_REPOSITORIES = [
  'next-auth-v5-middleware',
  'quark',
  'macos',
  'react-virtualization',
  'react-i18n',
  'next-better-auth',
  'react-ag-grid',
  'renanleonel.com',
] as const;

/**
 * Shown when the GitHub API is unreachable or rate-limited — unauthenticated
 * requests are capped at 60/hour per IP, which a shared address can exhaust.
 * Star counts are a snapshot and may lag; everything else is stable.
 */
export const FALLBACK_REPOSITORIES: GithubRepository[] = [
  {
    name: 'next-auth-v5-middleware',
    description: 'authentication with next-auth v5 using middleware',
    language: 'TypeScript',
    stars: 60,
    url: `https://github.com/${PROFILE.githubUser}/next-auth-v5-middleware`,
    homepage: null,
  },
  {
    name: 'quark',
    description: 'ticket creator for development teams',
    language: 'TypeScript',
    stars: 2,
    url: `https://github.com/${PROFILE.githubUser}/quark`,
    homepage: null,
  },
  {
    name: 'macos',
    description: 'macOS browser clone',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/macos`,
    homepage: null,
  },
  {
    name: 'react-virtualization',
    description: 'virtualizing a select component from scratch and with TanStack Virtual',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/react-virtualization`,
    homepage: null,
  },
  {
    name: 'react-i18n',
    description: 'implementation of i18n using react-i18next',
    language: 'TypeScript',
    stars: 2,
    url: `https://github.com/${PROFILE.githubUser}/react-i18n`,
    homepage: null,
  },
  {
    name: 'next-better-auth',
    description: 'implementation of a basic authentication flow using better-auth',
    language: 'TypeScript',
    stars: 1,
    url: `https://github.com/${PROFILE.githubUser}/next-better-auth`,
    homepage: null,
  },
  {
    name: 'react-ag-grid',
    description: 'integrating React AG Grid with TanStack Query',
    language: 'TypeScript',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/react-ag-grid`,
    homepage: null,
  },
  {
    name: 'renanleonel.com',
    description: 'my personal blog',
    language: 'MDX',
    stars: 0,
    url: `https://github.com/${PROFILE.githubUser}/renanleonel.com`,
    homepage: PROFILE.siteUrl,
  },
];
