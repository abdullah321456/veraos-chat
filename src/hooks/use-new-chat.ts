import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/apiService';
import { ROUTES } from '@/config/routes';

interface UseNewChatOptions {
  onCreateSuccess?: (chatId: string) => void;
  onError?: (error: string) => void;
  redirectToChat?: boolean;
}

export function useNewChat(options: UseNewChatOptions = {}) {
  const { onCreateSuccess, onError, redirectToChat = true } = options;
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNewChat = useCallback(async () => {
    if (isCreatingChat) return; // Prevent multiple calls

    try {
      setIsCreatingChat(true);
      setError(null);
      
      console.log('Creating new chat...');
      
      // Create a new chat via API
      const response = await apiService.postData('/chat', {});
      const newChatId = response.data._id;
      
      console.log('New chat created with ID:', newChatId);

      // Call success callback if provided
      if (onCreateSuccess) {
        onCreateSuccess(newChatId);
      }

      // Navigate to AI Search with the new chatId if redirect is enabled
      if (redirectToChat) {
        console.log('Navigating to new chat:', newChatId);
        router.push(`${ROUTES.AI_SEARCH.INDEX}?chatId=${newChatId}`);
      }

      return newChatId;

    } catch (error) {
      const errorMessage = 'Failed to create new chat. Please try again.';
      console.error('Error creating new chat:', error);
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      throw error;
    } finally {
      setIsCreatingChat(false);
    }
  }, [isCreatingChat, router, onCreateSuccess, onError, redirectToChat]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    handleNewChat,
    isCreatingChat,
    error,
    clearError,
  };
}
