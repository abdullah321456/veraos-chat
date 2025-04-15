import { getIsSidebarExpandedOnServer } from '@/lib/utils/server-cookies';
import { Sidebar } from './sidebar';

export default function AiSearchLayout({ children }: { children: React.ReactNode }) {
  const isExpanded = getIsSidebarExpandedOnServer();
  

  return (
    <div>
      <Sidebar isExpanded={isExpanded} />
      {children}
    </div>
  );
}
