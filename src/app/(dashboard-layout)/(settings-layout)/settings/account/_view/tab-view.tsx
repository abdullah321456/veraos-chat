'use client';

import { FadeAnimation } from '@/components/atom/fade-animatation';
import { PasswordSecurity } from '@/components/settings/account-settings/password-security';
import { ProfileInformation } from '@/components/settings/account-settings/profile-information';
import UserRolesAndPermission from '@/components/settings/account-settings/user-roles-permisson';
import { useState } from 'react';

export function TabView() {
  const [activeTab, setActiveTab] = useState('Profile Information');
  return (
    <div className="p-5 mb-10 rounded-[10px] shadow-lg w-[600px] border border-gray-50">
      <div>
        <h2 className="text-black text-base font-bold">Account Settings</h2>
        {/* Tabs  */}
        <div className="mt-3 flex justify-between">
          {['Profile Information', 'Password & Security', 'User Roles And Permissions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-4 py-[11px] w-full px-[18px] rounded-[37px] text-xs font-bold whitespace-nowrap  transition-all ${
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

          {/* roles management  */}
          {activeTab === 'User Roles And Permissions' && <UserRolesAndPermission />}
        </FadeAnimation>
      </div>
    </div>
  );
}
