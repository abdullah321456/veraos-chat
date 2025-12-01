'use client';
import React, { useState, useEffect } from 'react';
import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';
import { useUser } from '@/lib/hooks/use-user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const labelClassName = cn('block text-[#6D6F73]', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.medium);

// Validation schemas
const UserInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  confirmEmail: z.string().email('Invalid email address'),
  jobTitle: z.string().optional(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

const OrganizationInfoSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationType: z.string().min(1, 'Organization type is required'),
  organizationWebsite: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

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
  const { userData, updateProfile, updating } = useUser();
  const [isEditing, setIsEditing] = useState(true);

  const userForm = useForm({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      confirmEmail: '',
      jobTitle: '',
    },
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      userForm.reset({
        firstName: userData.firstName || '',
        middleName: userData.middleName || '',
        lastName: userData.lastName || '',
        phoneNumber: userData.phoneNumber || '',
        email: userData.email || '',
        confirmEmail: userData.confirmEmail || userData.email || '',
        jobTitle: userData.jobTitle || '',
      });
    }
  }, [userData, userForm]);

  const handleSave = async (data: any) => {
    const success = await updateProfile({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      confirmEmail: data.confirmEmail,
      jobTitle: data.jobTitle,
    });
    
    if (success) {
      // Form remains editable after save
    }
  };

  const handleSaveClick = () => {
    userForm.handleSubmit(handleSave)();
  };

  const handleCancel = () => {
    if (userData) {
      userForm.reset({
        firstName: userData.firstName || '',
        middleName: userData.middleName || '',
        lastName: userData.lastName || '',
        phoneNumber: userData.phoneNumber || '',
        email: userData.email || '',
        confirmEmail: userData.confirmEmail || userData.email || '',
        jobTitle: userData.jobTitle || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <p className="text-sm sm:text-base font-bold">User Information</p>
      </div>
      
      <form onSubmit={handleSaveClick} className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-3">
          <CustomInputLabel label="Full Name" isRequired />
          <Input 
            placeholder="First" 
            {...userForm.register('firstName')}
            error={userForm.formState.errors.firstName?.message}
            disabled={!isEditing}
          />
          <Input 
            placeholder="Middle (Optional)" 
            {...userForm.register('middleName')}
            error={userForm.formState.errors.middleName?.message}
            disabled={!isEditing}
          />
          <Input 
            placeholder="Last" 
            {...userForm.register('lastName')}
            error={userForm.formState.errors.lastName?.message}
            disabled={!isEditing}
          />
        </div>
        <Input 
          isRequired 
          label="Phone Number" 
          type="text" 
          placeholder="Phone Number" 
          {...userForm.register('phoneNumber')}
          error={userForm.formState.errors.phoneNumber?.message}
          disabled={true}
        />
        <Input 
          isRequired 
          label="Email Address" 
          type="email" 
          placeholder="Email address" 
          {...userForm.register('email')}
          error={userForm.formState.errors.email?.message}
          disabled={true}
        />
        <Input 
          isRequired 
          label="Confirm Email Address" 
          type="email" 
          placeholder="Re enter your email" 
          {...userForm.register('confirmEmail')}
          error={userForm.formState.errors.confirmEmail?.message}
          disabled={true}
        />
        <Input 
          label="Job Title" 
          placeholder="Enter job title" 
          {...userForm.register('jobTitle')}
          error={userForm.formState.errors.jobTitle?.message}
          disabled={!isEditing}
        />
        
        <div className="flex justify-end gap-3 col-span-full">
          <Button 
            type="button" 
            onClick={handleSaveClick} 
            disabled={updating} 
            className="w-full sm:w-auto rounded-[6px] border-0"
            style={{
              background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)',
              paddingTop: '11px',
              paddingRight: '20px',
              paddingBottom: '11px',
              paddingLeft: '20px'
            }}
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

function OrganizationInfo() {
  const { userData, updateProfile, updating } = useUser();
  const [isEditing, setIsEditing] = useState(true);

  const orgForm = useForm({
    resolver: zodResolver(OrganizationInfoSchema),
    defaultValues: {
      organizationName: '',
      organizationType: '',
      organizationWebsite: '',
      address: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  });

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      orgForm.reset({
        organizationName: userData.organizationName || '',
        organizationType: userData.organizationType || '',
        organizationWebsite: userData.organizationWebsite || '',
        address: userData.address || '',
        addressLine2: userData.addressLine2 || '',
        city: userData.city || '',
        state: userData.state || '',
        postalCode: userData.postalCode || '',
        country: userData.country || '',
      });
    }
  }, [userData, orgForm]);

  const handleSave = async (data: any) => {
    const success = await updateProfile(data);
    
    if (success) {
      // Form remains editable after save
    }
  };

  const handleSaveClick = () => {
    orgForm.handleSubmit(handleSave)();
  };

  const handleCancel = () => {
    if (userData) {
      orgForm.reset({
        organizationName: userData.organizationName || '',
        organizationType: userData.organizationType || '',
        organizationWebsite: userData.organizationWebsite || '',
        address: userData.address || '',
        addressLine2: userData.addressLine2 || '',
        city: userData.city || '',
        state: userData.state || '',
        postalCode: userData.postalCode || '',
        country: userData.country || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <p className="text-sm sm:text-base font-bold">Organization Details</p>
      </div>
      
      <form onSubmit={handleSaveClick} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input 
          isRequired 
          className="col-span-full" 
          label="Organization Name" 
          placeholder="Enter your organization name" 
          {...orgForm.register('organizationName')}
          error={orgForm.formState.errors.organizationName?.message}
          disabled={!isEditing}
        />
        <Select
          isRequired
          dropdownMenuClassName="w-full sm:w-[215px]"
          placeholder="Choose type"
          labelClassName={labelClassName}
          label="Organization Type"
          selected={organizationTypeOptions.find(option => option.value === orgForm.watch('organizationType'))}
          options={organizationTypeOptions}
          formatDisplay={(option) => option?.name}
          onSelect={({ value }: { value: string }) => {
            orgForm.setValue('organizationType', value);
          }}
          disabled={!isEditing}
        />
        <Input 
          isRequired 
          label="Organization Website" 
          placeholder="Enter website" 
          {...orgForm.register('organizationWebsite')}
          error={orgForm.formState.errors.organizationWebsite?.message}
          disabled={!isEditing}
        />
        <div className="col-span-full">
          <CustomInputLabel label="Business Address" isRequired />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input 
              isRequired 
              placeholder="Address" 
              className="col-span-full" 
              {...orgForm.register('address')}
              error={orgForm.formState.errors.address?.message}
              disabled={!isEditing}
            />
            <Input 
              placeholder="Address Line 2 (Optional)" 
              className="col-span-full" 
              {...orgForm.register('addressLine2')}
              error={orgForm.formState.errors.addressLine2?.message}
              disabled={!isEditing}
            />
            <Input 
              isRequired 
              placeholder="City *" 
              {...orgForm.register('city')}
              error={orgForm.formState.errors.city?.message}
              disabled={!isEditing}
            />
            <Input 
              isRequired 
              placeholder="State *" 
              {...orgForm.register('state')}
              error={orgForm.formState.errors.state?.message}
              disabled={!isEditing}
            />
            <Input 
              isRequired 
              placeholder="Postal Code *" 
              {...orgForm.register('postalCode')}
              error={orgForm.formState.errors.postalCode?.message}
              disabled={!isEditing}
            />
            <Select
              dropdownMenuClassName="w-full sm:w-[215px]"
              placeholder="Choose Country *"
              labelClassName={labelClassName}
              selected={countryOptions.find(option => option.value === orgForm.watch('country'))}
              options={countryOptions}
              formatDisplay={(option) => option?.name}
              onSelect={({ value }: { value: string }) => {
                orgForm.setValue('country', value);
              }}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3 col-span-full">
          <Button 
            type="button" 
            onClick={handleSaveClick} 
            disabled={updating} 
            className="w-full sm:w-auto rounded-[6px] border-0"
            style={{
              background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)',
              paddingTop: '11px',
              paddingRight: '20px',
              paddingBottom: '11px',
              paddingLeft: '20px'
            }}
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ProfileInformation() {
  const { userData, loading, error } = useUser();

  if (loading) {
    return (
      <div className="mt-[14px] space-y-6 pb-1">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[14px] space-y-6 pb-1">
        <div className="text-red-500 text-center py-8">
          <p>Failed to load user information</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="mt-[14px] space-y-6 pb-1">
        <div className="text-gray-500 text-center py-8">
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-[14px] space-y-6 pb-1">
      <UserInfo />
      {userData?.role === 'organization' && (
        <>
          <hr />
          <OrganizationInfo />
        </>
      )}
    </form>
  );
}
