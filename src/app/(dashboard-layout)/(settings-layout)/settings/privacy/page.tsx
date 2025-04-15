import { Button } from "@/components/atom/button";
import { FadeAnimation } from "@/components/atom/fade-animatation";
import { Switch } from "@/components/atom/form-elements/switch";

export default function Page() {
  return (
    <FadeAnimation>
      <div className="rounded-[10px] shadow-lg w-[600px] border border-gray-50">
        <div className="p-[18px] space-y-3">
          <h2 className="text-black text-base font-bold">Privacy & Security</h2>
          <h4 className="text-black text-sm font-bold">
            Data Retention Policy
          </h4>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">
              Auto-delete chats after 90 days
            </h5>
            <Switch />
          </div>
        </div>
        {/* access logs  */}
        <div className="border-t border-b border-gray-100">
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Access Logs</h4>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Jan 22, 2025</h5>
              <h5 className="text-sm font-normal text-black">
                Login from IP{" "}
                <span className="text-black text-sm font-medium">
                  192.168.0.1
                </span>
              </h5>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Feb 01, 2025</h5>
              <h5 className="text-sm font-normal text-black">
                Report downloaded by{" "}
                <span className="text-black text-sm font-medium">
                  John Smith
                </span>
              </h5>
            </div>
          </div>
        </div>
        {/* download and exports logs  */}
        <div className="border-t border-b border-gray-100">
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">
              Download & Export Logs
            </h4>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">Dossier Report</h5>
              <h5 className="text-sm font-normal text-black">
                Feb 5, 2025 (Downloaded)
              </h5>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-normal text-black">
                Search Results Export
              </h5>
              <h5 className="text-sm font-normal text-black">
                Jan 15, 2025 (Expired)
              </h5>
            </div>
          </div>
        </div>
        {/* session management  */}
        <div className="border-t border-b border-gray-100">
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Session Management</h4>
            <button className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5">
              Log Out from All Devices
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
        <div className="flex justify-end py-7  pr-[18px] mb-5">
          <Button>Save Changes</Button>
        </div>
      </div>
    </FadeAnimation>
  );
}
