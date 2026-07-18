import { useEffect, useState } from 'react';

export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = globalThis.setInterval(() => setNow(new Date()), 30_000);
    return () => globalThis.clearInterval(timer);
  }, []);
  return now;
}
