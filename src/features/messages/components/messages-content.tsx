import { Plus, Search, Send } from 'lucide-react';
import type { FormEvent } from 'react';

import { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';
import type { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageContact } from '@/features/messages/domain/models/message-contact';
import type { MessageConversation } from '@/features/messages/domain/models/message-conversation';
import { cn } from '@/shared/utils/cn';

type MessagesContentProps = {
  contacts: MessageContact[];
  conversation: MessageConversation;
  draft: string;
  query: string;
  selectedContact: MessageContact;
  sentMessages: string[];
  onDraftChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onSelectContact: (contactId: MessageContactId) => void;
  onSend: () => void;
};

const AVATAR_CLASS_NAME =
  '[&.avatar]:w-9 [&.avatar]:h-9 [&.avatar]:flex-[0_0_36px] [&.avatar]:grid [&.avatar]:place-items-center [&.avatar]:rounded-[50%] [&.avatar]:text-[white] [&.avatar]:[background:linear-gradient(145deg,oklch(0.79_0.17_70),oklch(0.57_0.18_22))] [&.avatar]:font-bold';

export function MessagesContent({
  contacts,
  conversation,
  draft,
  query,
  selectedContact,
  sentMessages,
  onDraftChange,
  onQueryChange,
  onSelectContact,
  onSend,
}: MessagesContentProps) {
  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  return (
    <div
      className={cn(
        'messages-app',
        '[&.messages-app]:h-full [&.messages-app]:min-h-0 [&.messages-app]:flex [&.messages-app]:text-[oklch(0.21_0.01_250)] [&.messages-app]:[background:var(--material-content)]',
        '[&.messages-app_>_aside]:w-61.25 [&.messages-app_>_aside]:min-h-0 [&.messages-app_>_aside]:flex [&.messages-app_>_aside]:flex-[0_0_245px] [&.messages-app_>_aside]:flex-col [&.messages-app_>_aside]:overflow-hidden [&.messages-app_>_aside]:p-[10px_8px] [&.messages-app_>_aside]:[border-right:1px_solid_var(--separator)] [&.messages-app_>_aside]:[background:var(--material-sidebar)] [&.messages-app_>_aside]:[backdrop-filter:blur(32px)_saturate(1.35)] [&.messages-app_>_aside]:[-webkit-backdrop-filter:blur(32px)_saturate(1.35)]',
        '[&.messages-app_.messages-contact-list]:min-h-0 [&.messages-app_.messages-contact-list]:overflow-y-auto',
        '[&.messages-app_.messages-contact-list_button]:w-full [&.messages-app_.messages-contact-list_button]:flex [&.messages-app_.messages-contact-list_button]:items-center [&.messages-app_.messages-contact-list_button]:gap-2.25 [&.messages-app_.messages-contact-list_button]:p-2.25 [&.messages-app_.messages-contact-list_button]:[border:0] [&.messages-app_.messages-contact-list_button]:rounded-lg [&.messages-app_.messages-contact-list_button]:[background:transparent] [&.messages-app_.messages-contact-list_button]:text-left',
        '[&.messages-app_.messages-contact-list_button:hover]:[background:oklch(0.5_0.01_250/0.09)]',
        '[&.messages-app_.messages-contact-list_button.selected]:text-[white] [&.messages-app_.messages-contact-list_button.selected]:[background:var(--system-blue)]',
        '[&.messages-app_.messages-contact-list_button.selected:hover]:[background:var(--system-blue-deep)]',
        '[&.messages-app_.messages-contact-list_button_>_span:last-child]:min-w-0 [&.messages-app_.messages-contact-list_button_>_span:last-child]:flex [&.messages-app_.messages-contact-list_button_>_span:last-child]:flex-col',
        '[&.messages-app_aside_small]:overflow-hidden [&.messages-app_aside_small]:whitespace-nowrap [&.messages-app_aside_small]:text-ellipsis [&.messages-app_aside_small]:opacity-[0.72]',
        '[&.messages-app_main]:min-w-0 [&.messages-app_main]:min-h-0 [&.messages-app_main]:flex-1 [&.messages-app_main]:flex [&.messages-app_main]:flex-col [&.messages-app_main]:[background:var(--material-content)]',
        '[&.messages-app_main_>_header]:h-16.5 [&.messages-app_main_>_header]:flex-[0_0_66px] [&.messages-app_main_>_header]:flex [&.messages-app_main_>_header]:items-center [&.messages-app_main_>_header]:justify-center [&.messages-app_main_>_header]:[border-bottom:1px_solid_var(--separator)]',
        '[&.messages-app_.conversation-title]:max-w-[calc(100%-32px)] [&.messages-app_.conversation-title]:flex [&.messages-app_.conversation-title]:items-center [&.messages-app_.conversation-title]:gap-2.5',
        '[&.messages-app_.conversation-title_.avatar]:w-10.5 [&.messages-app_.conversation-title_.avatar]:h-10.5 [&.messages-app_.conversation-title_.avatar]:flex-[0_0_42px]',
        '[&.messages-app_.conversation-title-copy]:min-w-0 [&.messages-app_.conversation-title-copy]:flex [&.messages-app_.conversation-title-copy]:flex-col [&.messages-app_.conversation-title-copy]:items-start',
        '[&.messages-app_.conversation-title-copy_strong]:leading-4.5 [&.messages-app_.conversation-title-copy_small]:max-w-full [&.messages-app_.conversation-title-copy_small]:overflow-hidden [&.messages-app_.conversation-title-copy_small]:text-ellipsis [&.messages-app_.conversation-title-copy_small]:leading-4 [&.messages-app_.conversation-title-copy_small]:whitespace-nowrap [&.messages-app_.conversation-title-copy_small]:text-[oklch(0.5_0.01_250)]',
        '[&.messages-app_.conversation]:min-h-0',
        '[&.messages-app_form]:flex [&.messages-app_form]:flex-[0_0_auto] [&.messages-app_form]:items-center [&.messages-app_form]:gap-1.75 [&.messages-app_form]:p-[10px_14px]',
        '[&.messages-app_form_input]:flex-1 [&.messages-app_form_input]:h-8.25 [&.messages-app_form_input]:p-[0_13px] [&.messages-app_form_input]:[border:0] [&.messages-app_form_input]:rounded-[999px] [&.messages-app_form_input]:[outline:none] [&.messages-app_form_input]:[background:oklch(1_0_0/0.72)] [&.messages-app_form_input]:[box-shadow:inset_0_0_0_1px_oklch(0.36_0.01_250/0.2),inset_0_1px_oklch(1_0_0/0.7)]',
        '[&.messages-app_form_input:focus-visible]:[box-shadow:inset_0_0_0_1px_var(--system-blue),0_0_0_2px_oklch(0.67_0.17_245/0.28)]',
        '[&.messages-app_form_button]:w-7 [&.messages-app_form_button]:h-7 [&.messages-app_form_button]:grid [&.messages-app_form_button]:place-items-center [&.messages-app_form_button]:p-0 [&.messages-app_form_button]:[border:0] [&.messages-app_form_button]:rounded-[50%] [&.messages-app_form_button]:text-[white] [&.messages-app_form_button]:[background:var(--system-blue)]',
        '[&.messages-app_form_button:disabled]:cursor-default [&.messages-app_form_button:disabled]:[background:var(--label-quaternary)]',
        'max-[900px]:[&.messages-app_>_aside]:w-41.25 max-[900px]:[&.messages-app_>_aside]:basis-41.25',
        'max-[600px]:[&.messages-app_>_aside]:hidden',
      )}
    >
      <aside>
        <label className='messages-search [&.messages-search]:h-6.75 [&.messages-search]:flex [&.messages-search]:flex-[0_0_auto] [&.messages-search]:items-center [&.messages-search]:gap-1.5 [&.messages-search]:m-[0_5px_8px] [&.messages-search]:p-[0_9px] [&.messages-search]:rounded-[7px] [&.messages-search]:text-[oklch(0.42_0.01_250)] [&.messages-search]:[background:oklch(0.85_0.01_250/0.7)] [&.messages-search]:text-[12px] [&.messages-search:focus-within]:[box-shadow:0_0_0_2px_oklch(0.67_0.17_245/0.32)]'>
          <Search aria-hidden='true' size={14} />
          <input
            aria-label='Search conversations'
            className='min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[oklch(0.28_0.01_250)] outline-none placeholder:text-[oklch(0.42_0.01_250)] focus-visible:outline-none! focus-visible:outline-offset-0!'
            placeholder='Search'
            type='search'
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>
        <div className='messages-contact-list'>
          {contacts.length ? (
            contacts.map((contact) => (
              <button
                type='button'
                aria-pressed={contact.id === selectedContact.id}
                className={contact.id === selectedContact.id ? 'selected' : undefined}
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
              >
                <span
                  className={cn(
                    'avatar',
                    AVATAR_CLASS_NAME,
                    contact.avatarVariant === MessageAvatarVariant.BLUE && 'avatar--blue',
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
            ))
          ) : (
            <p className='px-3 py-4 text-center text-xs text-[oklch(0.48_0.01_250)]' role='status'>
              No conversations found
            </p>
          )}
        </div>
      </aside>
      <main>
        <header>
          <div className='conversation-title'>
            <span
              className={cn(
                'avatar',
                AVATAR_CLASS_NAME,
                selectedContact.avatarVariant === MessageAvatarVariant.BLUE && 'avatar--blue',
                selectedContact.avatarVariant === MessageAvatarVariant.BLUE &&
                  '[&.avatar--blue]:[background:linear-gradient(145deg,oklch(0.76_0.14_225),oklch(0.55_0.2_260))]',
              )}
            >
              {selectedContact.avatar}
            </span>
            <span className='conversation-title-copy'>
              <strong>{selectedContact.name}</strong>
              <small>{conversation.address}</small>
            </span>
          </div>
        </header>
        <div className='conversation [&.conversation]:flex-1 [&.conversation]:p-5 [&.conversation]:overflow-auto [&.conversation]:flex [&.conversation]:flex-col [&.conversation]:items-start [&.conversation_time]:self-center [&.conversation_time]:mb-3.5 [&.conversation_time]:text-[oklch(0.55_0.01_250)] [&.conversation_time]:text-[10px]'>
          <time>{conversation.timestamp}</time>
          {conversation.incomingMessages.map((message) => (
            <p
              className='bubble bubble--incoming [&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]'
              key={message}
            >
              {message}
            </p>
          ))}
          {sentMessages.map((message, index) => (
            <p
              className={cn(
                'bubble',
                'bubble--sent',
                '[&.bubble]:max-w-[70%] [&.bubble]:m-[2px_0] [&.bubble]:p-[8px_12px] [&.bubble]:rounded-2xl [&.bubble]:[background:oklch(0.91_0.008_250)] [&.bubble]:text-[13px]',
                '[&.bubble--sent]:self-end [&.bubble--sent]:text-[white] [&.bubble--sent]:[background:var(--system-blue-deep)]',
              )}
              key={`${message}-${index}`}
            >
              {message}
            </p>
          ))}
        </div>
        <form onSubmit={submitMessage}>
          <button type='button' aria-label='Add attachment'>
            <Plus size={18} />
          </button>
          <input
            aria-label='Message'
            placeholder='iMessage'
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
          />
          <button aria-label='Send message' disabled={!draft.trim()} type='submit'>
            <Send size={16} />
          </button>
        </form>
      </main>
    </div>
  );
}
