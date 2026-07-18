import type { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';

import type { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';

export type MessageContact = {
  id: MessageContactId;
  name: string;
  preview: string;
  avatar: string;
  avatarVariant: MessageAvatarVariant;
};
