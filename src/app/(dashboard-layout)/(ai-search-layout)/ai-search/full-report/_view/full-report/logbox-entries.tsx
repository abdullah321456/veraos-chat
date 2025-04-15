'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import { useModal } from '@/components/modal-views/use-modal';
import { ModalHeader } from '@/components/atom/modal-header';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { Select } from '@/components/atom/select';
import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { zodUtils } from '@/lib/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PiPencil, PiTrash } from 'react-icons/pi';

const AddressInputSchema = z.object({
  address: zodUtils.getStringSchema({ name: 'Address', minErrorMessage: 'Address is required', min: 1 }),
  addressLine2: z.string().optional(),
  city: zodUtils.getStringSchema({ name: 'City', minErrorMessage: 'City is required', min: 1 }),
  state: zodUtils.getStringSchema({ name: 'State', minErrorMessage: 'State is required', min: 1 }),
  postalCode: zodUtils.getStringSchema({ name: 'Postal Code', minErrorMessage: 'Postal Code is required', min: 1 }),
  country: z.string({ required_error: 'Country is required' }).min(1, { message: 'Country is required' }),
});

const FormInputSchema = z.object({
  name: zodUtils.getStringSchema({ name: 'Name', min: 1, minErrorMessage: 'Name is required' }),
  relationship: zodUtils.getStringSchema({ name: 'Relationship', min: 1, minErrorMessage: 'Relationship is required' }),
  phone: zodUtils.getStringSchema({ name: 'Phone', min: 1, minErrorMessage: 'Phone is required' }),
  email: zodUtils.getEmailSchema({ name: 'Email', minErrorMessage: 'Email is required' }),
  addresses: z.array(AddressInputSchema).min(1, { message: 'At least one address is required' }),
});

type AddressInputType = z.infer<typeof AddressInputSchema>;
type FormInputType = z.infer<typeof FormInputSchema>;

type LogBookEntriesProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};

const DUMMY_DATA: FormInputType[] = [
  {
    name: 'John Doe',
    relationship: 'Friend',
    phone: '123-456-7890',
    email: 'U7m1O@example.com',
    addresses: [
      {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'us',
      },
    ],
  },
];

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

export function LogBookEntries({ isEditable = false, isDrawer }: LogBookEntriesProps) {
  const { openModal } = useModal();
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [entries, setEntries] = useState(DUMMY_DATA);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }

  function handleOpenAddModal() {
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Add Associate" />
          <AddEditEntryModal onSave={(data) => setEntries((prev) => [...prev, data])} />
        </>
      ),
    });
  }

  function handleOpenEditModal(data: FormInputType, index: number) {
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Add New" />
          <AddEditEntryModal
            value={data}
            onSave={(data) => {
              setEntries((prev) => prev.map((item, i) => (i === index ? data : item)));
            }}
          />
        </>
      ),
    });
  }

  function handleRemove(index: number) {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Accordion
      translateButton={isEditable}
      title="Persons of Interest"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer ? 'grid  gap-3' : 'grid grid-cols-2  gap-3')}>
        {entries.map((associate, index) => (
          <Single
            key={index}
            index={index}
            data={associate}
            showRemove={editable}
            onRemove={() => handleRemove(index)}
            onRequestEdit={() => handleOpenEditModal(associate, index)}
          />
        ))}
      </div>
      {editable && (
        <button onClick={handleOpenAddModal} className="mt-3 text-primary text-xs">
          + Add New
        </button>
      )}
    </Accordion>
  );
}

function Single({
  data,
  showRemove,
  index,
  onRemove,
  onRequestEdit,
}: {
  data: FormInputType;
  showRemove?: boolean;
  index: number;
  onRemove: (index: number) => void;
  onRequestEdit?: () => void;
}) {
  return (
    <div className="border rounded-lg py-1.5 px-2.5 relative ">
      <div className="flex justify-between items-center">
        <p className="text-xs">Known Associate {index + 1}</p>
        <div className="flex gap-2">
          <button>{showRemove && <PiTrash className="text-red-500 cursor-pointer" size={16} onClick={() => onRemove(index)} />}</button>
          <button>{showRemove && <PiPencil className="text-primary cursor-pointer" size={16} onClick={onRequestEdit} />}</button>
        </div>
      </div>
      <div className="space-y-1.5 mt-2 mb-4">
        <p className="text-black font-medium text-xs leading-5">
          Name: <span className="text-black text-xs font-normal leading-4">{data.name}</span>
        </p>
        <p className="text-black font-medium text-xs leading-5">
          Relationship: <span className="text-black text-xs font-normal leading-4">{data.relationship}</span>
        </p>
        <p className="text-black font-medium text-xs leading-5">
          Phone Number: <span className="text-black text-xs font-normal leading-4">{data.phone}</span>
        </p>
        <p className="text-black font-medium text-xs leading-5">
          Email: <span className="text-black text-xs font-normal leading-4">{data.email}</span>
        </p>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.addresses.map((address, index) => (
          <div key={index} className='bg-gray-50 border border-gray-100 p-2 rounded-md'>
            <p className="text-xs">Address {index + 1}</p>
            <div className="space-y-0.5 mt-2">
              <p className="text-black font-medium text-xs leading-5">
                Address: <span className="text-black text-xs font-normal leading-4">{address.address}</span>
              </p>
              {address.addressLine2 && (
                <p className="text-black font-medium text-xs leading-5">
                  Address Line 2: <span className="text-black text-xs font-normal leading-4">{address.addressLine2}</span>
                </p>
              )}
              <p className="text-black font-medium text-xs leading-5">
                City: <span className="text-black text-xs font-normal leading-4">{address.city}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                State: <span className="text-black text-xs font-normal leading-4">{address.state}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Postal Code: <span className="text-black text-xs font-normal leading-4">{address.postalCode}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Country: <span className="text-black text-xs font-normal leading-4">{address.country}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// address, address-line-2  [], city,state,postal code, country

function AddEditEntryModal({ onSave, value }: { value?: FormInputType; onSave: (inputs: FormInputType) => void }) {
  const { closeModal } = useModal();
  const methods = useForm<FormInputType>({
    resolver: zodResolver(FormInputSchema),
    defaultValues: value ?? {
      name: '',
      relationship: '',
      phone: '',
      email: '',
      addresses: [{ address: '', addressLine2: '', city: '', state: '', postalCode: '', country: '' }],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
  } = methods;

  console.log('watch', watch());
  console.log('errors', errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  function onSubmit(inputs: FormInputType) {
    console.log('inputs', inputs);
    onSave?.(inputs);
    closeModal();
  }

  function handleRemove(index: number) {
    if (fields?.length === 1) return;
    remove(index);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-3">
        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1 mb-4">
          <Input label="Name" placeholder="Name" {...register('name')} error={errors?.name?.message} />
          <Input label="Relationship" placeholder="Relationship" {...register('relationship')} error={errors?.relationship?.message} />
          <Input label="Phone Number" placeholder="Phone Number" {...register('phone')} error={errors?.phone?.message} />
          <Input label="Email" placeholder="Email" {...register('email')} error={errors?.email?.message} />
          <div className="col-span-full mt-4">
            <div className="space-y-4">
              {fields?.map((field, index) => (
                <AddressInput
                  hideRemoveButton={fields?.length === 1}
                  key={field.id}
                  index={index}
                  handleRemove={handleRemove}
                  title={`Address ${fields?.length > 1 ? index + 1 : ''}`}
                />
              ))}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => append({ address: '', addressLine2: '', city: '', state: '', postalCode: '', country: '' })}
                  className="text-primary text-xs inline-block"
                >
                  +Add Address
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full grid grid-cols-2 gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="submit">{value ? 'Save' : 'Add'}</Button>
        </div>
      </form>
    </FormProvider>
  );
}

function AddressInput({
  index,
  handleRemove,
  title,
  hideRemoveButton = false,
}: {
  index: number;
  handleRemove: (index: number) => void;
  title: string;
  hideRemoveButton: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputType>();
  return (
    <div className="col-span-full">
      <div className="flex justify-between">
        <CustomInputLabel label={title} isRequired />
        {!hideRemoveButton && (
          <button typeof="button" className="text-red-500 text-xs inline-block" type="button" onClick={() => handleRemove(index)}>
            - Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          isRequired
          placeholder="Address"
          className="col-span-full"
          {...register(`addresses.${index}.address`)}
          error={errors?.addresses?.[index]?.address?.message}
        />
        <Input
          placeholder="Address Line 2 (Optional)"
          className="col-span-full"
          {...register(`addresses.${index}.addressLine2`)}
          error={errors?.addresses?.[index]?.addressLine2?.message}
        />
        <Input isRequired placeholder="City *" {...register(`addresses.${index}.city`)} error={errors?.addresses?.[index]?.city?.message} />
        <Input
          isRequired
          placeholder="State *"
          {...register(`addresses.${index}.state`)}
          error={errors?.addresses?.[index]?.state?.message}
        />
        <Input
          isRequired
          placeholder="Postal Code *"
          {...register(`addresses.${index}.postalCode`)}
          error={errors?.addresses?.[index]?.postalCode?.message}
        />
        <Controller
          name={`addresses.${index}.country`}
          control={useFormContext().control}
          render={({ field: { onChange, value } }) => {
            const selected = countryOptions.find((option) => option.value === value);
            return (
              <Select
                selected={selected}
                onSelect={(val: { value: string; name: string }) => onChange(val.value)}
                inPortal={false}
                isRequired
                placeholder="Country *"
                options={countryOptions}
                error={errors?.addresses?.[index]?.country?.message}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
