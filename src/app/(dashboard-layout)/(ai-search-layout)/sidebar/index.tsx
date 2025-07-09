'use client';

import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { Input } from '@/components/atom/form-elements/input';
import { ROUTES } from '@/config/routes';
import { getIsSidebarExpandedOnClient, IsExpandedType, useSidebarExpand } from '@/lib/hooks/use-sidebar-expand';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
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
};


export function Sidebar({ isExpanded, lastMessage }: Props) {
  const { isExpanded: isExpandedState } = useSidebarExpand(isExpanded);
  const IS_SIDEBAR_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);
  const { isSelectable, setIsSelectable, selectedIds } = useConversationSidebarSelectionState();
  const [conversations, setConversations] = useState<InboxNavigationData[]>([]);
  const { setQueryParams, queryParams } = useQueryParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const hasFetched = useRef(false);
  const [isChatFetched,setIsChatFetched]=useState(false);


  const fetchConversations = async () => {
    try {
      const data = await apiService.getData('/chat');

      const mappedConversations: InboxNavigationData[] = data.data.map((conv: ApiConversation) => ({
        id: conv._id,
        title: conv.question_preview,
        time: new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: conv.timestamp,
        description: conv.message,
      }));

      if(!queryParams?.chatId){
          handleNewChat();
      }
      setConversations(mappedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchConversations();
      //handleNewChat();
      hasFetched.current = true;
    }
  }, []);

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

  useEffect(() => {

    if (conversations.length > 0 && isChatFetched && !queryParams?.chatId) {
      setQueryParams({ chatId: conversations[0].id.toString() });
    }else if(conversations.length<1 && isChatFetched){
      handleNewChat()
    }

  }, [conversations]);

  const handleNewChat = async () => {
    try {
      const response = await apiService.postData('/chat', {});
      const newChatId = response.data._id;
      setQueryParams({ chatId: newChatId, route: ROUTES.AI_SEARCH.INDEX });

      // Add the new chat to the conversations list directly
      const newChat: InboxNavigationData = {
        id: newChatId,
        title: 'New',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().toISOString(),
        description: '',
      };
        setIsChatFetched(true);

        setConversations(prev => [newChat, ...prev]);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const handleDeleteChats = async () => {
    if (selectedIds.length === 0) return;

    try {
      setIsDeleting(true);
      await apiService.deleteData('/chat', { chatIds: selectedIds });

      // Remove deleted conversations from the UI
      setConversations(prevConversations =>
        prevConversations.filter(conv => !selectedIds.includes(conv.id))
      );

      setIsSelectable(false);

      // If the current chat was deleted, clear the chatId from URL
      if (selectedIds.includes(queryParams.chatId)) {
        setQueryParams({ chatId: undefined });
      }
    } catch (error) {
      console.error('Error deleting chats:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const groupedConversations = groupConversationsByDate(JSON.parse(JSON.stringify(conversations)));

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
                {groupLabels[key as keyof typeof groupLabels]}
              </div>
              <div className="max-w-[280px]">
                <InboxSelection data={conversations} />
              </div>
            </div>
          )
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
    name: 'Dossiers',
    href: ROUTES.AI_SEARCH.BUILD,
    activePathnames: [ROUTES.AI_SEARCH.BUILD] as string[],
  },
];

function NavigationElement() {
  const pathname = usePathname();
  const { queryParams } = useQueryParams();
  const activeClassName = 'bg-primary/10 text-primary font-medium ';
  return (
    <div className="rounded-full bg-white p-1 grid grid-cols-2 shadow-lg shadow-gray-200 border border-gray-100">
      {navigationMenus.map(({ name, href, activePathnames }) => (
        <Link
          key={name}
          href={parsePathnameWithQuery(href, queryParams)}
          className={cn('px-3 py-2 text-xs text-center rounded-full duration-300', activePathnames.includes(pathname) && activeClassName)}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

function Toolbar({ inboxNavigationData, onNewChat }: { inboxNavigationData: InboxNavigationData[]; onNewChat: () => void }) {
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
          <button className="text-primary flex items-center gap-1" onClick={onNewChat}>
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

