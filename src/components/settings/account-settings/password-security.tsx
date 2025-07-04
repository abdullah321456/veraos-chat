'use client';

import { CustomInputLabel } from '@/app/(auth)/signup/_forms/account-and-organization-info.form';
import { AdvancedRadio } from '@/components/atom/advance-radio';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { Switch } from '@/components/atom/form-elements/switch';
import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import { useState } from 'react';
import { toast } from 'sonner';
import { userService } from '@/services/userService';
import { useUser } from '@/lib/hooks/use-user';

export function PasswordSecurity() {
  const { openModal } = useModal();
  return (
    <div className="mt-[14px] space-y-3 ">
      <h5 className="text-black text-xs font-medium">Password</h5>
      <button
        onClick={() =>
          openModal({
            containerClassName: 'w-[500px]',
            view: (
              <div>
                <ModalHeader title="Change Password" />
                <ChangePasswordModal />
              </div>
            ),
          })
        }
        className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5"
      >
        Change Password
      </button>
      <div className="flex justify-between items-center">
        <h5 className="text-black text-xs font-medium">Enable Two-factor Authentication</h5>
        <Switch />
      </div>
    </div>
  );
}

function ChangePasswordModal() {
  const { closeModal } = useModal();
  const [securityCodeRequired, setSecurityCodeRequired] = useState(true);
  const [securityCodeGateway, setSecurityCodeGateway] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [securityCodeSent, setSecurityCodeSent] = useState(false);
  const [passwordFillable, setPasswordFillable] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updatePassword } = useUser();

  const radioChildClassName =
    'peer-checked:text-primary peer-checked:font-semibold border rounded px-4 py-2 text-center cursor-pointer ring-0 peer-checked:ring-[2px] peer-checked:ring-primary text-sm duration-300';

  const handleSubmit = async (data: any) => {
    const success = await updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    
    if (success) {
      closeModal();
    }
  };

  return (
    <div className="p-6 pt-3">
      {!securityCodeSent && (
        <div className="text-black text-base font-medium mb-4 border-b pb-1">Security code is required to change password</div>
      )}
      {securityCodeRequired && (
        <div>
          <CustomInputLabel label="Where do you want to receive the security code ?" />
          <div className="flex gap-4">
            <AdvancedRadio name="security_code_gateway" onClick={() => setSecurityCodeGateway('email')}>
              <div className={radioChildClassName}>Email</div>
            </AdvancedRadio>
            <AdvancedRadio name="security_code_gateway" onClick={() => setSecurityCodeGateway('phone')}>
              <div className={radioChildClassName}>Phone</div>
            </AdvancedRadio>
          </div>
        </div>
      )}
      {securityCodeSent && !passwordFillable && (
        <div>
          <Input type="text" label="Security Code" placeholder="Enter security code" onChange={(e) => setSecurityCode(e.target.value)} />
        </div>
      )}

      {passwordFillable && (
        <div className="space-y-4">
          <PasswordInput 
            label="Current Password" 
            placeholder="Enter current password" 
            onChange={(e) => setCurrentPassword(e.target.value)} 
          />
          <PasswordInput label="New Password" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      )}

      <div className="flex justify-end gap-3 mt-8">
        <Button onClick={() => closeModal()} variant="outline">
          Cancel
        </Button>
        {securityCodeRequired && !securityCodeSent && (
          <Button
            onClick={() => {
              if (!securityCodeGateway) {
                toast.error('Please select security code gateway');
                return;
              }
              setSecurityCodeRequired(false);
              setSecurityCodeSent(true);
            }}
          >
            Next
          </Button>
        )}
        {!securityCodeRequired && securityCodeSent && !passwordFillable && (
          <Button
            onClick={() => {
              if (!securityCode) {
                toast.error('Please enter security code');
                return;
              }
              setPasswordFillable(true);
            }}
          >
            Next
          </Button>
        )}
        {passwordFillable && securityCodeSent && (
          <Button
            onClick={() => handleSubmit({ currentPassword, newPassword, confirmPassword })}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Save'}
          </Button>
        )}
      </div>
    </div>
  );
}
