'use client';

import useQueryParams from '@/lib/hooks/use-query-params';
import cn from '@/lib/utils/cn';
import { useConversationSidebarSelectionState } from './utils';
import { InboxNavigationData } from './types';
import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { useEffect } from 'react';
import { ROUTES } from '@/config/routes';

export function InboxSelection({ data }: { data: InboxNavigationData[] }) {
  const { isSelectable } = useConversationSidebarSelectionState();
  const { setQueryParams, queryParams } = useQueryParams();

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
      setQueryParams({ chatId: id, route: ROUTES.AI_SEARCH.INDEX });
    }
  };

  return (
    <div className={cn('mt-2 -mx-4 overflow-y-auto')}>
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
    <div onClick={handleClick} className={cn('cursor-pointer p-4', isCurrent && 'bg-primary/10 border-r-4 border-r-primary')}>
      <div className="flex gap-3 text-sm font-bold mb-2">
        {isSelectable && <Checkbox checked={selectedIds.includes(id)} onChange={handleChangeCheckbox} />}
        <p className="whitespace-nowrap text-ellipsis overflow-hidden">{title}</p>
        <span className="text-xs font-medium mt-[3px]">{time}</span>
      </div>
      <p className="whitespace-nowrap text-ellipsis overflow-hidden text-xs text-gray-600 pr-6">{description}</p>
    </div>
  );
}
