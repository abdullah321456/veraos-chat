'use client';

import { useEffect } from 'react';

export function useScrollToTop({ enabled = true }) {
  useEffect(() => {
    if (enabled) {
      window.scrollTo(0, 0);
    }
  }, [enabled]);
  return null;
}
