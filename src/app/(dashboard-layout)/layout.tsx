'use client';

import { DashboardChildrenWrapper } from '@/components/dashboard-children-wrapper';
import { DashboardHeader } from '@/components/header';
import { DashboardSidebar } from '@/components/sidebar';
import { getIsSidebarExpandedOnServer } from '@/lib/utils/server-cookies';
import { DarkModeProvider } from '@/lib/contexts/dark-mode-context';
import { DashboardLayoutWrapper } from '@/components/dashboard-layout-wrapper';
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded] = useState(() => getIsSidebarExpandedOnServer());
  const [renderKey, setRenderKey] = useState(0);

  // useEffect(() => {
  //   // Check if coming from login
  //   if (typeof window !== 'undefined') {
  //     const fromLogin = sessionStorage.getItem('fromLogin');
  //     if (fromLogin) {
  //       // Don't trigger re-render when coming from login
  //       return;
  //     }
  //   }
  //
  //   // Force re-render after 1 second (only if not coming from login)
  //   const timer = setTimeout(() => {
  //     setRenderKey(prev => prev + 1);
  //   }, 100);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <DarkModeProvider key={renderKey}>
      <DashboardLayoutWrapper>
        <DashboardSidebar isExpanded={isExpanded} />
        <DashboardHeader isExpanded={isExpanded} />
        <DashboardChildrenWrapper isExpanded={isExpanded}>{children}</DashboardChildrenWrapper>
      </DashboardLayoutWrapper>
    </DarkModeProvider>
  );
}
