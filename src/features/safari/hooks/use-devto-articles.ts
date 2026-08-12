import { useEffect, useState } from 'react';

import { fetchDevtoArticles } from '@/features/safari/adapters/devto-articles';
import { FALLBACK_ARTICLES } from '@/features/safari/domain/constants/fallback-articles';
import type { Article } from '@/features/safari/domain/models/article';

/**
 * Same pattern as the repository list: the baked-in posts render immediately
 * and are replaced only on a successful response, so the section never shows a
 * spinner or an empty state.
 */
export function useDevtoArticles() {
  const [articles, setArticles] = useState<Article[]>(FALLBACK_ARTICLES);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const live = await fetchDevtoArticles(controller.signal);
        if (live) setArticles(live);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // Offline or API down: the fallback list stays on screen.
        }
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return { articles };
}
