'use client';

import { Sidebar } from './sidebar';
import { createContext, useContext, useState } from 'react';
import { IsExpandedType } from '@/lib/hooks/use-sidebar-expand';

interface MessageContextType {
  onNewMessage: (message: { chatId: string; message: string }) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
}

interface ClientLayoutProps {
  children: React.ReactNode;
  isExpanded: IsExpandedType;
}

export function ClientLayout({ children, isExpanded }: ClientLayoutProps) {
  const [lastMessage, setLastMessage] = useState<{ chatId: string; message: string } | null>(null);

  const onNewMessage = (message: { chatId: string; message: string }) => {
    setLastMessage(message);
  };

  return (
    <MessageContext.Provider value={{ onNewMessage }}>
      <div>
        <Sidebar isExpanded={isExpanded} lastMessage={lastMessage} />
        {children}
      </div>
    </MessageContext.Provider>
  );
} 