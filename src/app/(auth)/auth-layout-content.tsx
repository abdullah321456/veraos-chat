'use client';

import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();

  const backgroundStyle = isDarkMode
    ? { background: 'linear-gradient(143.11deg, #22252A 4.37%, #1F2736 78.56%)', minHeight: '100vh' }
    : { background: '#FFFFFF', minHeight: '100vh' };

  return (
    <div 
      className="min-h-screen overflow-x-hidden mx-auto max-w-[1024px] w-full max-w-full px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:p-10 flex items-center justify-center box-border"
      style={backgroundStyle}
    >
      <div className="w-full max-w-full min-w-0 box-border">{children}</div>
    </div>
  );
}

