import { useEffect, useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { setCookie } from '../utils/cookies';

export type IsExpandedType = 'true' | 'false' | undefined;

type Props = {
  isExpanded: IsExpandedType;
  setIsExpanded: (value: IsExpandedType) => void;
};

const useSidebarExpandStore = create<Props>((set) => ({
  isExpanded: undefined,
  setIsExpanded: (value: IsExpandedType) => set({ isExpanded: value }),
}));

export function useSidebarExpand(defaultLayout?: IsExpandedType) {
  const { isExpanded, setIsExpanded } = useSidebarExpandStore();

  useEffect(() => {
    if (typeof defaultLayout !== 'undefined') {
      setIsExpanded(defaultLayout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback((toggleTo: boolean) => {
    const value = toggleTo ? 'true' : 'false';
    setCookie({
      name: 'sidebarExpanded',
      value,
      path: '/',
    });
    setIsExpanded(value);
  }, [setIsExpanded]);

  const memoizedReturn = useMemo(() => ({
    isExpanded,
    toggle
  }), [isExpanded, toggle]);

  return memoizedReturn;
}

export function getIsSidebarExpandedOnClient(serverState?: IsExpandedType, clientState?: IsExpandedType) {
  const IS_SIDEBAR_EXPANDED = typeof clientState !== 'undefined' ? (clientState === 'true' ? true : false) : serverState === 'true';
  return IS_SIDEBAR_EXPANDED;
}
