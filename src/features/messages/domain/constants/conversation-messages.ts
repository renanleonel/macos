import { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageConversation } from '@/features/messages/domain/models/message-conversation';
import { PROFILE } from '@/shared/domain/constants/profile';

export const MESSAGE_CONVERSATIONS: Record<MessageContactId, MessageConversation> = {
  [MessageContactId.RENAN]: {
    address: PROFILE.email,
    timestamp: 'Today 10:09 AM',
    incomingMessages: [
      'Hey! Thanks for exploring my desktop.',
      'This inbox is decorative — the fastest way to reach me is email or LinkedIn.',
      PROFILE.email,
    ],
  },
};
