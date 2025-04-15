'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { GreenTickIcon } from '@/components/atom/icons/green-tick';
import { ROUTES } from '@/config/routes';
import Link from 'next/link';
import { useState } from 'react';
import { CustomInputLabel } from '../signup/_forms/account-and-organization-info.form';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'sonner';

export function InviteSignupForm() {
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isValidInviteCode, setIsValidInviteCode] = useState(false);
  const router = useRouter();

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Regular expression to check for a valid password
  const passwordValid =
    password.length >= 8 &&
    /[0-9]/.test(password) && // Checks for at least one number
    /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for at least one special character

  const shouldShowPasswordRequirements = password.length > 0 && !passwordValid;

  return (
    <div className="w-[470px] space-y-4">
      <div>
        <Input label="Invite Code" type="text" placeholder="12345" value={inviteCode} onChange={handleInviteCodeChange} />

        {isValidInviteCode && (
          <span className="flex items-center gap-1.5 mt-2">
            <GreenTickIcon />
            <p className="text-[#00BA00] text-xs font-normal">Your code is successfully verified.</p>
          </span>
        )}
      </div>

      {!isValidInviteCode && (
        <Button
          className="w-full"
          onClick={() => {
            if (!inviteCode?.length) {
              return toast.error('Invite code is required');
            }

            if (inviteCode !== '12345') {
              return toast.error('Invalid invite code');
            }

            setIsValidInviteCode(true);
          }}
        >
          Next
        </Button>
      )}

      {isValidInviteCode && (
        <div className="space-y-4">
          <hr />
          <Input label="Organization Name" type="text" placeholder="ABC Corporation Ltd." />
          <div className="grid grid-cols-3 gap-x-3">
            <CustomInputLabel label="Full name" />
            <Input placeholder="First" />
            <Input placeholder="Middle (Optional)" />
            <Input placeholder="Last" />
          </div>
          <Input label="Email Address" type="email" placeholder="Enter your email" />
          <Input label="Confirm Email Address" type="email" placeholder="Re-enter your email" />

          <div>
            <PasswordInput label="Password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />

            {shouldShowPasswordRequirements && (
              <p className="text-[#CAA70B] text-xs font-normal mt-2">Min 8 characters, 1 number, and 1 special character.</p>
            )}
          </div>

          <PasswordInput label="Confirm Password" placeholder="Re-type your password" />

          <div className="pt-3 space-y-5">
            <Button className="w-full" onClick={() => router.push(ROUTES.HOME)}>
              Create Account
            </Button>
          </div>
        </div>
      )}

      <p className="text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link className="underline text-primary font-semibold" href={ROUTES.AUTH.LOGIN}>
          Login
        </Link>
      </p>
    </div>
  );
}
