import { useEffect, useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { setCookie } from '../utils/cookies';

export type IsExpandedType = 'true' | 'false' | undefined;

type Props = {
  isExpanded: IsExpandedType;
  setIsExpanded: (value: IsExpandedType) => void;
};

const useSidebarExpandStore = create<Props>((set) => ({
  isExpanded: 'true', // Always default to collapsed (true = collapsed/76px, false = expanded/200px)
  setIsExpanded: (value: IsExpandedType) => set({ isExpanded: value }),
}));

export function useSidebarExpand(defaultLayout?: IsExpandedType) {
  const { isExpanded, setIsExpanded } = useSidebarExpandStore();

  useEffect(() => {
    // Ignore defaultLayout from server, always start collapsed
    // Note: true = collapsed (76px), false = expanded (200px)
    if (isExpanded === undefined) {
      setIsExpanded('true');
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
  // Ignore serverState/cache, always default to collapsed
  // Note: true = collapsed (76px), false = expanded (200px)
  // Only use clientState if it's explicitly set (from user toggle during session)
  if (typeof clientState !== 'undefined') {
    return clientState === 'true';
  }
  // Always default to collapsed (true = 76px), ignore serverState/cache
  return true;
}
