'use client';
import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';

const labelClassName = cn('block text-[#6D6F73]', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.medium);

const countryOptions = [
  {
    id: '1',
    name: 'United States',
    value: 'us',
  },
  {
    id: '2',
    name: 'United Kingdom',
    value: 'uk',
  },
  {
    id: '3',
    name: 'Canada',
    value: 'ca',
  },
];

export function BillingAddress() {
  return (
    <div className="shadow-lg p-4 border border-gray-100 rounded-[10px]">
      <div className="space-y-4">
        {/* <h5 className="text-black text-base font-bold">Billing Address</h5>
        <Input label="Name" type="text" placeholder="Enter your name" />
        <div className="flex gap-2 justify-between">
          <Input label="Street" type="text" placeholder="Your street" />
          <Input label="City" type="text" placeholder="Your city" />
          <Input label="Country" type="text" placeholder="Your country" />
        </div> */}
        <div className="col-span-full">
          <CustomInputLabel label="Billing Address" isRequired />
          <div className="grid grid-cols-2 gap-4">
            <Input isRequired placeholder="Address" className="col-span-full" />
            <Input placeholder="Address Line 2 (Optional)" className="col-span-full" />
            <Input isRequired placeholder="City *" />
            <Input isRequired placeholder="State *" />
            <Input isRequired placeholder="Postal Code *" />{' '}
            <Select
              dropdownMenuClassName="w-[215px]"
              placeholder="Choose Country *"
              labelClassName={labelClassName}
              // selected={countryOptions}
              options={countryOptions}
              formatDisplay={(option) => option?.name}
              // onSelect={({ value }: { value: string }) => {
              //   setSelectedOrgValue(value);
              //   console.log(value);
              // }}
            />
            <Input isRequired placeholder="Phone Number *" />
          </div>
        </div>
        <div className="pt-3">
          <Button>Update Billing Address</Button>
        </div>
      </div>
    </div>
  );
}
