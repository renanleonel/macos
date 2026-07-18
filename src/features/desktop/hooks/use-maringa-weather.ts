import { useEffect, useState } from 'react';

import { fetchMaringaWeather } from '@/features/desktop/adapters/maringa-weather';
import { DEFAULT_WEATHER } from '@/features/desktop/domain/constants/default-weather';

export function useMaringaWeather() {
  const [weather, setWeather] = useState(DEFAULT_WEATHER);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const nextWeather = await fetchMaringaWeather(controller.signal);
        if (!nextWeather) return;
        setWeather(nextWeather);
        setUpdatedAt(new Date());
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // The last known or fallback Maringá conditions remain visible offline.
        }
      }
    };
    void refresh();
    const timer = globalThis.setInterval(refresh, 15 * 60 * 1000);
    return () => {
      controller.abort();
      globalThis.clearInterval(timer);
    };
  }, []);

  return { weather, updatedAt };
}
