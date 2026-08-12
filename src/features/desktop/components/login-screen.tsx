import { useClock } from '@/features/desktop/hooks/use-clock';
import { cn } from '@/shared/utils/cn';
import { PROFILE } from '@/shared/domain/constants/profile';
type LoginScreenProps = { enter: () => void };
export function LoginScreen({ enter }: LoginScreenProps) {
  const now = useClock();
  return (
    <button
      type='button'
      className='login-screen [&.login-screen]:absolute [&.login-screen]:inset-0 [&.login-screen]:z-1000 [&.login-screen]:w-full [&.login-screen]:h-full [&.login-screen]:flex [&.login-screen]:flex-col [&.login-screen]:items-center [&.login-screen]:[border:0] [&.login-screen]:text-[white] [&.login-screen]:[background:oklch(0.12_0.04_245/0.22)] [&.login-screen]:[backdrop-filter:blur(11px)_saturate(0.9)] [&.login-screen]:[text-shadow:0_2px_12px_oklch(0.08_0.03_245/0.4)] [&.login-screen]:cursor-default [&.login-screen]:animate-[login-in_500ms_ease-out_both]'
      onClick={enter}
      aria-label='Click to enter portfolio'
    >
      <div
        className={cn(
          'login-time',
          '[&.login-time]:flex [&.login-time]:flex-col [&.login-time]:items-center [&.login-time]:mt-[17vh]',
          '[&.login-time_span]:text-[22px] [&.login-time_span]:font-[550]',
          '[&.login-time_strong]:mt-0.75 [&.login-time_strong]:text-[clamp(4.5rem,8vw,6rem)] [&.login-time_strong]:leading-none [&.login-time_strong]:tracking-[-0.04em] [&.login-time_strong]:font-[650] [&.login-time_strong]:[font-variant-numeric:tabular-nums]',
          'max-[600px]:[&.login-time_span]:text-[18px]',
        )}
      >
        <span>
          {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <strong>
          {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </strong>
      </div>
      <div
        className={cn(
          'login-user',
          '[&.login-user]:flex [&.login-user]:flex-col [&.login-user]:items-center [&.login-user]:mt-auto [&.login-user]:mb-[12vh]',
          '[&.login-user_strong]:text-[15px]',
          '[&.login-user_small]:mt-2 [&.login-user_small]:text-[13px]',
        )}
      >
        <span className='login-avatar [&.login-avatar]:w-24 [&.login-avatar]:h-24 [&.login-avatar]:grid [&.login-avatar]:place-items-center [&.login-avatar]:mb-2.5 [&.login-avatar]:rounded-[50%] [&.login-avatar]:text-[white] [&.login-avatar]:[background:linear-gradient(145deg,oklch(0.75_0.17_70),oklch(0.48_0.18_245))] [&.login-avatar]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.45),0_9px_28px_oklch(0.08_0.03_245/0.25)] [&.login-avatar]:text-[34px] [&.login-avatar]:font-[650]'>
          {PROFILE.initial}
        </span>
        <strong>{PROFILE.firstName}</strong>
        <small>Click to log in</small>
      </div>
    </button>
  );
}
