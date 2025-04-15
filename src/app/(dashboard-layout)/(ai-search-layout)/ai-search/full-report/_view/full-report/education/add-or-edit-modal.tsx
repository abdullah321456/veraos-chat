'use client';

import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { useModal } from '@/components/modal-views/use-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { FormInputType, FormValidationSchema } from './validation';

type Props = {
  onAdd?: (data: FormInputType) => void;
  onEdit?: (data: FormInputType & { id: number }) => void;
  value?: FormInputType & { id: number };
};

function getDefaultValues(value?: FormInputType & { id: number }) {
  return {
    institution: value?.institution || '',
    degree: value?.degree || '',
    graduationDate: value?.graduationDate || null,
    gpa: value?.gpa || '',
  } as FormInputType;
}

function AddOrEditModalComponent({ onAdd, onEdit, value }: Props) {
  const { closeModal } = useModal();
  const methods = useForm<FormInputType>({
    resolver: zodResolver(FormValidationSchema),
    defaultValues: getDefaultValues(value),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  function onSubmit(inputs: FormInputType) {
    if (value) {
      onEdit?.({ ...inputs, id: value.id });
    } else {
      onAdd?.(inputs);
    }
    closeModal();
  }

  const submitButtonText = value ? 'Save' : 'Add';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3">
      <div className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          label="Institution"
          placeholder="Enter institution"
          {...register('institution')}
          error={errors.institution?.message}
        />
        <Input isRequired label="Degree" placeholder="Enter degree" {...register('degree')} error={errors.degree?.message} />
        {/* <Input isRequired label="Start Date" type="date" {...register('startDate')} error={errors.startDate?.message} />
        <Input isRequired label="End Date" type="date" {...register('endDate')} error={errors.endDate?.message} /> */}
        <Controller
          control={methods.control}
          name="graduationDate"
          render={({ field: { onChange, value } }) => (
            <Input
              isRequired
              label="Graduation Date"
              type="date"
              value={value?.toISOString()?.split('T')[0]}
              onChange={(e) => {
                const value = e.target.value;
                onChange(value ? dayjs(value).toDate() : null);
              }}
              error={errors.graduationDate?.message}
            />
          )}
        />
        <Input isRequired label="GPA" placeholder="Enter GPA" {...register('gpa')} error={errors.gpa?.message} />
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

AddOrEditModalComponent.containerClassName = 'w-[500px]';
export const AddOrEditModal = AddOrEditModalComponent;
