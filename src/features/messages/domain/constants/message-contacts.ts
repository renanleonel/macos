import { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';
import { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageContact } from '@/features/messages/domain/models/message-contact';

export const MESSAGE_CONTACTS: MessageContact[] = [
  {
    id: MessageContactId.RENAN,
    name: 'Renan',
    preview: 'Ready when you are.',
    avatar: 'R',
    avatarVariant: MessageAvatarVariant.ORANGE,
  },
  {
    id: MessageContactId.WORK,
    name: 'Work',
    preview: 'Three project files',
    avatar: 'W',
    avatarVariant: MessageAvatarVariant.BLUE,
  },
];
