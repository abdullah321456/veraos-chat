'use client';

import { Suspense } from 'react';

export function ClientSuspense({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    return <Suspense>{children}</Suspense>;
  }

  return <></>;
}
