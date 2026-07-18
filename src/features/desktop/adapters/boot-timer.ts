export function scheduleBootCompletion(callback: () => void) {
  return globalThis.setTimeout(callback, 2000);
}

export function cancelBootCompletion(timer: number) {
  globalThis.clearTimeout(timer);
}
