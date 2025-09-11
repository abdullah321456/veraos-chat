# AI Search Index Component

This directory contains the AI Search functionality with a new chat creation system.

## Components

### `ai-search-index.tsx`
The main index component that displays when no chat is active. Features:
- Welcome screen with instructions
- "Start New Chat" button with loading states
- Error handling and user feedback
- Automatic navigation to new chat upon creation

### `use-new-chat.ts` (Custom Hook)
A reusable hook for creating new chats across the application.

#### Usage:
```tsx
import { useNewChat } from '@/hooks/use-new-chat';

function MyComponent() {
  const { handleNewChat, isCreatingChat, error, clearError } = useNewChat({
    onCreateSuccess: (chatId) => console.log('New chat created:', chatId),
    onError: (error) => console.error('Error:', error),
    redirectToChat: false, // Set to true for automatic navigation
  });

  return (
    <button onClick={handleNewChat} disabled={isCreatingChat}>
      {isCreatingChat ? 'Creating...' : 'New Chat'}
    </button>
  );
}
```

## API Integration

The `handleNewChat` function:
1. Makes a POST request to `/chat` endpoint
2. Creates a new chat session
3. Returns the new chat ID
4. Optionally navigates to the chat page
5. Handles errors gracefully

## Navigation Flow

1. User clicks "Start New Chat" button
2. New chat is created via API
3. User is redirected to `/ai-search?chatId={newChatId}`
4. Conversation component loads with the new chat

## Error Handling

- Network errors are caught and displayed to user
- Loading states prevent multiple simultaneous requests
- Clear error messages guide user actions
