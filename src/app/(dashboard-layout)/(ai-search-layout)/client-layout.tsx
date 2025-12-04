'use client';

import {Sidebar} from './sidebar';
import {createContext, useContext, useState, Suspense} from 'react';
import {IsExpandedType} from '@/lib/hooks/use-sidebar-expand';
import {useSearchParams} from 'next/navigation';
import cn from '@/lib/utils/cn';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

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

function ClientLayoutContent({children, isExpanded}: ClientLayoutProps) {
    const [lastMessage, setLastMessage] = useState<{ chatId: string; message: string } | null>(null);
    const [newChatId, setNewChatId] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const chatId = searchParams.get('chatId');
    const query = searchParams.get('query');
    const { isDarkMode } = useDarkMode();

    const onNewMessage = (message: { chatId: string; message: string }) => {
        setLastMessage(message);
    };

    const onNewChat = (chatId: string) => {
        setNewChatId(chatId);
    };

    // On mobile: show sidebar full screen when no chatId/query, show conversation when chatId exists
    const showSidebarFullScreen = !chatId && !query;
    const showConversation = chatId || query;

    const backgroundStyle = isDarkMode 
        ? { background: 'linear-gradient(143.11deg, #22252A 4.37%, #1F2736 78.56%)' }
        : { background: 'white' };

    console.log("ClientLayoutContent = ",isDarkMode)

    return (
        <MessageContext.Provider value={{
            onNewMessage,
            onNewChat
        }}>
            <div className="w-full overflow-x-hidden sm:border sm:border-transparent sm:rounded-[20px] sm:relative sm:overflow-hidden sm:-mt-[15px] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-90px)] sm:max-h-[calc(100vh-90px)]"
                 style={backgroundStyle}>
                    {/* Sidebar - full screen on mobile when no conversation selected, normal on desktop */}
                    <div className={showSidebarFullScreen ? 'block sm:block' : 'hidden sm:block'}>
                        <Sidebar
                            isExpanded={isExpanded}
                            lastMessage={lastMessage}
                            newChatId={newChatId}
                        />
                    </div>

                    {/* Conversation content - only show on mobile when chatId exists */}
                <div className={cn(
                    showConversation ? 'block' : 'hidden sm:block',
                    'w-full overflow-x-hidden',
                    'sm:ml-[325px] sm:relative sm:z-0'
                )}>
                        {children}
                    </div>
                </div>
        </MessageContext.Provider>
    );
}

export function ClientLayout({children, isExpanded}: ClientLayoutProps) {
    return (
        <Suspense fallback={
            <div className="w-full overflow-x-hidden sm:border sm:border-transparent sm:rounded-[20px] sm:relative sm:overflow-hidden sm:-mt-[15px] min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-90px)] sm:max-h-[calc(100vh-90px)]"
                 style={{ background: 'white' }}>
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        }>
            <ClientLayoutContent isExpanded={isExpanded}>
                {children}
            </ClientLayoutContent>
        </Suspense>
    );
} 