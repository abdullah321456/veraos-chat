'use client';

import { useCallback, useEffect, useState } from 'react';

export function useDocumentScrollbarWidth(): number {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const calculateScrollbarWidth = useCallback((): number => {
    if (typeof window === 'undefined') return 0;
    const scrollDiv = document.createElement('div');
    scrollDiv.style.visibility = 'hidden';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.width = '100px';
    scrollDiv.style.position = 'absolute';

    document.body.appendChild(scrollDiv);

    const innerDiv = document.createElement('div');
    innerDiv.style.width = '100%';
    scrollDiv.appendChild(innerDiv);

    const width = scrollDiv.offsetWidth - innerDiv.offsetWidth;
    document.body.removeChild(scrollDiv);

    return width;
  }, []);

  useEffect(() => {
    // Calculate scrollbar width on mount
    setScrollbarWidth(calculateScrollbarWidth());
  }, [calculateScrollbarWidth]);

  return scrollbarWidth;
}
