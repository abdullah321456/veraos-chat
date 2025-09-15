'use client';

import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { Input } from '@/components/atom/form-elements/input';
import { ROUTES } from '@/config/routes';
import { getIsSidebarExpandedOnClient, IsExpandedType, useSidebarExpand } from '@/lib/hooks/use-sidebar-expand';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react';
import { PiMagnifyingGlass, PiPencilLine, PiPlus } from 'react-icons/pi';
import { InboxSelection } from './inbox-select';
import { InboxNavigationData } from './types';
import { useConversationSidebarSelectionState } from './utils';
import { Button } from '@/components/atom/button';
import useQueryParams from '@/lib/hooks/use-query-params';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { apiService } from '@/services/apiService';

interface ApiConversation {
  _id: string;
  user: string;
  question_preview: string;
  message: string;
  timestamp: string;
  __v: number;
}

interface GroupedConversations {
  today: InboxNavigationData[];
  yesterday: InboxNavigationData[];
  lastWeek: InboxNavigationData[];
  lastMonth: InboxNavigationData[];
  older: InboxNavigationData[];
}

const groupConversationsByDate = (conversations: InboxNavigationData[]): GroupedConversations => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastMonth = new Date(today);
  lastMonth.setDate(lastMonth.getDate() - 30);

  const grouped = conversations.reduce((groups, conv) => {
    const convDate = new Date(conv.timestamp);

    if (convDate >= today) {
      groups.today.push(conv);
    } else if (convDate >= yesterday) {
      groups.yesterday.push(conv);
    } else if (convDate >= lastWeek) {
      groups.lastWeek.push(conv);
    } else if (convDate >= lastMonth) {
      groups.lastMonth.push(conv);
    } else {
      groups.older.push(conv);
    }

    return groups;
  }, {
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: []
  } as GroupedConversations);

  return grouped;
};

type Props = {
  isExpanded: IsExpandedType;
  lastMessage: { chatId: string; message: string } | null;
  newChatId: string | null;
};


export function Sidebar({ isExpanded, lastMessage, newChatId }: Props) {
  const { isExpanded: isExpandedState } = useSidebarExpand(isExpanded);
  const IS_SIDEBAR_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);
  const { isSelectable, setIsSelectable, selectedIds } = useConversationSidebarSelectionState();
  const [conversations, setConversations] = useState<InboxNavigationData[]>([]);
  const { setQueryParams, queryParams } = useQueryParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const hasFetched = useRef(false);
  const [isChatFetched,setIsChatFetched]=useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const hasHandledInitialNavigation = useRef(false);
  const hasCreatedChatForThisSession = useRef(false);
  const router = useRouter();
  const pathname = usePathname();


  const fetchConversations = async () => {
    try {
      console.log('Fetching conversations...');
      const data = await apiService.getData('/chat');

      const mappedConversations: InboxNavigationData[] = data.data.map((conv: ApiConversation) => ({
        id: conv._id,
        title: conv.question_preview,
        time: new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: conv.timestamp,
        description: conv.message,
      }));

      console.log('Fetched conversations:', mappedConversations);
      setConversations(mappedConversations);
      setIsChatFetched(true);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleNewChat = useCallback(async (isManualClick = false) => {
    if (isCreatingChat) return; // Prevent multiple calls
    
    // Only check the guard for automatic creation, not manual clicks
    if (!isManualClick && hasCreatedChatForThisSession.current) return;

    try {
      setIsCreatingChat(true);
      if (!isManualClick) {
        hasCreatedChatForThisSession.current = true; // Set guard only for automatic creation
      }
      console.log('Creating new chat...', isManualClick ? '(manual click)' : '(automatic)');
      const response = await apiService.postData('/chat', {});
      const newChatId = response.data._id;
      console.log('New chat created with ID:', newChatId);

      // Add the new chat to the conversations list
      const newChat: InboxNavigationData = {
        id: newChatId,
        title: 'New Chat',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
        description: 'Start a new conversation',
      };

      console.log('Adding new chat to conversations list:', newChat);
      setConversations(prev => [newChat, ...prev]);

      // Navigate to AI Search with the new chatId
      console.log('Navigating to new chat:', newChatId);
      router.push(`${ROUTES.AI_SEARCH.INDEX}?chatId=${newChatId}`);

    } catch (error) {
      console.error('Error creating new chat:', error);
      hasCreatedChatForThisSession.current = false; // Reset on error
    } finally {
      setIsCreatingChat(false);
    }
  }, [isCreatingChat, router]);

  // Reset the chat creation guard when user manually navigates to AI Search
  const resetChatCreationGuard = useCallback(() => {
    hasCreatedChatForThisSession.current = false;
    console.log('Chat creation guard reset - ready for new chat');
  }, []);

  const handleChatSelection = useCallback(async () => {
    const currentPathname = window.location.pathname;
    const isOnAiSearch = currentPathname === ROUTES.AI_SEARCH.INDEX;
    
    if (!isOnAiSearch || queryParams?.chatId) return;

    console.log('Handling chat selection on AI Search load:', { 
      conversationsLength: conversations.length,
      isOnAiSearch,
      hasChatId: !!queryParams?.chatId 
    });

    // Always create a new chat when AI Search page loads
    console.log('AI Search page loaded - creating new chat...');
    await handleNewChat();
  }, [conversations, queryParams?.chatId, router, handleNewChat]);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchConversations();
      hasFetched.current = true;
    }
  }, []);

  // Reset chat creation guard when navigating to AI Search
  useEffect(() => {
    if (pathname === ROUTES.AI_SEARCH.INDEX) {
      resetChatCreationGuard();
    }
  }, [pathname, resetChatCreationGuard]);

  // Create new chat every time AI Search page loads (no existing chatId)
  useEffect(() => {
    if (isChatFetched && pathname === ROUTES.AI_SEARCH.INDEX && !queryParams?.chatId && !hasCreatedChatForThisSession.current) {
      console.log('AI Search page loaded - creating new chat automatically');
      handleChatSelection();
    }
  }, [isChatFetched, pathname, queryParams?.chatId, handleChatSelection]);

  useEffect(() => {
    if (lastMessage) {
      setConversations(prev => prev.map(conv => {
        if (conv.id === lastMessage.chatId) {
          return {
            ...conv,
            title: lastMessage.message,
            description: lastMessage.message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: new Date().toISOString()
          };
        }
        return conv;
      }));
    }
  }, [lastMessage]);

  const handleDeleteChats = async () => {
    if (selectedIds.length === 0) return;

    try {
      setIsDeleting(true);
      await apiService.deleteData('/chat', { chatIds: selectedIds });

      // Check if all chats are being deleted
      const willDeleteAllChats = selectedIds.length === conversations.length;

      // Remove deleted conversations from the UI
      setConversations(prevConversations =>
          prevConversations.filter(conv => !selectedIds.includes(conv.id))
      );

      setIsSelectable(false);

      // If the current chat was deleted, clear the chatId from URL
      if (selectedIds.includes(queryParams.chatId)) {
        setQueryParams({ chatId: undefined });
      }

      // If all chats were deleted, automatically create a new chat
      if (willDeleteAllChats) {
        console.log('All chats deleted - creating new chat automatically');
        await handleNewChat(true); // Pass true to indicate this is a manual action
      }
    } catch (error) {
      console.error('Error deleting chats:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const groupedConversations = groupConversationsByDate(JSON.parse(JSON.stringify(conversations)));

  // Handle new chat from external component (like + button)
  useEffect(() => {
    if (newChatId) {
      console.log('New chat created externally, adding to sidebar:', newChatId);
      const newChat: InboxNavigationData = {
        id: newChatId,
        title: 'New Chat',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
        description: 'Start a new conversation',
      };
      
      setConversations(prev => [newChat, ...prev]);
    }
  }, [newChatId]);

  // Debug: Log conversations whenever they change
  useEffect(() => {
    console.log('Conversations updated:', conversations);
    console.log('Grouped conversations:', groupedConversations);
  }, [conversations, groupedConversations]);

  const groupLabels = {
    today: 'Today',
    yesterday: 'Yesterday',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    older: 'Older'
  };


  return (
      <div
          className={cn('h-screen top-16 duration-300 w-[320px] bg-[#F6F6F9] fixed p-4', IS_SIDEBAR_EXPANDED ? 'left-[76px]' : 'left-[200px]')}
      >
        <NavigationElement />
        <Input
            placeholder="Search here..."
            className="bg-white rounded-full mt-3"
            inputClassName="rounded-full h-9"
            prefix={<PiMagnifyingGlass className="scale-[1.3] ms-1 text-gray-500" />}
        />
        <Toolbar inboxNavigationData={conversations} onNewChat={handleNewChat} />

        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-16 pl-2">

          {Object.entries(groupedConversations).map(([key, conversations]) =>
                  conversations.length > 0 && (
                      <div key={key}>
                        <div className="text-xs font-medium text-gray-500 mt-2 mb-1">
                          {groupLabels[key as keyof typeof groupLabels]} ({conversations.length})
                        </div>
                        <div className="max-w-[280px]">
                          <InboxSelection data={conversations} />
                        </div>
                      </div>
                  )
          )}

          {/* Debug: Show if no conversations */}
          {conversations.length === 0 && (
              <div className="text-xs text-gray-400 text-center mt-4">
                No conversations found
              </div>
          )}
        </div>

        {isSelectable && (
            <div className={cn('fixed bottom-0 w-[280px] bg-[#F6F6F9] p-4 border-t border-gray-200', IS_SIDEBAR_EXPANDED ? 'left-[76px]' : 'left-[200px]')}>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setIsSelectable(false)} variant="outline" size="sm">
                  Cancel Selection
                </Button>
                <Button
                    color="danger"
                    size="sm"
                    onClick={handleDeleteChats}
                    disabled={selectedIds.length === 0 || isDeleting}
                >
                  {isDeleting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Deleting...
                      </div>
                  ) : (
                      'Delete Chats'
                  )}
                </Button>
              </div>
            </div>
        )}
      </div>
  );
}

const navigationMenus = [
  {
    name: 'Search history',
    href: ROUTES.AI_SEARCH.INDEX,
    activePathnames: [ROUTES.AI_SEARCH.INDEX, ROUTES.AI_SEARCH.FULL_REPORT] as string[],
  },
  {
    name: 'Version 0.597',
    isVersion:true
  },
];

function NavigationElement() {
  const pathname = usePathname();
  const { queryParams } = useQueryParams();
  const activeClassName = 'bg-primary/10 text-primary font-medium ';
  return (
      <div className="rounded-full bg-white p-1 grid grid-cols-2 shadow-lg shadow-gray-200 border border-gray-100">
        {navigationMenus.map(({ name, href, activePathnames, isVersion }) => (
            isVersion ? (
                <span
                    key={name}
                    className={cn('px-3 py-2 text-xs text-center rounded-full duration-300')}
                >
                  {name}
                </span>
            ) : (
                <Link
                    key={name}
                    href={parsePathnameWithQuery(href || '', queryParams)}
                    className={cn('px-3 py-2 text-xs text-center rounded-full duration-300', activePathnames?.includes(pathname) && activeClassName)}
                >
                  {name}
                </Link>
            )
        ))}
      </div>
  );
}


function Toolbar({ inboxNavigationData, onNewChat }: { inboxNavigationData: InboxNavigationData[]; onNewChat: (isManualClick?: boolean) => void }) {
  const { isSelectable, setIsSelectable, selectMultiple, clearSelection } = useConversationSidebarSelectionState();

  const allIds = inboxNavigationData?.map((item) => item.id);

  function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    if (isChecked) {
      selectMultiple(allIds);
    } else {
      clearSelection();
    }
  }

  return (
      <div className="flex justify-between items-center my-4 text-xs">
        <span></span>
        {!isSelectable ? (
            <div className="flex gap-2 items-center">
              <button onClick={() => setIsSelectable(true)} className="flex items-center gap-1">
                <PiPencilLine /> Edit
              </button>
              <span className="w-px h-4 bg-gray-400" />
              <button className="text-primary flex items-center gap-1" onClick={() => onNewChat(true)}>
                <PiPlus /> New Chat
              </button>
            </div>
        ) : (
            <span className="flex items-center gap-3">
          <Checkbox labelClassName="text-xs" label="Select all" onChange={handleChangeCheckbox} />
        </span>
        )}
      </div>
  );
}

