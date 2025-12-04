'use client';

import { DarkModeProvider } from '@/lib/contexts/dark-mode-context';
import { AuthLayoutContent } from './auth-layout-content';
import { useState, useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // Force re-render after 500ms
    const timer = setTimeout(() => {
      setRenderKey(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DarkModeProvider key={renderKey}>
      <AuthLayoutContent>{children}</AuthLayoutContent>
    </DarkModeProvider>
  );
}
