import { Button } from '@/components/atom/button';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { Switch } from '@/components/atom/form-elements/switch';

export default function Page() {
  return (
    <FadeAnimation>
      <div className="rounded-[10px] shadow-lg w-[600px] border border-gray-50">
        <div className="p-[18px] space-y-3">
          <h2 className="text-black text-base font-bold">Notifications & Alerts</h2>
          <h4 className="text-black text-sm font-bold">Email & SMS Alerts</h4>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">New Data Matches</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">New User Onboarding</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">Billing Updates</h5>
            <Switch />
          </div>
        </div>
        {/* Customizable Watchlists */}
        <div className="border-t border-b border-gray-100">
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Customizable Watchlists</h4>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Watchlist name</h5>
              <h5 className="text-black text-sm font-medium">High Value Targets</h5>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Entity</h5>
              <h5 className="text-black text-sm font-medium">John Doe (Location: New York)</h5>
            </div>
            <button className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5 ">
              Manage Watchlists
            </button>
          </div>
        </div>
        {/* Bulk Search Notifications */}
        {/* <div className="px-[18px] py-4 space-y-3">
          <h4 className="text-black text-sm font-bold">Bulk Search Notifications</h4>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">Notify for Bulk Results</h5>
            <Switch />
          </div>
        </div> */}
        {/* Report Status Updates */}
        {/* <div>
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Report Status Updates</h4>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Enable Report Status Notifications</h5>
              <Switch />
            </div>
          </div>
        </div> */}
        <div className="flex justify-end py-7  pr-[18px] mb-5">
          <Button>Save Changes</Button>
        </div>
      </div>
    </FadeAnimation>
  );
}
