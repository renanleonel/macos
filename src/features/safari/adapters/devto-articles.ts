import { ARTICLE_LIMIT } from '@/features/safari/domain/constants/fallback-articles';
import type { Article } from '@/features/safari/domain/models/article';

const DEVTO_ARTICLES_URL = `https://dev.to/api/articles?username=renao&per_page=${ARTICLE_LIMIT}`;

type DevtoArticleResponse = {
  title?: string;
  url?: string;
  published_at?: string;
  reading_time_minutes?: number;
};

/**
 * dev.to's public API needs no key and sends permissive CORS headers, so this
 * runs straight from the browser. Medium has no equivalent — its RSS feed is
 * not CORS-readable — so articles come from dev.to only.
 */
export async function fetchDevtoArticles(signal: AbortSignal): Promise<Article[] | null> {
  const response = await fetch(DEVTO_ARTICLES_URL, { signal });
  if (!response.ok) return null;

  const data: unknown = await response.json();
  if (!Array.isArray(data)) return null;

  const articles = (data as DevtoArticleResponse[])
    .filter((entry): entry is DevtoArticleResponse & { title: string; url: string } =>
      Boolean(entry.title && entry.url),
    )
    .map((entry) => ({
      title: entry.title,
      url: entry.url,
      publishedAt: entry.published_at?.slice(0, 10) ?? '',
      readingMinutes: entry.reading_time_minutes ?? 0,
    }));

  return articles.length > 0 ? articles : null;
}
