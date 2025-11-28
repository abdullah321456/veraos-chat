import { getIsSidebarExpandedOnServer } from '@/lib/utils/server-cookies';
import { ClientLayout } from './client-layout';
import { DashboardHeader } from '@/components/header';

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
  const isExpanded = getIsSidebarExpandedOnServer();

  return (
    <>
      <DashboardHeader isExpanded={isExpanded} />
      <ClientLayout isExpanded={isExpanded}>{children}</ClientLayout>
    </>
  );
}
