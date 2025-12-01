import { Button } from '@/components/atom/button';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { Switch } from '@/components/atom/form-elements/switch';

export default function Page() {
  return (
    <FadeAnimation>
      <div className="w-full sm:w-auto sm:rounded-[10px] sm:shadow-lg sm:min-w-[600px] sm:max-w-[600px] sm:border sm:border-gray-50"
      style={{background:"white"}}>
        <div className="p-4 sm:p-[18px] space-y-3">
          <h2 className="text-black text-sm sm:text-base font-bold">Notifications & Alerts</h2>
          <h4 className="text-black text-xs sm:text-sm font-bold">Email & SMS Alerts</h4>
          <div className="flex justify-between items-center py-1">
            <h5 className="text-xs sm:text-sm font-normal text-black">New Data Matches</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center py-1">
            <h5 className="text-xs sm:text-sm font-normal text-black">New User Onboarding</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center py-1">
            <h5 className="text-xs sm:text-sm font-normal text-black">Billing Updates</h5>
            <Switch />
          </div>
        </div>
        {/* Customizable Watchlists */}
        <div className="border-t border-b border-gray-100">
          <div className="px-4 sm:px-[18px] py-4 space-y-3">
            <h4 className="text-black text-xs sm:text-sm font-bold">Customizable Watchlists</h4>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 py-1">
              <h5 className="text-xs sm:text-sm font-normal text-black">Watchlist name</h5>
              <h5 className="text-black text-xs sm:text-sm font-medium">High Value Targets</h5>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 py-1">
              <h5 className="text-xs sm:text-sm font-normal text-black">Entity</h5>
              <h5 className="text-black text-xs sm:text-sm font-medium break-words">John Doe (Location: New York)</h5>
            </div>
            <button className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5 w-full sm:w-auto">
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
