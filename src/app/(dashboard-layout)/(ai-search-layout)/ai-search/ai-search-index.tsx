'use client';

import { Button } from '@/components/atom/button';
import { PiPlus, PiChatCircle } from 'react-icons/pi';
import { useNewChat } from '@/hooks/use-new-chat';

interface AiSearchIndexProps {
  onCreateNewChat?: (chatId: string) => void;
}

export function AiSearchIndex({ onCreateNewChat }: AiSearchIndexProps) {
  const { handleNewChat, isCreatingChat, error } = useNewChat({
    onCreateSuccess: onCreateNewChat,
    redirectToChat: true,
  });

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
      <div className="text-center max-w-md">
        {/* Welcome Message */}
        <div className="mb-8">
          <PiChatCircle className="mx-auto text-6xl text-gray-300 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to Veraos AI Search
          </h1>
          <p className="text-gray-600">
            Start a new conversation to begin your search using natural language.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* New Chat Button */}
        <Button
          onClick={handleNewChat}
          disabled={isCreatingChat}
          className="flex items-center gap-2 px-6 py-3"
          size="lg"
        >
          {isCreatingChat ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating...
            </>
          ) : (
            <>
              <PiPlus className="text-lg" />
              Start New Chat
            </>
          )}
        </Button>

        {/* Additional Info */}
        <div className="mt-6 text-sm text-gray-500">
          <p>Veraos understands context, not just keywords.</p>
          <p>Begin your search using natural language.</p>
        </div>
      </div>
    </div>
  );
}

export default AiSearchIndex;
