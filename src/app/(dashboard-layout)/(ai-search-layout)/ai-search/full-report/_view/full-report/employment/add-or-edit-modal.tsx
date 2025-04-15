'use client';

import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { Textarea } from '@/components/atom/form-elements/textarea';
import { useModal } from '@/components/modal-views/use-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { EmploymentFormInputType, EmploymentFormValidationSchema } from './validation';
import dayjs from 'dayjs';

type Props = {
  onAdd?: (data: EmploymentFormInputType) => void;
  onEdit?: (data: EmploymentFormInputType & { id: number }) => void;
  value?: EmploymentFormInputType & { id: number };
};

function getDefaultValues(value?: EmploymentFormInputType & { id: number }) {
  return {
    companyName: value?.companyName || '',
    position: value?.position || '',
    startDate: value?.startDate || null,
    endDate: value?.endDate || null,
    responsibilities: value?.responsibilities || '',
  } as EmploymentFormInputType;
}

function AddOrEditEmploymentModalComponent({ onAdd, onEdit, value }: Props) {
  const { closeModal } = useModal();
  const methods = useForm<EmploymentFormInputType>({
    resolver: zodResolver(EmploymentFormValidationSchema),
    defaultValues: getDefaultValues(value),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  function onSubmit(inputs: EmploymentFormInputType) {
    if (value) {
      onEdit?.({ ...inputs, id: value.id });
    } else {
      onAdd?.(inputs);
    }
    closeModal();

    console.log('inputs', inputs);
  }

  const submitButtonText = value ? 'Save' : 'Add';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3">
      <div className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          label="Company Name"
          placeholder="Enter company name"
          {...register('companyName')}
          error={errors.companyName?.message}
        />
        <Input isRequired label="Position" placeholder="Enter position" {...register('position')} error={errors.position?.message} />
        <Controller
          control={methods.control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <Input
              isRequired
              label="Start Date"
              type="date"
              value={value?.toISOString()?.split('T')[0] ?? null}
              onChange={(e) => {
                const value = e.target.value;
                console.log('value', value);
                // onChange(value ? dayjs(value).toDate() : null);
              }}
              error={errors.startDate?.message}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <Input
              isRequired
              label="End Date"
              type="date"
              value={value?.toISOString()?.split('T')[0]}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value ? dayjs(value).toDate() : null);
              }}
              error={errors.endDate?.message}
            />
          )}
        />
        <Textarea
          isRequired
          label="Responsibilities"
          placeholder="Enter Responsibilities"
          className="col-span-full"
          {...register('responsibilities')}
          error={errors.responsibilities?.message}
        />
      </div>
      <div className="flex justify-end gap-2 mt-8">
        <Button onClick={() => closeModal()} type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">{submitButtonText}</Button>
      </div>
    </form>
  );
}

AddOrEditEmploymentModalComponent.containerClassName = 'w-[500px]';
export const AddOrEditEmploymentModal = AddOrEditEmploymentModalComponent;
