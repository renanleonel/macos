import { cn } from '@/shared/utils/cn';

type CalendarWidgetProps = { now: Date };

export function CalendarWidget({ now }: CalendarWidgetProps) {
  const month = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const start = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return (
    <section
      className={cn(
        'widget',
        'widget--calendar',
        '[&.widget]:min-w-0 [&.widget]:h-37 [&.widget]:p-[14px_12px] [&.widget]:overflow-hidden [&.widget]:rounded-2xl [&.widget]:[background:linear-gradient(145deg,oklch(1_0_0/0.7),oklch(0.965_0.012_245/0.57)),var(--glass-regular)] [&.widget]:[backdrop-filter:blur(30px)_saturate(1.35)] [&.widget]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_5px_12px_oklch(0.08_0.03_245/0.16)] [&.widget]:text-[13px] [&.widget]:pointer-events-auto [&.widget]:[-webkit-backdrop-filter:blur(30px)_saturate(1.35)]',
        '[&.widget_small]:text-[oklch(0.5_0.01_250)]',
        '[&.widget--calendar]:col-span-full [&.widget--calendar]:h-40',
      )}
    >
      <div className='calendar-month [&.calendar-month]:mb-1.75 [&.calendar-month]:text-[oklch(0.61_0.23_28)] [&.calendar-month]:font-bold'>
        {month}
      </div>
      <div className='calendar-layout [&.calendar-layout]:grid [&.calendar-layout]:grid-cols-[196px_1fr] [&.calendar-layout]:gap-3'>
        <div
          className='calendar-grid [&.calendar-grid]:grid [&.calendar-grid]:grid-cols-[repeat(7,1fr)] [&.calendar-grid]:items-center [&.calendar-grid]:text-center [&.calendar-grid]:text-[10px] [&.calendar-grid]:gap-y-0.75'
          aria-label={month}
        >
          {'SMTWTFS'.split('').map((day, index) => (
            <span
              className='calendar-weekday [&.calendar-weekday]:text-[oklch(0.55_0.01_250)] [&.calendar-weekday]:text-[8px] [&.calendar-weekday]:font-bold'
              key={`${day}-${index}`}
            >
              {day}
            </span>
          ))}
          {Array.from({ length: start }).map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {Array.from({ length: days }, (_, index) => index + 1).map((day) => (
            <span
              className={cn(
                day === now.getDate() ? 'calendar-today' : '',
                '[&.calendar-today]:w-4.5 [&.calendar-today]:h-4.5 [&.calendar-today]:justify-self-center [&.calendar-today]:grid [&.calendar-today]:place-items-center [&.calendar-today]:rounded-[50%] [&.calendar-today]:text-[white] [&.calendar-today]:[background:oklch(0.62_0.22_25)]',
              )}
              key={day}
            >
              {day}
            </span>
          ))}
        </div>
        <div
          className={cn(
            'calendar-event',
            '[&.calendar-event]:self-center [&.calendar-event]:min-w-0 [&.calendar-event]:p-[4px_0_4px_8px] [&.calendar-event]:flex [&.calendar-event]:flex-col [&.calendar-event]:overflow-hidden [&.calendar-event]:text-inherit [&.calendar-event]:text-left [&.calendar-event]:cursor-default [&.calendar-event]:relative [&.calendar-event]:pl-3.25',
            '[&.calendar-event_span]:overflow-hidden [&.calendar-event_span]:whitespace-nowrap [&.calendar-event_span]:text-ellipsis',
            '[&.calendar-event_small]:text-[oklch(0.5_0.01_250)]',
            "[&.calendar-event::before]:[content:''] [&.calendar-event::before]:absolute [&.calendar-event::before]:left-px [&.calendar-event::before]:top-1.25 [&.calendar-event::before]:w-1.5 [&.calendar-event::before]:h-1.5 [&.calendar-event::before]:rounded-[50%] [&.calendar-event::before]:[background:var(--system-blue)] [&.calendar-event::before]:[box-shadow:0_0_0_3px_oklch(0.67_0.17_245/0.14)]",
          )}
        >
          <span>Design review — Portfolio</span>
          <small>10:00 AM · Notes</small>
        </div>
      </div>
    </section>
  );
}
