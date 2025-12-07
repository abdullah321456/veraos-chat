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
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const fromLogin = sessionStorage.getItem('fromLogin');

        if (fromLogin) {
            sessionStorage.removeItem('fromLogin');
            setIsReady(true);
            //return;
        }

        const timer = setTimeout(() => {
            setIsReady(true);
            setRenderKey(prev => prev + 1);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (!isReady) return null;

    return (
        <DarkModeProvider>
            <DashboardLayoutWrapper>
                <DashboardSidebar isExpanded={isExpanded} />
                <DashboardHeader isExpanded={isExpanded} />
                <DashboardChildrenWrapper isExpanded={isExpanded}>{children}</DashboardChildrenWrapper>
            </DashboardLayoutWrapper>
        </DarkModeProvider>
    );
}
