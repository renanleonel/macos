import type { WeatherSnapshot } from '@/features/desktop/domain/models/weather-snapshot';

export const DEFAULT_WEATHER: WeatherSnapshot = {
  temperature: 24,
  apparentTemperature: 23,
  code: 0,
  isDay: true,
};
