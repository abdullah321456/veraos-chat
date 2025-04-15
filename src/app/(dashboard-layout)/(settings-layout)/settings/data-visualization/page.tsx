'use client';
import { Button } from '@/components/atom/button';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Switch } from '@/components/atom/form-elements/switch';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';
// TODO: drop down menu
const labelClassName = cn('block text-black', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.normal);
const organizationTypeOptions = [
  {
    id: '1',
    name: 'Weekly (Every Monday at 10:00 AM)',
    value: 'weekly',
  },
  {
    id: '2',
    name: 'Monthly (Every Monday at 10:00 AM)',
    value: 'monthly',
  },
  {
    id: '3',
    name: 'Daily (Every Monday at 10:00 AM)',
    value: 'Daily',
  },
];
export default function Page() {
  return (
    <FadeAnimation>
      <div className="rounded-[10px] shadow-lg w-[600px] border border-gray-50">
        <div className="p-[18px] space-y-3">
          <h2 className="text-black text-base font-bold">Data Visualization & Export</h2>
          <h4 className="text-black text-sm font-bold">Graph & Chart Preferences</h4>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">Node-Link Analysis</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">Timelines</h5>
            <Switch />
          </div>
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">Heatmaps</h5>
            <Switch />
          </div>
        </div>
        {/* Automated report generation  */}
        <div className="border-t border-b border-gray-100">
          <div className="px-[18px] py-4 space-y-3">
            <h4 className="text-black text-sm font-bold">Automated Report Generation</h4>
            <Select
              dropdownMenuClassName="w-[564px]"
              placeholder="Choose type"
              labelClassName={labelClassName}
              label="Frequency"
              // selected={selectedOrgOption}
              options={organizationTypeOptions}
              formatDisplay={(option) => option?.name}
              // onSelect={({ value }: { value: string }) => {
              //   setSelectedOrgValue(value);
              //   console.log(value);
              // }}
            />
            <div className="flex justify-end py-7  pr-[18px] mb-5">
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </FadeAnimation>
  );
}
