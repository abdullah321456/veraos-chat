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
    <div className="w-full mx-auto px-4 sm:px-6 md:px-8 pr-6 sm:w-auto sm:max-w-[700px] sm:pr-8 bg-white">
      <div className="flex-1 overflow-y-auto min-h-0">
      <div className="p-4 sm:p-5">
        <h2 className="text-black text-sm sm:text-base font-bold">Account Settings</h2>
        {/* Tabs  */}
        <div className="mt-3 flex flex-row gap-2 sm:gap-2 overflow-x-auto">
          {allTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`sm:w-auto font-bold whitespace-nowrap transition-all ${
                activeTab === tab ? 'text-[#5C39D9]' : ' text-[#616166]'
              }`}
              style={activeTab === tab ? { 
                backgroundColor: '#5C39D91A',
                borderRadius: '7px',
                paddingTop: '11px',
                paddingRight: '18px',
                paddingBottom: '11px',
                paddingLeft: '18px',
                color: '#5C39D9',
                fontSize: '12px'
              } : {
                paddingTop: '11px',
                paddingRight: '18px',
                paddingBottom: '11px',
                paddingLeft: '18px',
                fontSize: '12px'
              }}
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
    </div>
  );
}
