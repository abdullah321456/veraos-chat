'use client';
import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';

const labelClassName = cn('block text-[#6D6F73]', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.medium);

const organizationTypeOptions = [
  {
    id: '1',
    name: 'Corporation',
    value: 'Corporation',
  },
  {
    id: '2',
    name: 'Government',
    value: 'Government',
  },
];

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

function UserInfo() {
  return (
    <div>
      <p className="text-base font-bold mb-5">User Information</p>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-3 gap-x-3">
          <CustomInputLabel label="Full Name" isRequired />
          <Input placeholder="First" />
          <Input placeholder="Middle (Optional)" />
          <Input placeholder="Last" />
        </div>
        <Input isRequired label="Phone Number" type="text" placeholder="Phone Number" />
        <Input isRequired label="Email Address" type="email" placeholder="Email address" />
        <Input isRequired label="Confirm Email Address" type="email" placeholder="Re enter your email" />
        <div className="flex justify-end col-span-full">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
function OrganizationInfo() {
  // const [selectedOrgValue, setSelectedOrgValue] = useState('');
  // const selectedOrgOption = organizationTypeOptions.find((option) => option.value === selectedOrgValue);
  return (
    <div>
      <p className="text-base font-bold mb-5">Organization Details</p>
      <div className="grid grid-cols-2 gap-4">
        <Input isRequired className="col-span-full" label="Organization Name" placeholder="Enter your organization name" />
        <Select
          isRequired
          dropdownMenuClassName="w-[215px]"
          placeholder="Choose type"
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
        <Input isRequired label="Organization Website" placeholder="Enter website" />
        <div className="col-span-full">
          <CustomInputLabel label="Business Address" isRequired />
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
          </div>
        </div>
        <Input label="Job Title" placeholder="Enter job title" />
        <Input label="Job ID" placeholder="Enter job ID" />
        <div className="flex justify-end col-span-full">
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}

export function ProfileInformation() {
  return (
    <form className="mt-[14px] space-y-6 pb-1">
      <UserInfo />
      <hr />
      <OrganizationInfo />
    </form>
  );
}
