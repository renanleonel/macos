export function scheduleInputFocus(getInput: () => HTMLInputElement | null) {
  globalThis.requestAnimationFrame(() => getInput()?.focus());
}
