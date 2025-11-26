'use client';

import { FadeAnimation } from '@/components/atom/fade-animatation';
import { PasswordSecurity } from '@/components/settings/account-settings/password-security';
import { ProfileInformation } from '@/components/settings/account-settings/profile-information';
import UserRolesAndPermission from '@/components/settings/account-settings/user-roles-permisson';
import { useUser } from '@/lib/hooks/use-user';
import { useState } from 'react';

export function TabView() {
  const [activeTab, setActiveTab] = useState('Profile Information');
  const { userData } = useUser();
  
  // Define tabs based on user role
  const baseTabs = ['Profile Information', 'Password & Security'];
  const allTabs = userData?.role === 'organization' 
    ? [...baseTabs, 'User Roles And Permissions']
    : baseTabs;
  
  return (
    <div className="w-full sm:w-auto p-4 sm:p-5 mb-10 sm:rounded-[10px] sm:shadow-lg sm:max-w-[600px] sm:border sm:border-gray-50 sm:mx-auto">
      <div>
        <h2 className="text-black text-sm sm:text-base font-bold">Account Settings</h2>
        {/* Tabs  */}
        <div className="mt-3 flex flex-row gap-2 sm:gap-0 sm:justify-between overflow-x-auto">
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`sm:mr-4 py-2 sm:py-[11px] flex-1 sm:w-full px-3 sm:px-[18px] rounded-[37px] text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-[#5C39D9] bg-opacity-10 text-[#5C39D9]' : ' text-[#616166]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <FadeAnimation key={activeTab}>
          {/* profile information */}
          {activeTab === 'Profile Information' && <ProfileInformation />}

          {/* Password & Security */}
          {activeTab === 'Password & Security' && <PasswordSecurity />}

          {/* roles management - only for organization role */}
          {activeTab === 'User Roles And Permissions' && userData?.role === 'organization' && <UserRolesAndPermission />}
        </FadeAnimation>
      </div>
    </div>
  );
}
