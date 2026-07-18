import { readLocalStorage, writeLocalStorage } from '@/shared/adapters/local-storage';

const BRIGHTNESS_STORAGE_KEY = 'macos27:display-brightness';
const DEFAULT_BRIGHTNESS = 82;

export function readBrightness(): number {
  try {
    return Number(readLocalStorage(BRIGHTNESS_STORAGE_KEY)) || DEFAULT_BRIGHTNESS;
  } catch {
    return DEFAULT_BRIGHTNESS;
  }
}

export function writeBrightness(brightness: number): void {
  writeLocalStorage(BRIGHTNESS_STORAGE_KEY, String(brightness));
}
