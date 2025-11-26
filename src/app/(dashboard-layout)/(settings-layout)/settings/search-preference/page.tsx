import { Button } from "@/components/atom/button";
import { FadeAnimation } from "@/components/atom/fade-animatation";
import { Switch } from "@/components/atom/form-elements/switch";
import { DefaultSearch } from "./default-search";

export default function Page() {
  return (
    <FadeAnimation>
      <div className="w-full sm:w-auto sm:rounded-[10px] sm:shadow-lg sm:max-w-[600px] sm:border sm:border-gray-50">
        <div>
          <div className="p-4 sm:p-[18px] space-y-3">
            <h2 className="text-black text-sm sm:text-base font-bold">
              Search Preferences
            </h2>
            <DefaultSearch/>
          </div>

          {/* Search History */}
          {/* <div className="border-t border-b border-gray-100">
            <div className="px-[18px] py-4 space-y-3">
              <h4 className="text-black text-sm font-bold">Search History</h4>
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-normal text-black">
                  Enable Search History
                </h5>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-normal text-black">
                  Auto Clear After Every 30 days
                </h5>
                <Switch />
              </div>
            </div>
          </div> */}

          {/* Save Search tempalte  */}
          {/* <div className=" border-b border-gray-100">
            <div className="px-[18px] py-4 space-y-3">
              <h4 className="text-black text-sm font-bold">Save Search Template </h4>
              <div className="grid grid-cols-3 gap-3 [&_div]:flex [&_div]:items-center">
                <div className="text-sm text-[#5C39D9] font-medium border border-[#5C39D9] rounded-md py-2.5 px-5">Fraud Investigation</div>
                <div className="text-sm text-black font-normal border border-gray-200 rounded-md py-2.5 px-5">
                  Background Check Social Media Focus
                </div>
                <div className="text-sm text-black font-normal border border-gray-200 rounded-md py-2.5 px-5">Crypto Trace Query</div>
              </div>
            </div>
          </div> */}

          {/* Result highlighting  */}
          {/* <div className=" border-b border-gray-100">
            <div className="px-[18px] py-4 space-y-3">
              <h4 className="text-black text-sm font-bold">Result Highlighting</h4>
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-normal text-black">Keywords</h5>
                <div className="flex items-center  gap-1">
                  <h5 className="text-sm font-medium text-black">Fraud, Bitcoin, Location</h5>
                  <span className="flex items-center gap-1">
                    <div className="w-[1px] h-[14px]  bg-gray-500"></div>
                    <PlusIcon className="h-[17px] w-[17px]" />
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <h5 className="text-sm font-normal text-black">Color Code</h5>
                <div className="flex items-center gap-1">
                  <div className="bg-[#FF6363] h-[14px] w-[14px] rounded-[3px]"></div>
                  <h6 className="text-black text-sm font-medium">FF6363</h6>
                </div>
              </div>
            </div>
          </div> */}

          {/* AI Assistance Level */}
          {/* <div>
            <div className="px-[18px] py-4 space-y-3">
              <h4 className="text-black text-sm font-bold">
                AI Assistance Level
              </h4>
              <div className="flex pb-2 items-center justify-between text-sm font-normal text-black">
                <h6 className="">Basic</h6>
                <h6 className="">Moderate</h6>
                <h6 className="">Advanced</h6>
              </div>
              <AlignRangePicker />
            </div>
          </div> */}
        </div>
        <div className="flex justify-end py-4 sm:py-6 mt-10 sm:mt-20 px-4 sm:pr-[18px] mb-5">
          <Button className="w-full sm:w-auto">Save Changes</Button>
        </div>
      </div>
    </FadeAnimation>
  );
}
