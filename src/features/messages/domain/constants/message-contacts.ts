import { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';
import { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageContact } from '@/features/messages/domain/models/message-contact';
import { PROFILE } from '@/shared/domain/constants/profile';

export const MESSAGE_CONTACTS: MessageContact[] = [
  {
    id: MessageContactId.RENAN,
    name: PROFILE.name,
    preview: 'Ready when you are.',
    avatar: PROFILE.initial,
    avatarVariant: MessageAvatarVariant.ORANGE,
  },
];
