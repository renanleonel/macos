import { AppleMark } from '@/features/desktop/components/apple-mark';
import { cn } from '@/shared/utils/cn';
export function BootScreen() {
  return (
    <main
      className={cn(
        'boot-screen',
        '[&.boot-screen]:fixed [&.boot-screen]:inset-0 [&.boot-screen]:z-3000 [&.boot-screen]:w-full [&.boot-screen]:h-full [&.boot-screen]:[border:0] [&.boot-screen]:text-[white] [&.boot-screen]:[background:#000] [&.boot-screen]:grid [&.boot-screen]:place-content-center [&.boot-screen]:justify-items-center [&.boot-screen]:gap-12.5',
        '[&.boot-screen_>_svg]:w-15.5 [&.boot-screen_>_svg]:h-15.5 [&.boot-screen_>_svg]:fill-[currentColor]',
      )}
      aria-label='macOS is starting'
    >
      <AppleMark />
      <div
        className='boot-progress [&.boot-progress]:w-45 [&.boot-progress]:h-1 [&.boot-progress]:overflow-hidden [&.boot-progress]:rounded-[999px] [&.boot-progress]:[background:oklch(0.38_0_0)]'
        role='progressbar'
        aria-label='Starting macOS'
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span className='boot-progress__fill [&.boot-progress\\_\\_fill]:block [&.boot-progress\\_\\_fill]:w-full [&.boot-progress\\_\\_fill]:h-full [&.boot-progress\\_\\_fill]:rounded-[inherit] [&.boot-progress\\_\\_fill]:[background:white] [&.boot-progress\\_\\_fill]:transform-[scaleX(0)] [&.boot-progress\\_\\_fill]:origin-[left] [&.boot-progress\\_\\_fill]:animate-[boot-progress-fill_2s_linear_forwards]' />
      </div>
    </main>
  );
}
