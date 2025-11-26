'use client';

import useQueryParams from '@/lib/hooks/use-query-params';
import cn from '@/lib/utils/cn';
import { useConversationSidebarSelectionState } from './utils';
import { InboxNavigationData } from './types';
import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { useEffect } from 'react';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';

export function InboxSelection({ data }: { data: InboxNavigationData[] }) {
  const { isSelectable } = useConversationSidebarSelectionState();
  const { setQueryParams, queryParams } = useQueryParams();
  const router = useRouter();

  // useEffect(() => {
  //
  //     console.log("InboxSelection = ",data);
  //
  //   if (data.length > 0 && !queryParams?.chatId) {
  //     setQueryParams({ chatId: data[0].id.toString() });
  //   }
  // }, [data, queryParams?.chatId, setQueryParams]);

  const handleConversationClick = (id: string) => {
    if (!isSelectable) {
      // Navigate to AI Search with the selected chatId using client-side navigation
      router.push(`${ROUTES.AI_SEARCH.INDEX}?chatId=${id}`);
    }
  };

  return (
    <div className={cn('mt-2 -mx-4')}>
      {data.map((item) => (
        <SingleInboxSelect
          key={item.id}
          {...item}
          onClick={() => handleConversationClick(item.id.toString())}
        />
      ))}
    </div>
  );
}

function SingleInboxSelect({ id, title, time, description, onClick }: InboxNavigationData & { onClick: () => void }) {
  const { queryParams } = useQueryParams();
  const isCurrent = queryParams?.chatId === id.toString();
  const { isSelectable, addOrRemove, selectedIds } = useConversationSidebarSelectionState();

  function handleClick() {
    if (isSelectable) {
      addOrRemove(id);
    } else {
      onClick();
    }
  }

  function handleChangeCheckbox() {
    if (isSelectable) addOrRemove(id);
  }

  return (
    <div 
      onClick={handleClick} 
      className={cn('cursor-pointer px-4 py-2 mx-4 mb-2 rounded-[10px] border')}
      style={isCurrent ? {
        background: 'linear-gradient(92.09deg, #F3F0FF 3.04%, #EAE6FF 99.55%)',
        borderWidth: '1px',
        borderColor: '#5C39D9'
      } : {
        background: '#F7F7FA',
        borderWidth: '1px',
        borderColor: 'transparent'
      }}
    >
      <div className="flex gap-3 text-sm font-bold mb-2 items-center">
        {isSelectable && <Checkbox checked={selectedIds.includes(id)} onChange={handleChangeCheckbox} />}
        <p className="whitespace-nowrap text-ellipsis overflow-hidden flex-1">{title}</p>
        <span className="text-xs font-medium ml-auto" style={{ color: '#616166' }}>{time}</span>
      </div>
      <p className="whitespace-nowrap text-ellipsis overflow-hidden text-xs text-gray-600 pr-6">{description}</p>
    </div>
  );
}
