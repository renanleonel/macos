import { useEffect, useState } from 'react';

import { fetchGithubRepositories } from '@/features/safari/adapters/github-repositories';
import { FALLBACK_REPOSITORIES } from '@/features/safari/domain/constants/pinned-repositories';
import type { GithubRepository } from '@/features/safari/domain/models/github-repository';

/**
 * The baked-in list renders immediately and is simply replaced if the API
 * answers, so the page never shows a spinner or an empty state — a rate-limited
 * visitor sees the same projects, just with slightly stale star counts.
 */
export function useGithubRepositories() {
  const [repositories, setRepositories] = useState<GithubRepository[]>(FALLBACK_REPOSITORIES);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const live = await fetchGithubRepositories(controller.signal);
        if (!live) return;
        setRepositories(live);
        setIsLive(true);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // Rate-limited or offline: the fallback list stays on screen.
        }
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return { repositories, isLive };
}
