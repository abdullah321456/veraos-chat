import { getIsSidebarExpandedOnServer } from '@/lib/utils/server-cookies';
import { ClientLayout } from './client-layout';

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
  const isExpanded = getIsSidebarExpandedOnServer();

  return (
    <ClientLayout isExpanded={isExpanded}>{children}</ClientLayout>
  );
}
