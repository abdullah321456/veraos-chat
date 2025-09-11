"use client";

import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/form-elements/input";
import { PasswordInput } from "@/components/atom/form-elements/password-input/password-input";
import { inputLabelStyles } from "@/components/atom/form-elements/styles/label-styles";
import { Select } from "@/components/atom/select";
import cn from "@/lib/utils/cn";
import { useRouter } from "next/navigation";
import { ScrollToTop } from "@/components/atom/scroll-to-top";
import { useSignupMultiStep } from "../utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormInputType, SignupFormSchema } from "../../signup/validation";
import { toast } from "sonner";
import { useSignup } from "../../signup/context/signup.context";

const labelClassName = cn(
  "block text-[#6D6F73]",
  inputLabelStyles.color.black,
  inputLabelStyles.size.md,
  inputLabelStyles.weight.medium
);

const organizationTypeOptions = [
  {
    id: "1",
    name: "Corporation",
    value: "Corporation",
  },
  {
    id: "2",
    name: "Government",
    value: "Government",
  },
];

const countryOptions = [
  {
    id: "1",
    name: "United States",
    value: "us",
  },
  {
    id: "2",
    name: "United Kingdom",
    value: "uk",
  },
  {
    id: "3",
    name: "Canada",
    value: "ca",
  },
];

export function AccountAndOrganizationInfoForm() {
  const router = useRouter();
  const { handleNext } = useSignupMultiStep();
  const { setBasicInfo } = useSignup();

  const form = useForm<SignupFormInputType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationType: '',
      organizationWebsite: '',
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      jobTitle: '',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const selectedOrganizationType = watch('organizationType');
  const selectedCountry = watch('country');

  async function onSubmit(inputs: SignupFormInputType) {
    try {
      // Here you can add your API call to save the data
      // const response = await apiService.postData('/api/auth/signup', inputs);
      setBasicInfo(inputs);
      handleNext();
      toast.success('Information saved successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5 w-[1020px]">
      <ScrollToTop />
      <BasicInfoForm register={register} errors={errors} />
      <OrganizationDetailsForm 
        register={register} 
        errors={errors} 
        setValue={setValue}
        selectedOrganizationType={selectedOrganizationType}
        selectedCountry={selectedCountry}
      />
      <div className="col-span-full flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Next'}
        </Button>
      </div>
    </form>
  );
}

function BasicInfoForm({ register, errors }: { register: any; errors: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100">
      <p className="text-lg font-bold mb-5">Basic Information</p>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-3 gap-x-3">
          <CustomInputLabel label="Full Name" isRequired />
          <Input {...register('firstName')} placeholder="First" error={errors.firstName?.message} />
          <Input {...register('middleName')} placeholder="Middle (Optional)" error={errors.middleName?.message} />
          <Input {...register('lastName')} placeholder="Last" error={errors.lastName?.message} />
        </div>
        <Input
          {...register('phoneNumber')}
          isRequired
          label="Phone Number"
          type="text"
          placeholder="Phone Number"
          error={errors.phoneNumber?.message}
        />
        <Input
          {...register('email')}
          isRequired
          label="Email Address"
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
        />
        <Input
          {...register('confirmEmail')}
          isRequired
          label="Confirm Email Address"
          type="email"
          placeholder="Re enter your email"
          error={errors.confirmEmail?.message}
        />
        <PasswordInput
          {...register('password')}
          isRequired
          label="Password"
          placeholder="Type your password"
          error={errors.password?.message}
        />
        <PasswordInput
          {...register('confirmPassword')}
          isRequired
          label="Confirm Password"
          placeholder="Re type your password"
          error={errors.confirmPassword?.message}
        />
      </div>
    </div>
  );
}

function OrganizationDetailsForm({ 
  register, 
  errors, 
  setValue,
  selectedOrganizationType,
  selectedCountry
}: { 
  register: any; 
  errors: any;
  setValue: any;
  selectedOrganizationType: string;
  selectedCountry: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-100">
      <p className="text-lg font-bold mb-5">Organization Details</p>
      <div className="grid grid-cols-2 gap-4">
        <Input
          {...register('organizationName')}
          isRequired
          className="col-span-full"
          label="Organization Name"
          placeholder="Enter your organization name"
          error={errors.organizationName?.message}
        />
        <Select
          isRequired
          dropdownMenuClassName="w-[215px]"
          placeholder="Choose type"
          labelClassName={labelClassName}
          label="Organization Type"
          options={organizationTypeOptions}
          formatDisplay={(option) => option?.name}
          error={errors.organizationType?.message}
          selected={organizationTypeOptions.find(option => option.value === selectedOrganizationType)}
          onSelect={({ value }: { value: string }) => {
            setValue('organizationType', value);
          }}
        />
        <Input
          {...register('organizationWebsite')}
          label="Organization Website"
          placeholder="Enter website"
          error={errors.organizationWebsite?.message}
        />
        <div className="col-span-full">
          <CustomInputLabel label="Business Address" isRequired />
          <div className="grid grid-cols-2 gap-4">
            <Input
              {...register('address')}
              isRequired
              placeholder="Address"
              className="col-span-full"
              error={errors.address?.message}
            />
            <Input
              {...register('addressLine2')}
              placeholder="Address Line 2 (Optional)"
              className="col-span-full"
              error={errors.addressLine2?.message}
            />
            <Input
              {...register('city')}
              isRequired
              placeholder="City *"
              error={errors.city?.message}
            />
            <Input
              {...register('state')}
              isRequired
              placeholder="State *"
              error={errors.state?.message}
            />
            <Input
              {...register('postalCode')}
              isRequired
              placeholder="Postal Code *"
              error={errors.postalCode?.message}
            />
            <Select
              isRequired
              dropdownMenuClassName="w-[215px]"
              placeholder="Choose Country *"
              labelClassName={labelClassName}
              options={countryOptions}
              formatDisplay={(option) => option?.name}
              error={errors.country?.message}
              selected={countryOptions.find(option => option.value === selectedCountry)}
              onSelect={({ value }: { value: string }) => {
                setValue('country', value);
              }}
            />
          </div>
        </div>
        <Input
          {...register('jobTitle')}
          label="Job Title"
          placeholder="Enter job title"
          error={errors.jobTitle?.message}
        />
      </div>
    </div>
  );
}

export function CustomInputLabel({
  label,
  isRequired,
}: {
  label: string;
  isRequired?: boolean;
}) {
  return (
    <p className={cn(labelClassName, "col-span-full")}>
      {label}
      <>{isRequired && <span className="text-red-500">*</span>}</>
    </p>
  );
}

// export function PaginationEntriesCount() {
//   const { setQueryParams, queryParams } = useQueryParams();
//   const per_page_entries = queryParams?.per_page_entries || '10';

//   const defaultValue = options.find(
//     (option) => option.value == per_page_entries
//   );

//   return (
//     <div className="flex items-center gap-3.5 text-xs">
//       <span>Show</span>
//       <Select
//         dropdownClassName="bg-transparent w-[70px] h-9"
//         dropdownMenuClassName="w-[70px] text-xs"
//         dropdownTriggerClassName="bg-transparent text-xs"
//         options={options}
//         selected={defaultValue || options[1]}
//         onSelect={({ value }: any) => {
//           setQueryParams({ per_page_entries: value.toString() });
//         }}
//       />
//       <span>Entries</span>
//     </div>
//   );
// }
