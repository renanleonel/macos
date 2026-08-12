import { PINNED_REPOSITORIES } from '@/features/safari/domain/constants/pinned-repositories';
import type { GithubRepository } from '@/features/safari/domain/models/github-repository';
import { PROFILE } from '@/shared/domain/constants/profile';

const REPOSITORIES_URL = `https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=updated`;

type GithubRepositoryResponse = {
  name?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  html_url?: string;
  homepage?: string | null;
  fork?: boolean;
};

/**
 * Returns the pinned repos with live metadata, in pinned order. Resolves to
 * null on any non-OK response — notably 403, which is how GitHub reports the
 * 60-requests-per-hour unauthenticated rate limit — so the caller can fall back.
 */
export async function fetchGithubRepositories(
  signal: AbortSignal,
): Promise<GithubRepository[] | null> {
  const response = await fetch(REPOSITORIES_URL, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (!Array.isArray(data)) return null;

  const byName = new Map<string, GithubRepository>();
  for (const entry of data as GithubRepositoryResponse[]) {
    if (!entry.name || !entry.html_url) continue;
    byName.set(entry.name, {
      name: entry.name,
      description: entry.description ?? '',
      language: entry.language ?? null,
      stars: entry.stargazers_count ?? 0,
      url: entry.html_url,
      homepage: entry.homepage || null,
    });
  }

  const pinned = PINNED_REPOSITORIES.map((name) => byName.get(name)).filter(
    (repository): repository is GithubRepository => repository !== undefined,
  );

  return pinned.length > 0 ? pinned : null;
}
