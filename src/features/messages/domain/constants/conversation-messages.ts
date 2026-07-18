import { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageConversation } from '@/features/messages/domain/models/message-conversation';

export const MESSAGE_CONVERSATIONS: Record<MessageContactId, MessageConversation> = {
  [MessageContactId.RENAN]: {
    address: 'renan@example.com',
    timestamp: 'Today 10:09 AM',
    incomingMessages: [
      'Hey! Thanks for exploring my desktop.',
      'Want to build something thoughtful together?',
    ],
  },
  [MessageContactId.WORK]: {
    address: 'work@example.com',
    timestamp: 'Today 9:42 AM',
    incomingMessages: [
      'The three project files are ready.',
      'Open Finder whenever you want to review them.',
    ],
  },
};
