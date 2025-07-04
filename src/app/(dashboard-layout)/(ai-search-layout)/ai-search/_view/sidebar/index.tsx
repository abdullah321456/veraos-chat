import React from 'react';
import cn from '@/lib/utils/cn';

const IS_SIDEBAR_EXPANDED = true; // This should be replaced with actual state management

const Sidebar: React.FC = () => {
  return (
    <div
      className={cn('h-screen top-16 duration-300 w-[320px] bg-[#F6F6F9] fixed p-4 z-50', IS_SIDEBAR_EXPANDED ? 'left-[76px]' : 'left-[200px]')}
    >
      {/* Rest of the component content */}
    </div>
  );
};

const BottomSidebar: React.FC = () => {
  return (
    <div className={cn('fixed bottom-0 w-[280px] bg-[#F6F6F9] p-4 border-t border-gray-200 z-50', IS_SIDEBAR_EXPANDED ? 'left-[76px]' : 'left-[200px]')}>
      {/* Rest of the component content */}
    </div>
  );
};

export default Sidebar;
export { BottomSidebar };
