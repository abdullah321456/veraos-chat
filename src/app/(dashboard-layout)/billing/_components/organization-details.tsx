'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';
import { useUser } from '@/lib/hooks/use-user';
import { useState, useEffect } from 'react';

const labelClassName = cn('block text-black', inputLabelStyles.color.black, inputLabelStyles.size.md, inputLabelStyles.weight.normal);

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

export function OrganizationDetails() {
  const { userData, loading, error } = useUser();
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    organizationWebsite: '',
    address: '',
    country: '',
    jobId: '',
  });

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        organizationName: userData.organizationName || '',
        organizationType: userData.organizationType || '',
        organizationWebsite: userData.organizationWebsite || '',
        address: userData.address || '',
        country: userData.country || '',
        jobId: userData.jobId || '',
      });
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = () => {
    // TODO: Implement update organization details API call
    console.log('Update organization details:', formData);
  };

  if (loading) {
    return (
      <div className="shadow-lg p-4 border border-gray-100 rounded-[10px]">
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
      <div className="shadow-lg p-4 border border-gray-100 rounded-[10px]">
        <div className="text-red-500 text-center py-8">
          <p>Failed to load organization information</p>
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-lg p-4 border border-gray-100 rounded-[10px]">
      <div className="space-y-4">
        <h5 className="text-black text-base font-bold">Organization Details</h5>
        <Input 
          label="Organization Name" 
          type="text" 
          placeholder="Enter organization name" 
          value={formData.organizationName}
          onChange={(e) => handleInputChange('organizationName', e.target.value)}
        />
        <div className="flex gap-2">
          <div className="w-1/2">
            <Select
              dropdownMenuClassName="w-[334px]"
              placeholder="Choose organization type"
              labelClassName={labelClassName}
              label="Organization Type"
              selected={organizationTypeOptions.find(option => option.value === formData.organizationType)}
              options={organizationTypeOptions}
              formatDisplay={(option) => option?.name}
              onSelect={({ value }: { value: string }) => {
                handleInputChange('organizationType', value);
              }}
            />
          </div>
          <Input 
            label="Organization Website" 
            type="text" 
            placeholder="Enter organization website" 
            className="w-1/2" 
            value={formData.organizationWebsite}
            onChange={(e) => handleInputChange('organizationWebsite', e.target.value)}
          />
        </div>
        <Input 
          label="Business Address" 
          type="text" 
          placeholder="Enter business address" 
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
        <div className="flex gap-2">
          <div className="w-1/2">
            <Select
              dropdownMenuClassName="w-[334px]"
              placeholder="Choose country"
              labelClassName={labelClassName}
              label="Country"
              selected={countryOptions.find(option => option.value === formData.country)}
              options={countryOptions}
              formatDisplay={(option) => option?.name}
              onSelect={({ value }: { value: string }) => {
                handleInputChange('country', value);
              }}
            />
          </div>
          <Input 
            label="Agency or Department ID Number (if applicable)" 
            type="text" 
            placeholder="Enter ID" 
            className="w-1/2" 
            value={formData.jobId}
            onChange={(e) => handleInputChange('jobId', e.target.value)}
          />
        </div>
        <div className="pt-3">
          <Button onClick={handleUpdate}>Update Organization Details</Button>
        </div>
      </div>
    </div>
  );
}
