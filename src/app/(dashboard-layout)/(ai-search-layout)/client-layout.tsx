'use client';

import {Sidebar} from './sidebar';
import {createContext, useContext, useState} from 'react';
import {IsExpandedType} from '@/lib/hooks/use-sidebar-expand';
import {useSearchParams} from 'next/navigation';

interface MessageContextType {
    onNewMessage: (message: { chatId: string; message: string }) => void;
    onNewChat: (chatId: string) => void;
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

export function ClientLayout({children, isExpanded}: ClientLayoutProps) {
    const [lastMessage, setLastMessage] = useState<{ chatId: string; message: string } | null>(null);
    const [newChatId, setNewChatId] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');
    const query = searchParams.get('query');

    const onNewMessage = (message: { chatId: string; message: string }) => {
        setLastMessage(message);
    };

    const onNewChat = (chatId: string) => {
        setNewChatId(chatId);
    };

    // On mobile: show sidebar full screen when no chatId/query, show conversation when chatId exists
    const showSidebarFullScreen = !chatId && !query;
    const showConversation = chatId || query;

    return (
        <MessageContext.Provider value={{
            onNewMessage,
            onNewChat
        }}>
            <div className="relative w-full">
                    {/* Sidebar - full screen on mobile when no conversation selected, normal on desktop */}
                    <div className={showSidebarFullScreen ? 'block sm:block' : 'hidden sm:block'}>
                        <Sidebar
                            isExpanded={isExpanded}
                            lastMessage={lastMessage}
                            newChatId={newChatId}
                        />
                    </div>

                    {/* Conversation content - only show on mobile when chatId exists */}
                    <div className={showConversation ? 'block w-full' : 'hidden sm:block w-full'}>
                        {children}
                    </div>
                </div>
        </MessageContext.Provider>
    );
} 