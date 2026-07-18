export function subscribeDesktopKeydown(listener: (event: KeyboardEvent) => void) {
  globalThis.addEventListener('keydown', listener);
  return () => globalThis.removeEventListener('keydown', listener);
}
