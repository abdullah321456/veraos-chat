import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { Button } from '@/components/atom/button';
import { ConfirmModal } from '@/components/atom/confirm-modal';
import { Dropdown } from '@/components/atom/dropdown/dropdown';
import { Input } from '@/components/atom/form-elements/input';
import { inputLabelStyles } from '@/components/atom/form-elements/styles/label-styles';
import { ModalHeader } from '@/components/atom/modal-header';
import { Select } from '@/components/atom/select';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import { zodUtils } from '@/lib/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { PiPencil, PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { z } from 'zod';

const FormInputSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
    address: zodUtils.getStringSchema({ name: 'Address', minErrorMessage: 'Address is required', min: 1 }),
    addressLine2: z.string().optional(),
    city: zodUtils.getStringSchema({ name: 'City', minErrorMessage: 'City is required', min: 1 }),
    state: zodUtils.getStringSchema({ name: 'State', minErrorMessage: 'State is required', min: 1 }),
    postalCode: zodUtils.getStringSchema({ name: 'Postal Code', minErrorMessage: 'Postal Code is required', min: 1 }),
    country: z.string({ required_error: 'Country is required' }).min(1, { message: 'Country is required' }),
    officeTitle: z.string().min(1, { message: 'Office title is required' }),
    role: z.string({ required_error: 'Role is required' }).min(1, { message: 'Role is required' }),
    addUserLimit: z.coerce
      .number({ required_error: 'Add user limit is required', invalid_type_error: 'Add user limit is required' })
      .nullish(),
  })
  .superRefine((inputs, ctx) => {
    if (inputs.role === 'Department Head' && !inputs.addUserLimit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Add user limit is required',
      });
      return z.NEVER;
    }
  });

type FormInputType = z.infer<typeof FormInputSchema>;

export default function UserRolesAndPermission() {
  const { openModal, closeModal } = useModal();

  // const [users, setUsers] = useState([
  //   { name: 'John Doe', permission: 'Owner' },
  //   { name: 'John Smith', permission: 'Department Head' },
  //   { name: 'Emily White', permission: 'Team Member' },
  // ]);

  const [users, setUsers] = useState<FormInputType[]>([
    {
      firstName: 'John',
      middleName: '',
      lastName: 'Doe',
      role: 'Owner',
      phoneNumber: '123-456-7890',
      email: 'U7m1O@example.com',
      address: '123 Main St',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'us',
      officeTitle: 'CEO',
      addUserLimit: null,
    },
    {
      firstName: 'John',
      middleName: '',
      lastName: 'Smith',
      role: 'Department Head',
      phoneNumber: '123-456-7890',
      email: 'U7m1O@example.com',
      address: '123 Main St',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'us',
      officeTitle: 'CEO',
      addUserLimit: 5,
    },
    {
      firstName: 'Emily',
      middleName: '',
      lastName: 'White',
      role: 'Team Member',
      phoneNumber: '123-456-7890',
      email: 'U7m1O@example.com',
      address: '123 Main St',
      addressLine2: '',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'us',
      officeTitle: 'CEO',
      addUserLimit: null,
    },
  ]);

  function handleOpenAddModal() {
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Add New User" />
          <AddEditUserModal
            onSave={(data) => {
              setUsers((prev) => [...prev, data]);
            }}
          />
        </>
      ),
    });
  }

  function handleOpenEditModal(index: number) {
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Edit User" />
          <AddEditUserModal
            value={users[index]}
            onSave={(data) => {
              const updatedUsers = [...users];
              updatedUsers[index] = data;
              setUsers(updatedUsers);
            }}
          />
        </>
      ),
    });
  }

  function handleDelete(index: number) {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  }

  return (
    <div className="mt-3.5 space-y-3 -mx-5">
      <table className="w-full">
        <thead className="bg-[#8E8E8E1A] bg-opacity-10 text-[#767676] text-xs font-medium uppercase ">
          <tr className="border-b">
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-right">Role</th>
            <th className="py-3 px-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {users?.map((user, index) => (
            <tr key={index} className="border-b last:border-none hover:bg-gray-50">
              <td className="py-3 px-6 text-black text-xs font-medium text-left">
                {user.firstName + ' ' + (user.middleName ? user.middleName + ' ' : '') + user.lastName}
              </td>
              <td className="py-3 px-6 text-black text-xs font-medium text-right">{user.role}</td>
              <td className="py-3 px-6 text-black text-xs font-medium text-right">
                <Dropdown>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <Dropdown.Trigger className="cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                  </Dropdown.Trigger>
                  <Dropdown.Menu className="bg-white border shadow-md w-[150px] -ml-32">
                    <Dropdown.Item
                      onClick={() => handleOpenEditModal(index)}
                      className="text-xs font-medium hover:bg-primary-dark/10 duration-150"
                    >
                      <PiPencil className="w-4 h-4 text-gray-500 mr-1.5" /> Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        openModal({
                          containerClassName: 'w-[400px]',
                          view: (
                            <ConfirmModal
                              icon={<PiTrash className="w-8 h-8" />}
                              title="Delete User"
                              description="Are you sure you want to delete this user?"
                              onConfirm={() => {
                                handleDelete(index);
                                closeModal();
                                toast.success('User Successfully Deleted');
                              }}
                              cancelButtonText="Cancel"
                            />
                          ),
                        });
                      }}
                      className="text-xs font-medium hover:bg-primary-dark/10 duration-150"
                    >
                      <PiTrash className="w-4 h-4 text-gray-500 mr-1.5" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pt-5 px-5">
        <button
          onClick={handleOpenAddModal}
          className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5"
        >
          Add New User
        </button>
      </div>
    </div>
  );
}

const roleOptions = [
  {
    id: '1',
    name: 'Owner',
    value: 'Owner',
  },
  {
    id: '2',
    name: 'Department Head',
    value: 'Department Head',
  },
  {
    id: '3',
    name: 'Team Member',
    value: 'Team Member',
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

function AddEditUserModal({ value, onSave }: { value?: FormInputType; onSave: (inputs: FormInputType) => void }) {
  const { closeModal } = useModal();
  const methods = useForm<FormInputType>({
    resolver: zodResolver(FormInputSchema),
    defaultValues: value ?? {},
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const watchedRole = useWatch({ control, name: 'role' });

  function onSubmit(inputs: any) {
    console.log(inputs);
    onSave(inputs);
    closeModal();
  }

  console.log('errors', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3 ">
      <div className="max-h-[70vh] overflow-y-auto p-1">
        <div className="grid grid-cols-3 gap-x-3 mb-3">
          <CustomInputLabel label="Full Name" isRequired />
          <Input placeholder="First" {...register('firstName')} error={errors.firstName?.message} />
          <Input placeholder="Middle (Optional)" {...register('middleName')} error={errors.middleName?.message} />
          <Input placeholder="Last" {...register('lastName')} error={errors.lastName?.message} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            isRequired
            label="Email Address"
            type="email"
            placeholder="Email address"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            isRequired
            label="Phone Number"
            type="text"
            placeholder="Phone Number"
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
          />
          <div className="col-span-full">
            {' '}
            <div className="flex justify-between">
              <CustomInputLabel label="Address" isRequired />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input isRequired placeholder="Address" className="col-span-full" {...register(`address`)} error={errors?.address?.message} />
              <Input
                placeholder="Address Line 2 (Optional)"
                className="col-span-full"
                {...register(`addressLine2`)}
                error={errors?.addressLine2?.message}
              />
              <Input isRequired placeholder="City *" {...register(`city`)} error={errors?.city?.message} />
              <Input isRequired placeholder="State *" {...register(`state`)} error={errors?.state?.message} />
              <Input isRequired placeholder="Postal Code *" {...register(`postalCode`)} error={errors?.postalCode?.message} />
              <Controller
                name={`country`}
                control={control}
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
                      error={errors?.country?.message}
                    />
                  );
                }}
              />
            </div>
          </div>
          <Input
            isRequired
            label="Office Title"
            type="text"
            placeholder="Office Title"
            {...register('officeTitle')}
            error={errors.officeTitle?.message}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                isRequired
                inPortal={false}
                label="Role"
                dropdownMenuClassName="w-[270px]"
                placeholder="Choose Role"
                labelClassName={labelClassName}
                selected={roleOptions.find((option) => option.value === field.value)}
                options={roleOptions}
                formatDisplay={(option) => option?.name}
                onSelect={({ value }: { value: string }) => {
                  field.onChange(value);
                }}
                error={errors.role?.message}
              />
            )}
          />
          {watchedRole === 'Department Head' && (
            <Input
              isRequired
              label="Add User Limit"
              type="number"
              placeholder="Add User Limit"
              {...register('addUserLimit', { valueAsNumber: true })}
              error={errors.addUserLimit?.message}
            />
          )}
        </div>
      </div>
        <div className="col-span-full grid grid-cols-2 gap-3 mt-8">
          <Button type="button" variant="outline" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button type="submit">{value ? 'Save' : 'Add'}</Button>
        </div>
    </form>
  );
}
