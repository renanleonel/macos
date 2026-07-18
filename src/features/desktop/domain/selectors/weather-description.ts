export function weatherDescription(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 67 || (code >= 80 && code <= 82)) return 'Rain';
  if (code <= 77 || (code >= 85 && code <= 86)) return 'Snow';
  if (code >= 95) return 'Thunderstorms';
  return 'Mixed Conditions';
}
