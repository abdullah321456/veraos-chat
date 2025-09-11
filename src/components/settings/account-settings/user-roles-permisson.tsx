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
import { useState, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { PiPencil, PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUser } from '@/lib/hooks/use-user';
import { userService } from '@/services/userService';

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
  });

// Schema for edit user (same as add user - no role or officeTitle)
const EditFormInputSchema = z
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
  });

type FormInputType = z.infer<typeof FormInputSchema>;
type EditFormInputType = z.infer<typeof EditFormInputSchema>;

export default function UserRolesAndPermission() {
  const { openModal, closeModal } = useModal();
  const { userData, loading: userLoading, error: userError, fetchUserData } = useUser();
  const [users, setUsers] = useState<EditFormInputType[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transform users from userData when it changes
  useEffect(() => {
    if (userData?.users && Array.isArray(userData.users)) {
      const transformedUsers: EditFormInputType[] = userData.users.map((user: any) => ({
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        address: user.address || '',
        addressLine2: user.addressLine2 || '',
        city: user.city || '',
        state: user.state || '',
        postalCode: user.postalCode || '',
        country: user.country || '',
        role:user.role||''
      }));
      
      const ids = userData.users.map((user: any) => user._id);
      
      setUsers(transformedUsers);
      setUserIds(ids);
    } else {
      setUsers([] as EditFormInputType[]);
      setUserIds([]);
    }
  }, [userData]);

  function handleOpenAddModal() {
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Add New User" />
          <AddEditUserModal
            onSave={async (data) => {
              try {
                setIsSubmitting(true);
                // Add default role as 'user' and office title for new users
                const userDataWithDefaults = {
                  ...data,
                  role: 'user',
                  officeTitle: 'Team Member'
                };
                await userService.addUser(userDataWithDefaults);
                toast.success('User added successfully');
                // Refresh user data to get updated users list
                await fetchUserData();
                closeModal();
              } catch (error: any) {
                console.error('Error adding user:', error);
                // Extract error message from API response
                const errorMessage = error.response?.data?.message || error.message || 'Failed to add user';
                toast.error(errorMessage);
              } finally {
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
          />
        </>
      ),
    });
  }

  function handleOpenEditModal(index: number) {
    const userId = userIds[index];
    openModal({
      containerClassName: 'w-[600px]',
      view: (
        <>
          <ModalHeader title="Edit User" />
          <AddEditUserModal
            value={users[index]}
            onSave={async (data) => {
              try {
                setIsSubmitting(true);
                await userService.updateUser(userId, data);
                toast.success('User updated successfully');
                // Refresh user data to get updated users list
                await fetchUserData();
                closeModal();
              } catch (error: any) {
                console.error('Error updating user:', error);
                // Extract error message from API response
                const errorMessage = error.response?.data?.message || error.message || 'Failed to update user';
                toast.error(errorMessage);
              } finally {
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
            isEdit={true}
          />
        </>
      ),
    });
  }

  async function handleDelete(index: number) {
    const userId = userIds[index];
    try {
      setIsSubmitting(true);
      await userService.deleteUser(userId);
      toast.success('User deleted successfully');
      // Refresh user data to get updated users list
      await fetchUserData();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      // Extract error message from API response
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete user';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Loading state
  if (userLoading) {
    return (
      <div className="mt-3.5 space-y-3 -mx-5">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-gray-600">Loading users...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (userError) {
    return (
      <div className="mt-3.5 space-y-3 -mx-5">
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Failed to load users</p>
          <p className="text-sm text-gray-500">{userError}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
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
          {users?.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-8 text-center text-gray-500">
                No users found
              </td>
            </tr>
          ) : (
            users?.map((user, index) => (
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
                              onConfirm={async () => {
                                await handleDelete(index);
                                closeModal();
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
            ))
          )}
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

function AddEditUserModal({ 
  value, 
  onSave, 
  isSubmitting = false,
  isEdit = false
}: { 
  value?: FormInputType | EditFormInputType; 
  onSave: (inputs: FormInputType | EditFormInputType) => void;
  isSubmitting?: boolean;
  isEdit?: boolean;
}) {
  const { closeModal } = useModal();
  const schema = isEdit ? EditFormInputSchema : FormInputSchema;
  const methods = useForm<FormInputType | EditFormInputType>({
    resolver: zodResolver(schema),
    defaultValues: value ?? {},
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  // Type assertion for errors to handle both schemas
  const typedErrors = errors as any;

  async function onSubmit(inputs: FormInputType) {
    try {
      await onSave(inputs);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  }

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
        </div>
      </div>
        <div className="col-span-full grid grid-cols-2 gap-3 mt-8">
          <Button type="button" variant="outline" onClick={() => closeModal()} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (value ? 'Save' : 'Add')}
          </Button>
        </div>
    </form>
  );
}
