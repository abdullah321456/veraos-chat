'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { PasswordDifficulty } from '@/components/atom/password-difficulty/password-difficulty';
import { ROUTES } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';

const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordInputType = z.infer<typeof ResetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isValidating, setIsValidating] = useState(true);
  const [isValidCode, setIsValidCode] = useState(false);
  
  const code = searchParams.get('code');
  const email = searchParams.get('email');

  const form = useForm<ResetPasswordInputType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const password = watch('password');

  useEffect(() => {
    // Validate the reset code and email
    if (!code || !email) {
      toast.error('Invalid reset link. Please request a new password reset.');
      router.push(ROUTES.AUTH.FORGOT_PASSWORD);
      return;
    }
    
    // Here you could add a validation call to check if the code is valid
    // For now, we'll assume it's valid if both code and email are present
    setIsValidCode(true);
    setIsValidating(false);
  }, [code, email, router]);

  async function onSubmit(inputs: ResetPasswordInputType) {
    if (!code || !email) {
      toast.error('Invalid reset link');
      return;
    }

    try {
      await userService.resetPassword({
        email,
        code,
        newPassword: inputs.password,
        confirmPassword: inputs.confirmPassword,
      });
      
      toast.success('Password reset successfully! You can now login with your new password.', {
        duration: 5000,
        position: 'top-right',
      });
      
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    }
  }

  if (isValidating) {
    return (
      <div className="w-[420px] text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm mt-2 text-gray-600">Validating reset link...</p>
      </div>
    );
  }

  if (!isValidCode) {
    return (
      <div className="w-[420px] text-center">
        <p className="text-red-600 mb-4">Invalid or expired reset link</p>
        <Link 
          className="text-primary hover:underline font-medium" 
          href={ROUTES.AUTH.FORGOT_PASSWORD}
        >
          Request a new password reset
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[420px]">
      <div className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          value={email || ''} 
          disabled 
          className="bg-gray-50"
        />
        <PasswordInput 
          {...register('password')} 
          isRequired 
          label="New Password" 
          placeholder="Enter your new password" 
          error={errors.password?.message} 
        />
        <PasswordInput 
          {...register('confirmPassword')} 
          isRequired 
          label="Confirm New Password" 
          placeholder="Confirm your new password" 
          error={errors.confirmPassword?.message} 
        />
        
        {password && (
          <PasswordDifficulty password={password} className="mt-4" />
        )}
      </div>
      
      <div className="pt-6 space-y-5">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </Button>
        <p className="text-center">
          <Link className="hover:underline text-gray-600 font-normal text-sm" href={ROUTES.AUTH.LOGIN}>
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
}
