'use client';

import { ROUTES } from '@/config/routes';
import { getIsSidebarExpandedOnClient, IsExpandedType, useSidebarExpand } from '@/lib/hooks/use-sidebar-expand';
import cn from '@/lib/utils/cn';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  isExpanded: IsExpandedType;
}>;

export function DashboardChildrenWrapper({ children, isExpanded }: Props) {
  const pathname = usePathname();
  const { isExpanded: isExpandedState } = useSidebarExpand(isExpanded);
  const IS_EXPANDED = getIsSidebarExpandedOnClient(isExpanded, isExpandedState);

  const largePaddingRoutes = [ROUTES.AI_SEARCH.INDEX, ROUTES.AI_SEARCH.FULL_REPORT, ROUTES.AI_SEARCH.BUILD] as string[];

  const paddingClassName = {
    notExpanded: largePaddingRoutes.includes(pathname) 
      ? 'pl-0 sm:pl-[320px] md:pl-[220px] md:pr-6'
      : 'pl-0 sm:pl-[200px] md:pl-[215px] md:pr-6',
    expanded: largePaddingRoutes.includes(pathname) 
      ? 'pl-0 sm:pl-[90px] md:pl-[90px] md:pr-6'
      : 'pl-0 sm:pl-[76px] md:pl-[90px]',
  };

  return <div className={cn('duration-300', !IS_EXPANDED ? paddingClassName.notExpanded : paddingClassName.expanded)}>{children}</div>;
}
