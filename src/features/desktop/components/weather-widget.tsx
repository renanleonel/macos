import { CloudSun, Moon, Sun } from 'lucide-react';

import { weatherDescription } from '@/features/desktop/domain/selectors/weather-description';
import { useMaringaWeather } from '@/features/desktop/hooks/use-maringa-weather';
import { cn } from '@/shared/utils/cn';

export function WeatherWidget() {
  const { weather, updatedAt } = useMaringaWeather();
  const conditions = weatherDescription(weather.code);
  return (
    <section
      className={cn(
        'widget',
        'widget--weather',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]',
        '[&.widget_small]:text-[oklch(0.5_0.01_250)]',
        '[&.widget--weather_>_small]:block [&.widget--weather_>_small]:overflow-hidden [&.widget--weather_>_small]:text-ellipsis [&.widget--weather_>_small]:whitespace-nowrap',
      )}
      aria-live='polite'
      aria-label={`Weather in Maringá, Paraná: ${Math.round(weather.temperature)} degrees, ${conditions}`}
    >
      <strong>Maringá, PR</strong>
      <div className='weather-temp [&.weather-temp]:flex [&.weather-temp]:items-center [&.weather-temp]:gap-2 [&.weather-temp]:m-[12px_0_22px] [&.weather-temp]:text-[30px] [&.weather-temp]:font-light [&.weather-temp_svg]:text-[oklch(0.82_0.17_80)] [&.weather-temp_svg]:fill-[currentColor]'>
        {weather.code === 0 ? (
          weather.isDay ? (
            <Sun size={32} />
          ) : (
            <Moon size={32} />
          )
        ) : (
          <CloudSun size={32} />
        )}{' '}
        {Math.round(weather.temperature)}°
      </div>
      <small>
        {conditions} · Feels like {Math.round(weather.apparentTemperature)}°
        {updatedAt
          ? ` · Updated ${updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
          : ''}
      </small>
    </section>
  );
}
