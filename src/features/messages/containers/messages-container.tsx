import { useState } from 'react';

import { MessagesContent } from '@/features/messages/components/messages-content';

export function MessagesContainer() {
  const [sent, setSent] = useState(false);

  return <MessagesContent sent={sent} onSend={() => setSent(true)} />;
}
