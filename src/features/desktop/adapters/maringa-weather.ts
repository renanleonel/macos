import type { WeatherSnapshot } from '@/features/desktop/domain/models/weather-snapshot';

const MARINGA_WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-23.4205&longitude=-51.9333&current=temperature_2m,apparent_temperature,weather_code,is_day&timezone=America%2FSao_Paulo';

export async function fetchMaringaWeather(signal: AbortSignal): Promise<WeatherSnapshot | null> {
  const response = await fetch(MARINGA_WEATHER_URL, { signal });
  if (!response.ok) return null;
  const data = (await response.json()) as {
    current?: {
      temperature_2m?: number;
      apparent_temperature?: number;
      weather_code?: number;
      is_day?: number;
    };
  };
  const current = data.current;
  if (
    !current ||
    typeof current.temperature_2m !== 'number' ||
    typeof current.weather_code !== 'number'
  )
    return null;

  return {
    temperature: current.temperature_2m,
    apparentTemperature:
      typeof current.apparent_temperature === 'number'
        ? current.apparent_temperature
        : current.temperature_2m,
    code: current.weather_code,
    isDay: current.is_day !== 0,
  };
}
