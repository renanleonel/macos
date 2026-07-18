import { AppleMark } from '@/features/desktop/components/apple-mark';
import { cn } from '@/shared/utils/cn';
type ShutdownScreenProps = { powerOn: () => void };
export function ShutdownScreen({ powerOn }: ShutdownScreenProps) {
  return (
    <main
      className={cn(
        'shutdown-screen',
        '[&.shutdown-screen]:fixed [&.shutdown-screen]:inset-0 [&.shutdown-screen]:z-3000 [&.shutdown-screen]:w-full [&.shutdown-screen]:h-full [&.shutdown-screen]:[border:0] [&.shutdown-screen]:text-[white] [&.shutdown-screen]:[background:#000] [&.shutdown-screen]:grid [&.shutdown-screen]:place-items-center',
        '[&.shutdown-screen_button]:flex [&.shutdown-screen_button]:flex-col [&.shutdown-screen_button]:items-center [&.shutdown-screen_button]:gap-3 [&.shutdown-screen_button]:[border:0] [&.shutdown-screen_button]:text-[oklch(1_0_0/0.78)] [&.shutdown-screen_button]:[background:transparent]',
        '[&.shutdown-screen_svg]:w-10 [&.shutdown-screen_svg]:h-10 [&.shutdown-screen_svg]:fill-[currentColor]',
        '[&.shutdown-screen_span]:text-[12px]',
      )}
    >
      <button type='button' onClick={powerOn}>
        <AppleMark />
        <span>Start Up</span>
      </button>
    </main>
  );
}
