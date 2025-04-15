'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';
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
const officialPostingTypeOptions = [
  {
    id: '1',
    name: 'Singapore',
    value: 'sg',
  },
  {
    id: '2',
    name: 'Germany',
    value: 'gm',
  },
  {
    id: '3',
    name: 'Spain',
    value: 'sp',
  },
];
export function OrganizationDetails() {
  return (
    <div className="shadow-lg p-4 border border-gray-100 rounded-[10px]">
      <div className="space-y-4">
        <h5 className="text-black text-base font-bold">Organization Details</h5>
        <Input label="Organization Name" type="text" placeholder="Enter organization name" />
        <div className="flex gap-2">
          <div className="w-1/2">
            <Select
              dropdownMenuClassName="w-[334px]"
              placeholder="Choose organization type"
              labelClassName={labelClassName}
              label="Organization Type"
              // selected={selectedOrgOption}
              options={organizationTypeOptions}
              formatDisplay={(option) => option?.name}
              // onSelect={({ value }: { value: string }) => {
              //   setSelectedOrgValue(value);
              //   console.log(value);
              // }}
            />
          </div>
          <Input label="Organization Website" type="text" placeholder="Enter organization website" className="w-1/2" />
        </div>
        <Input label="Business Address" type="text" placeholder="Enter business address" />
        <div className="flex gap-2">
          <div className="w-1/2">
            <Select
              dropdownMenuClassName="w-[334px]"
              placeholder="Choose country"
              labelClassName={labelClassName}
              label="Country"
              // selected={selectedOrgOption}
              options={officialPostingTypeOptions}
              formatDisplay={(option) => option?.name}
              // onSelect={({ value }: { value: string }) => {
              //   setSelectedOrgValue(value);
              //   console.log(value);
              // }}
            />
          </div>
          <Input label="Agency or Department ID Number (if applicable)" type="text" placeholder="Enter ID" className="w-1/2" />
        </div>
        <div className="pt-3">
          <Button>Update Organization Details</Button>
        </div>
      </div>
    </div>
  );
}
