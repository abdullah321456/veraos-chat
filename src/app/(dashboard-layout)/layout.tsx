import { DashboardChildrenWrapper } from '@/components/dashboard-children-wrapper';
import { DashboardHeader } from '@/components/header';
import { DashboardSidebar } from '@/components/sidebar';
import { getIsSidebarExpandedOnServer } from '@/lib/utils/server-cookies';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isExpanded = getIsSidebarExpandedOnServer();
  return (
    <div className="pt-20">
      <DashboardSidebar isExpanded={isExpanded} />
      <DashboardHeader isExpanded={isExpanded} />
      <DashboardChildrenWrapper isExpanded={isExpanded}>{children}</DashboardChildrenWrapper>
    </div>
  );
}
