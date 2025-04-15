"use client";
import { Button } from "@/components/atom/button";
import { FadeAnimation } from "@/components/atom/fade-animatation";
import { Input } from "@/components/atom/form-elements/input";
import { inputLabelStyles } from "@/components/atom/form-elements/styles/label-styles";
import { Select } from "@/components/atom/select";
import cn from "@/lib/utils/cn";
import { AlignRangePicker } from "../../../../../components/atom/align-range-picker/align-range-picker";
// TODO: select form
const labelClassName = cn(
  "block text-[#6D6F73]",
  inputLabelStyles.color.black,
  inputLabelStyles.size.md,
  inputLabelStyles.weight.medium
);
const organizationTypeOptions = [
  {
    id: "1",
    name: "Standard AI v3.5",
    value: "3.5",
  },
  {
    id: "2",
    name: "Standard AI v3.6",
    value: "3.6",
  },
  {
    id: "3",
    name: "Standard AI v3.5",
    value: "3.7",
  },
];
export default function Page() {
  return (
    <FadeAnimation>
      <div className="rounded-[10px] shadow-lg w-[600px] border border-gray-50">
        <div className="p-[18px] space-y-3">
          <h2 className="text-black text-base font-bold">
            Advanced AI & Analysis
          </h2>

          <form className="mt-[14px] space-y-3 ">
            <Input
              label="Keyword Exclusions"
              type="text"
              placeholder="Scam, False, Report"
            />

            <Select
              dropdownMenuClassName="w-[564px]"
              placeholder="Choose type"
              labelClassName={labelClassName}
              label="AI Model Version"
              // selected={selectedOrgOption}
              options={organizationTypeOptions}
              formatDisplay={(option) => option?.name}
              // onSelect={({ value }: { value: string }) => {
              //   setSelectedOrgValue(value);
              //   console.log(value);
              // }}
            />

            <div>
              <div className="px-[18px] py-4 space-y-3">
                <h4 className="text-black text-sm font-bold">
                  AI Assistance Level
                </h4>
                <AlignRangePicker />
              </div>
              <div className="flex justify-end py-6  pr-[18px] ">
                <Button>Save Changes</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FadeAnimation>
  );
}
