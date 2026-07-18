import { Search, Send } from 'lucide-react';
import type { FormEvent } from 'react';

import {
  INCOMING_MESSAGES,
  SENT_MESSAGE,
} from '@/features/messages/domain/constants/conversation-messages';
import { MESSAGE_CONTACTS } from '@/features/messages/domain/constants/message-contacts';
import { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';
import { cn } from '@/shared/utils/cn';

type MessagesContentProps = {
  sent: boolean;
  onSend: () => void;
};

export function MessagesContent({ sent, onSend }: MessagesContentProps) {
  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  return (
    <div
      className={cn(
        'messages-app',
        '[&.messages-app]:h-full [&.messages-app]:flex [&.messages-app]:text-[oklch(0.21_0.01_250)] [&.messages-app]:[background:var(--material-content)]',
        '[&.messages-app_>_aside]:w-61.25 [&.messages-app_>_aside]:flex-[0_0_245px] [&.messages-app_>_aside]:p-[10px_8px] [&.messages-app_>_aside]:[border-right:1px_solid_var(--separator)] [&.messages-app_>_aside]:[background:linear-gradient(135deg,oklch(1_0_0/0.24),transparent_52%),var(--material-sidebar)] [&.messages-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.messages-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]',
        '[&.messages-app_aside_button]:w-full [&.messages-app_aside_button]:flex [&.messages-app_aside_button]:items-center [&.messages-app_aside_button]:gap-2.25 [&.messages-app_aside_button]:p-2.25 [&.messages-app_aside_button]:[border:0] [&.messages-app_aside_button]:rounded-lg [&.messages-app_aside_button]:[background:transparent] [&.messages-app_aside_button]:text-left',
        '[&.messages-app_aside_button.selected]:text-[white] [&.messages-app_aside_button.selected]:[background:var(--system-blue)]',
        '[&.messages-app_aside_button_>_span:last-child]:min-w-0 [&.messages-app_aside_button_>_span:last-child]:flex [&.messages-app_aside_button_>_span:last-child]:flex-col',
        '[&.messages-app_aside_small]:overflow-hidden [&.messages-app_aside_small]:whitespace-nowrap [&.messages-app_aside_small]:text-ellipsis [&.messages-app_aside_small]:opacity-[0.72]',
        '[&.messages-app_main]:min-w-0 [&.messages-app_main]:flex-1 [&.messages-app_main]:flex [&.messages-app_main]:flex-col [&.messages-app_main]:[background:var(--material-content)]',
        '[&.messages-app_main_>_header]:h-16.5 [&.messages-app_main_>_header]:flex-[0_0_66px] [&.messages-app_main_>_header]:flex [&.messages-app_main_>_header]:flex-col [&.messages-app_main_>_header]:items-center [&.messages-app_main_>_header]:justify-center [&.messages-app_main_>_header]:[border-bottom:1px_solid_var(--separator)]',
        '[&.messages-app_main_header_.avatar]:absolute [&.messages-app_main_header_.avatar]:transform-[translateX(-58px)] [&.messages-app_main_header_.avatar]:w-10.5 [&.messages-app_main_header_.avatar]:h-10.5',
        '[&.messages-app_main_header_small]:text-[oklch(0.5_0.01_250)]',
        '[&.messages-app_form]:flex [&.messages-app_form]:items-center [&.messages-app_form]:gap-1.75 [&.messages-app_form]:p-[10px_14px]',
        '[&.messages-app_form_input]:flex-1 [&.messages-app_form_input]:h-8.25 [&.messages-app_form_input]:p-[0_13px] [&.messages-app_form_input]:[border:0] [&.messages-app_form_input]:rounded-[999px] [&.messages-app_form_input]:[outline:none] [&.messages-app_form_input]:[background:oklch(1_0_0/0.72)] [&.messages-app_form_input]:[box-shadow:inset_0_0_0_1px_oklch(0.36_0.01_250/0.2),inset_0_1px_oklch(1_0_0/0.7)]',
        '[&.messages-app_form_button]:w-7 [&.messages-app_form_button]:h-7 [&.messages-app_form_button]:grid [&.messages-app_form_button]:place-items-center [&.messages-app_form_button]:p-0 [&.messages-app_form_button]:[border:0] [&.messages-app_form_button]:rounded-[50%] [&.messages-app_form_button]:text-[white] [&.messages-app_form_button]:[background:var(--system-blue)]',
        'max-[900px]:[&.messages-app_>_aside]:w-41.25 max-[900px]:[&.messages-app_>_aside]:basis-41.25',
        'max-[600px]:[&.messages-app_>_aside]:hidden',
      )}
    >
      <aside>
        <div className='messages-search [&.messages-search]:h-6.75 [&.messages-search]:flex [&.messages-search]:items-center [&.messages-search]:gap-1.5 [&.messages-search]:m-[0_5px_8px] [&.messages-search]:p-[0_9px] [&.messages-search]:rounded-[7px] [&.messages-search]:text-[oklch(0.48_0.01_250)] [&.messages-search]:[background:oklch(0.85_0.01_250/0.7)] [&.messages-search]:text-[12px]'>
          <Search size={14} />
          Search
        </div>
        {MESSAGE_CONTACTS.map((contact, index) => (
          <button type='button' className={index === 0 ? 'selected' : undefined} key={contact.id}>
            <span
              className={cn(
                'avatar',
                contact.avatarVariant === MessageAvatarVariant.BLUE && 'avatar--blue',
                '[&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold',
                contact.avatarVariant === MessageAvatarVariant.BLUE &&
                  '[&.avatar--blue]:[background:linear-gradient(145deg,oklch(0.76_0.14_225),oklch(0.55_0.2_260))]',
              )}
            >
              {contact.avatar}
            </span>
            <span>
              <strong>{contact.name}</strong>
              <small>{contact.preview}</small>
            </span>
          </button>
        ))}
      </aside>
      <main>
        <header>
          <span className='avatar [&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold'>
            R
          </span>
          <strong>Renan</strong>
          <small>renan@example.com</small>
        </header>
        <div className='conversation [&.conversation]:flex-1 [&.conversation]:p-5 [&.conversation]:overflow-auto [&.conversation]:flex [&.conversation]:flex-col [&.conversation]:items-start [&.conversation_time]:self-center [&.conversation_time]:mb-3.5 [&.conversation_time]:text-[oklch(0.55_0.01_250)] [&.conversation_time]:text-[10px]'>
          <time>Today 10:09 AM</time>
          {INCOMING_MESSAGES.map((message) => (
            <p
              className='bubble bubble--incoming [&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]'
              key={message}
            >
              {message}
            </p>
          ))}
          {sent ? (
            <p
              className={cn(
                'bubble',
                'bubble--sent',
                '[&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]',
                '[&.bubble--sent]:self-end [&.bubble--sent]:text-[white] [&.bubble--sent]:[background:var(--system-blue-deep)]',
              )}
            >
              {SENT_MESSAGE}
            </p>
          ) : null}
        </div>
        <form onSubmit={submitMessage}>
          <button type='button' aria-label='Add attachment'>
            ＋
          </button>
          <input aria-label='Message' placeholder='iMessage' />
          <button aria-label='Send message' type='submit'>
            <Send size={16} />
          </button>
        </form>
      </main>
    </div>
  );
}
