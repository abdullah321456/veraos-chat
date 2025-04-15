'use client';

import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { Input } from '@/components/atom/form-elements/input';
import { ROUTES } from '@/config/routes';
import { getIsSidebarExpandedOnClient, IsExpandedType, useSidebarExpand } from '@/lib/hooks/use-sidebar-expand';
import cn from '@/lib/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
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

type Props = {
  isExpanded: IsExpandedType;
};

export function Sidebar({ isExpanded }: Props) {
  const { isExpanded: isExpandedState } = useSidebarExpand(isExpanded);
  const IS_SIDEBAR_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);
  const { isSelectable, setIsSelectable } = useConversationSidebarSelectionState();
  const [conversations, setConversations] = useState<InboxNavigationData[]>([]);
  const { setQueryParams } = useQueryParams();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await apiService.getData('/chat');

        console.log("data = ",data);
        const mappedConversations: InboxNavigationData[] = data.data.map((conv: ApiConversation) => ({
          id: conv._id,
          title: conv.question_preview,
          time: new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: conv.message,
        }));

        setConversations(mappedConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();
  }, []);

  const handleNewChat = async () => {
    try {
      const response = await apiService.postData('/chat', {});
      setQueryParams({ chatId: response.data._id });
      // Refresh conversations list
      const data = await apiService.getData('/chat');
      const mappedConversations: InboxNavigationData[] = data.data.map((conv: ApiConversation) => ({
        id: conv._id,
        title: conv.question_preview,
        time: new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: conv.message,
      }));
      setConversations(mappedConversations);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    <div
      className={cn('h-screen top-16 duration-300 w-[280px] bg-[#F6F6F9] fixed p-4', IS_SIDEBAR_EXPANDED ? 'left-[76px]' : 'left-[200px]')}
    >
      <NavigationElement />
      <Input
        placeholder="Search here..."
        className="bg-white rounded-full mt-3"
        inputClassName="rounded-full h-9"
        prefix={<PiMagnifyingGlass className="scale-[1.3] ms-1 text-gray-500" />}
      />
      <Toolbar inboxNavigationData={conversations} onNewChat={handleNewChat} />
      <InboxSelection data={conversations} />
      {isSelectable && (
        <div className="grid grid-cols-2 gap-2 pt-2.5">
          <Button onClick={() => setIsSelectable(false)} variant="outline" size="sm">
            Cancel Selection
          </Button>
          <Button color="danger" size="sm">
            Delete Chats
          </Button>
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
      <span>TODAY</span>
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

