'use client';
import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import cn from '@/lib/utils/cn';
import { useUser } from '@/lib/hooks/use-user';
import { useState, useEffect } from 'react';

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
  const { userData, loading, error, updateProfile, updating } = useUser();
  const [formData, setFormData] = useState({
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
  });

  // Update form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        address: userData.address || '',
        addressLine2: userData.addressLine2 || '',
        city: userData.city || '',
        state: userData.state || '',
        postalCode: userData.postalCode || '',
        country: userData.country || '',
        phoneNumber: userData.phoneNumber || '',
      });
    }
  }, [userData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {
    const success = await updateProfile({
      address: formData.address,
      addressLine2: formData.addressLine2,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      phoneNumber: formData.phoneNumber,
    });
    
    if (success) {
      console.log('Billing address updated successfully');
    }
  };

  if (loading) {
    return (
      <div className="shadow-lg p-3 sm:p-4 border border-gray-100 rounded-[10px]">
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
      <div className="shadow-lg p-3 sm:p-4 border border-gray-100 rounded-[10px]">
        <div className="text-red-500 text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base">Failed to load billing information</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 break-words">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-lg p-3 sm:p-4 border border-gray-100 rounded-[10px]">
      <div className="space-y-4">
        <div className="col-span-full">
          <CustomInputLabel label="Billing Address" isRequired />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input 
              isRequired 
              placeholder="Address" 
              className="col-span-full" 
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <Input 
              placeholder="Address Line 2 (Optional)" 
              className="col-span-full" 
              value={formData.addressLine2}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
            />
            <Input 
              isRequired 
              placeholder="City *" 
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            <Input 
              isRequired 
              placeholder="State *" 
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
            <Input 
              isRequired 
              placeholder="Postal Code *" 
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
            />
            <Select
              dropdownMenuClassName="w-full sm:w-[215px]"
              placeholder="Choose Country *"
              labelClassName={labelClassName}
              selected={countryOptions.find(option => option.value === formData.country)}
              options={countryOptions}
              formatDisplay={(option) => option?.name}
              onSelect={({ value }: { value: string }) => {
                handleInputChange('country', value);
              }}
            />
            <Input 
              isRequired 
              placeholder="Phone Number *" 
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </div>
        </div>
        <div className="pt-2 sm:pt-3">
          <Button 
            onClick={handleUpdate} 
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
            {updating ? 'Updating...' : 'Update Billing Address'}
          </Button>
        </div>
      </div>
    </div>
  );
}
