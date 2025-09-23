'use client';
import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { ROUTES } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { userService } from '@/services/userService';
import { authUtils } from '@/lib/utils/auth';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordInputType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(inputs: ForgotPasswordInputType) {
    try {
      await userService.forgotPassword(inputs.email);
      
      toast.success('Password reset link sent to your email!', {
        duration: 5000,
        position: 'top-right',
      });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[420px]">
      <Input 
        {...register('email')} 
        isRequired 
        label="Email Address" 
        type="email" 
        placeholder="Enter your email" 
        error={errors.email?.message} 
      />
      <p className="text-sm mt-2 text-gray-600">We&apos;ll send you a reset instruction via email</p>
      <div className="pt-6 space-y-5">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Link'}
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
