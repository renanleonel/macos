import { useState } from 'react';

import { MessagesContent } from '@/features/messages/components/messages-content';
import { MESSAGE_CONVERSATIONS } from '@/features/messages/domain/constants/conversation-messages';
import { MESSAGE_CONTACTS } from '@/features/messages/domain/constants/message-contacts';
import { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';

type SentMessagesByContact = Partial<Record<MessageContactId, string[]>>;

export function MessagesContainer() {
  const [selectedContactId, setSelectedContactId] = useState(MessageContactId.RENAN);
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [sentMessagesByContact, setSentMessagesByContact] = useState<SentMessagesByContact>({});

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleContacts = MESSAGE_CONTACTS.filter((contact) => {
    if (!normalizedQuery) {
      return true;
    }

    const conversation = MESSAGE_CONVERSATIONS[contact.id];
    const searchableText = [
      contact.name,
      contact.preview,
      conversation.address,
      ...conversation.incomingMessages,
      ...(sentMessagesByContact[contact.id] ?? []),
    ];

    return searchableText.some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
  });

  const selectedContact =
    MESSAGE_CONTACTS.find((contact) => contact.id === selectedContactId) ?? MESSAGE_CONTACTS[0];

  const sendMessage = () => {
    const message = draft.trim();

    if (!message) {
      return;
    }

    setSentMessagesByContact((currentMessages) => ({
      ...currentMessages,
      [selectedContactId]: [...(currentMessages[selectedContactId] ?? []), message],
    }));
    setDraft('');
  };

  return (
    <MessagesContent
      contacts={visibleContacts}
      conversation={MESSAGE_CONVERSATIONS[selectedContact.id]}
      draft={draft}
      query={query}
      selectedContact={selectedContact}
      sentMessages={sentMessagesByContact[selectedContact.id] ?? []}
      onDraftChange={setDraft}
      onQueryChange={setQuery}
      onSelectContact={setSelectedContactId}
      onSend={sendMessage}
    />
  );
}
