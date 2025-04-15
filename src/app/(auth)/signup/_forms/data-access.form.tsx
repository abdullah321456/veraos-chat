'use client';

import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Textarea } from '@/components/atom/form-elements/textarea';
import cn from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';
import { useSignupMultiStep } from '../utils';
import { Button } from '@/components/atom/button';
import { ScrollToTop } from '@/components/atom/scroll-to-top';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DataAccessFormInputType, DataAccessFormSchema } from '../validation';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useSignup } from '../../signup/context/signup.context';

const labelClassName = cn(
  'block text-[#6D6F73]',
  inputLabelStyles.color.black,
  inputLabelStyles.size.md,
  inputLabelStyles.weight.medium,
  'mb-4'
);

const accessNeeds = [
  'Domestic Data (USA)',
  'Technology and Device Data',
  'International Data',
  'Specialized Investigative Data',
  'Criminal and Legal Data',
  'Financial and Crypto Data',
  'PII and Demographic Data',
  'Employment and Education Data',
  'Property and Vehicle Data',
  'Biometric Data',
];

export function DataAccessForm() {
  const router = useRouter();
  const { handleNext } = useSignupMultiStep();
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const { setDataAccessInfo } = useSignup();

  const form = useForm<DataAccessFormInputType>({
    resolver: zodResolver(DataAccessFormSchema),
    defaultValues: {
      intendedUse: '',
      dataAccessNeeds: [],
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = form;

  // Watch form values for debugging
  const formValues = watch();
  useEffect(() => {
    console.log('Form values:', formValues);
    console.log('Is valid:', isValid);
    console.log('Errors:', errors);
    console.log('Dirty fields:', dirtyFields);
  }, [formValues, isValid, errors, dirtyFields]);

  const handleNeedSelection = (need: string) => {
    const newSelectedNeeds = selectedNeeds.includes(need)
      ? selectedNeeds.filter(n => n !== need)
      : [...selectedNeeds, need];
    
    setSelectedNeeds(newSelectedNeeds);
    setValue('dataAccessNeeds', newSelectedNeeds, { shouldValidate: true });
  };

  async function onSubmit(inputs: DataAccessFormInputType) {
    try {
      // Here you can add your API call to save the data
      // const response = await apiService.postData('/api/auth/data-access', inputs);
      setDataAccessInfo(inputs);
      handleNext();
      toast.success('Information saved successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[560px] mx-auto">
      <ScrollToTop />
      <Textarea
        {...register('intendedUse')}
        label="Describe Your Intended Use"
        placeholder="Write a description here..."
        textareaClassName="resize-none min-h-[172px]"
        error={errors.intendedUse?.message}
      />
      <DataAccessNeed 
        selectedNeeds={selectedNeeds}
        onNeedSelection={handleNeedSelection}
        error={errors.dataAccessNeeds?.message}
      />
      <div className="col-span-full flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !isValid}
          className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isSubmitting ? 'Saving...' : 'Next'}
        </Button>
      </div>
    </form>
  );
}

function DataAccessNeed({ 
  selectedNeeds, 
  onNeedSelection,
  error 
}: { 
  selectedNeeds: string[];
  onNeedSelection: (need: string) => void;
  error?: string;
}) {
  return (
    <div>
      <p className={labelClassName}>Data Access Needs</p>
      <div className="grid grid-cols-9 gap-y-3">
        {accessNeeds.map((need, index) => (
          <Checkbox
            key={index}
            label={need}
            className="col-span-4"
            checked={selectedNeeds.includes(need)}
            onChange={() => onNeedSelection(need)}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
