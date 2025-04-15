'use client';

import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { useModal } from '@/components/modal-views/use-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { FormInputType, FormValidationSchema } from './validation';
import { Textarea } from '@/components/atom/form-elements/textarea';

type Props = {
  onAdd?: (data: FormInputType) => void;
  onEdit?: (data: FormInputType & { id: number }) => void;
  value?: FormInputType & { id: number };
};

function getDefaultValues(value?: FormInputType & { id: number }) {
  return {
    amount: value?.amount || null,
    rate: value?.rate || null,
    description: value?.description || '',
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
          prefix="$"
          isRequired
          type="number"
          label="Amount"
          placeholder="Enter amount"
          {...register('amount')}
          error={errors.amount?.message}
        />
        <Input
          suffix="%"
          isRequired
          type="number"
          label="Rate"
          placeholder="Enter rate"
          {...register('rate')}
          error={errors.rate?.message}
        />
        <Textarea
          isRequired
          label="Description"
          placeholder="Enter description"
          className="col-span-full"
          {...register('description')}
          error={errors.description?.message}
        />{' '}
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
