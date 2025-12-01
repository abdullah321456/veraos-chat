'use client';

import { Button } from "@/components/atom/button";
import { FadeAnimation } from "@/components/atom/fade-animatation";
import { Switch } from "@/components/atom/form-elements/switch";
import { userService } from "@/services/userService";
import { authUtils } from "@/lib/utils/auth";
import { toast } from "sonner";
import { useState } from "react";

export default function Page() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleForceLogoutAllDevices = async () => {
    try {
      setIsLoggingOut(true);
      await userService.forceLogoutAllDevices();
      toast.success('Successfully logged out from all devices');
      // Force logout the current user as well
      authUtils.forceLogout();
    } catch (error: any) {
      console.error('Error force logging out:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to logout from all devices';
      toast.error(errorMessage);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <FadeAnimation>
      <div className="w-full sm:w-auto sm:rounded-[10px] sm:shadow-lg sm:min-w-[600px] sm:max-w-[600px] sm:border sm:border-gray-50"
      style={{background:"white"}}>
        <div className="p-4 sm:p-[18px] space-y-3">
          <h2 className="text-black text-sm sm:text-base font-bold">Privacy & Security</h2>
          <h4 className="text-black text-xs sm:text-sm font-bold">
            Data Retention Policy
          </h4>
          <div className="flex justify-between items-center py-1">
            <h5 className="text-xs sm:text-sm font-normal text-black">
              Auto-delete chats after 90 days
            </h5>
            <Switch />
          </div>
        </div>
        {/* session management  */}
        <div className="border-t border-b border-gray-100">
          <div className="px-4 sm:px-[18px] py-4 space-y-3">
            <h4 className="text-black text-xs sm:text-sm font-bold">Session Management</h4>
            <button 
              onClick={handleForceLogoutAllDevices}
              disabled={isLoggingOut}
              className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isLoggingOut ? 'Logging Out...' : 'Log Out from All Devices'}
            </button>
          </div>
        </div>
        {/* Anonymized Queries */}
        {/* <div>
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Anonymized Queries</h4>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">
                Remove identifiers from search logs
              </h5>
              <Switch />
            </div>
          </div>
        </div> */}
        <div className="flex justify-end py-4 sm:py-7 px-4 sm:pr-[18px] mb-5">
          <Button 
            className="w-full sm:w-auto rounded-[6px] border-0"
            style={{
              background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)',
              paddingTop: '11px',
              paddingRight: '20px',
              paddingBottom: '11px',
              paddingLeft: '20px'
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </FadeAnimation>
  );
}
