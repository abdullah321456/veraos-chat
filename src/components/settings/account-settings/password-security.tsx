'use client';

import { Button } from '@/components/atom/button';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { Switch } from '@/components/atom/form-elements/switch';
import { ModalHeader } from '@/components/atom/modal-header';
import { useModal } from '@/components/modal-views/use-modal';
import { useState } from 'react';
import { toast } from 'sonner';
import { useUser } from '@/lib/hooks/use-user';

export function PasswordSecurity() {
  const { openModal } = useModal();
  return (
    <div className="mt-[14px] space-y-3">
      <h5 className="text-black text-xs font-medium">Password</h5>
      <button
        onClick={() =>
          openModal({
            containerClassName: 'w-full max-w-[500px] mx-4 sm:mx-0',
            view: (
              <div>
                <ModalHeader title="Change Password" />
                <ChangePasswordModal />
              </div>
            ),
          })
        }
        className="text-white text-xs font-normal bg-[#38366C] rounded-[10px] hover:bg-[#494780] py-3 px-5 w-full sm:w-auto"
      >
        Change Password
      </button>
      <div className="flex justify-between items-center gap-3">
        <h5 className="text-black text-xs font-medium">Enable Two-factor Authentication</h5>
        <Switch />
      </div>
    </div>
  );
}

function ChangePasswordModal() {
  const { closeModal } = useModal();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updatePassword } = useUser();

  const handleSubmit = async () => {
    // Validation
    if (!currentPassword) {
      toast.error('Please enter current password');
      return;
    }
    if (!newPassword) {
      toast.error('Please enter new password');
      return;
    }
    if (!confirmPassword) {
      toast.error('Please enter confirm password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }
    if (currentPassword === newPassword) {
      toast.error('New password must be different from current password');
      return;
    }

    setIsSubmitting(true);
    
    const success = await updatePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    
    if (success) {
      closeModal();
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 pt-3">
      <div className="space-y-4">
        <PasswordInput 
          label="Current Password" 
          placeholder="Enter current password" 
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} 
        />
        <PasswordInput 
          label="New Password" 
          placeholder="Enter new password" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} 
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <Button onClick={() => closeModal()} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword}
        >
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </div>
  );
}
