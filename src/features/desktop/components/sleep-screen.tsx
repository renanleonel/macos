import { cn } from '@/shared/utils/cn';
type SleepScreenProps = { wake: () => void };
export function SleepScreen({ wake }: SleepScreenProps) {
  return (
    <button
      type='button'
      className={cn(
        'sleep-screen',
        '[&.sleep-screen]:fixed [&.sleep-screen]:inset-0 [&.sleep-screen]:z-3000 [&.sleep-screen]:w-full [&.sleep-screen]:h-full [&.sleep-screen]:[border:0] [&.sleep-screen]:text-[white] [&.sleep-screen]:[background:#000] [&.sleep-screen]:grid [&.sleep-screen]:[place-items:end_center] [&.sleep-screen]:pb-9 [&.sleep-screen]:cursor-default',
        '[&.sleep-screen_span]:text-[oklch(1_0_0/0.42)] [&.sleep-screen_span]:text-[12px] [&.sleep-screen_span]:opacity-[0] [&.sleep-screen_span]:[transition:opacity_180ms_var(--ease-mac)]',
        '[&.sleep-screen:hover_span]:opacity-[1]',
      )}
      aria-label='Wake Mac'
      onClick={wake}
    >
      <span>Click to wake</span>
    </button>
  );
}
