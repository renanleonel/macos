import { MessageCircle, Moon, Sparkles } from 'lucide-react';
import { useClock } from '@/features/desktop/hooks/use-clock';
import { cn } from '@/shared/utils/cn';
type NotificationCenterProps = { doNotDisturb: boolean };
const notificationClass =
  '[&.notification]:flex [&.notification]:gap-2.5 [&.notification]:mt-2.25 [&.notification]:p-3 [&.notification]:rounded-[15px] [&.notification]:[background:var(--glass-regular)] [&.notification]:[backdrop-filter:blur(38px)_saturate(1.45)] [&.notification]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_8px_20px_oklch(0.08_0.03_245/0.2)] [&.notification]:[-webkit-backdrop-filter:blur(38px)_saturate(1.45)] [&.notification_div]:relative [&.notification_div]:flex-1 [&.notification_small]:absolute [&.notification_small]:top-0 [&.notification_small]:right-0 [&.notification_small]:text-[oklch(0.5_0.01_250)] [&.notification_p]:m-[4px_0_0] [&.notification_p]:text-[12px] [&.notification_p]:leading-[1.35] [&.notification.is-silenced]:opacity-[0.64]';
export function NotificationCenter({ doNotDisturb }: NotificationCenterProps) {
  const now = useClock();
  return (
    <aside className='notification-center [&.notification-center]:fixed [&.notification-center]:z-800 [&.notification-center]:rounded-[11px] [&.notification-center]:[background:transparent] [&.notification-center]:[backdrop-filter:none] [&.notification-center]:[box-shadow:none] [&.notification-center]:top-8.25 [&.notification-center]:right-3 [&.notification-center]:w-85 [&.notification-center]:p-3'>
      <div
        className={cn(
          'notification-date',
          '[&.notification-date]:p-[10px_8px] [&.notification-date]:text-[white] [&.notification-date]:[text-shadow:0_2px_6px_oklch(0.1_0.03_245/0.45)]',
          '[&.notification-date_span]:block [&.notification-date_span]:text-[22px] [&.notification-date_span]:font-[650]',
          '[&.notification-date_strong]:text-[58px] [&.notification-date_strong]:leading-[0.95]',
        )}
      >
        <span>{now.toLocaleDateString('en-US', { weekday: 'long' })}</span>
        <strong>{now.getDate()}</strong>
      </div>
      {doNotDisturb ? (
        <div
          className={cn(
            'focus-notice',
            '[&.focus-notice]:flex [&.focus-notice]:items-center [&.focus-notice]:gap-2.5 [&.focus-notice]:m-[0_0_9px] [&.focus-notice]:p-[11px_12px] [&.focus-notice]:rounded-[15px] [&.focus-notice]:text-(--label-primary) [&.focus-notice]:[background:var(--glass-regular)] [&.focus-notice]:[backdrop-filter:blur(38px)_saturate(1.45)] [&.focus-notice]:[box-shadow:inset_0_0_0_1px_var(--glass-stroke),inset_0_1px_var(--glass-highlight),0_8px_20px_oklch(0.08_0.03_245/0.2)]',
            '[&.focus-notice_>_span]:w-8.5 [&.focus-notice_>_span]:h-8.5 [&.focus-notice_>_span]:flex-[0_0_34px] [&.focus-notice_>_span]:grid [&.focus-notice_>_span]:place-items-center [&.focus-notice_>_span]:rounded-[50%] [&.focus-notice_>_span]:text-[white] [&.focus-notice_>_span]:[background:#7265d8]',
            '[&.focus-notice_strong]:text-[13px]',
            '[&.focus-notice_p]:m-[2px_0_0] [&.focus-notice_p]:text-(--label-secondary) [&.focus-notice_p]:text-[12px]',
          )}
        >
          <span>
            <Moon size={18} fill='currentColor' />
          </span>
          <div>
            <strong>Do Not Disturb</strong>
            <p>Notifications are silenced.</p>
          </div>
        </div>
      ) : null}
      <div className={cn(`notification${doNotDisturb ? ' is-silenced' : ''}`, notificationClass)}>
        <span className='notification-icon [&.notification-icon]:w-8.5 [&.notification-icon]:h-8.5 [&.notification-icon]:flex-[0_0_34px] [&.notification-icon]:grid [&.notification-icon]:place-items-center [&.notification-icon]:rounded-lg [&.notification-icon]:text-[white] [&.notification-icon]:[background:linear-gradient(145deg,oklch(0.72_0.19_75),oklch(0.58_0.22_330))]'>
          <Sparkles size={18} />
        </span>
        <div>
          <strong>Portfolio</strong>
          <small>Now</small>
          <p>Welcome. Double-click a file or choose an app from the Dock.</p>
        </div>
      </div>
      <div className={cn(`notification${doNotDisturb ? ' is-silenced' : ''}`, notificationClass)}>
        <span
          className={cn(
            'notification-icon',
            'notification-icon--messages',
            '[&.notification-icon]:w-8.5 [&.notification-icon]:h-8.5 [&.notification-icon]:flex-[0_0_34px] [&.notification-icon]:grid [&.notification-icon]:place-items-center [&.notification-icon]:rounded-lg [&.notification-icon]:text-[white] [&.notification-icon]:[background:linear-gradient(145deg,oklch(0.72_0.19_75),oklch(0.58_0.22_330))]',
            '[&.notification-icon--messages]:[background:oklch(0.68_0.22_145)]',
          )}
        >
          <MessageCircle size={18} />
        </span>
        <div>
          <strong>Messages</strong>
          <small>10m ago</small>
          <p>There’s always room for another good idea.</p>
        </div>
      </div>
    </aside>
  );
}
