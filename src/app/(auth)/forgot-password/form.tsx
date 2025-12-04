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
import { useDarkMode } from '@/lib/contexts/dark-mode-context';
import { useState, useEffect } from 'react';

// Helper to get dark mode from localStorage
const getDarkModeFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved === 'true';
    } catch {
      return false;
    }
  }
  return false;
};

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordInputType = z.infer<typeof ForgotPasswordSchema>;

export function ForgotPasswordForm() {
  const darkModeContext = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const storageValue = getDarkModeFromStorage();
    const contextValue = darkModeContext.isDarkMode;
    return contextValue === true ? true : storageValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateDarkMode = () => {
      const storageValue = getDarkModeFromStorage();
      const contextValue = darkModeContext.isDarkMode;
      const newValue = contextValue === true ? true : storageValue;
      setIsDarkMode(newValue);
    };
    updateDarkMode();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') updateDarkMode();
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(updateDarkMode, 50);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [darkModeContext.isDarkMode]);

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[420px] mx-auto px-4 sm:px-0">
      <Input 
        {...register('email')} 
        isRequired 
        label="Email Address" 
        type="email" 
        placeholder="Enter your email" 
        error={errors.email?.message} 
      />
      <p className="text-xs sm:text-sm mt-2 px-1" style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>We&apos;ll send you a reset instruction via email</p>
      <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        <Button 
          type="submit" 
          className="w-full text-sm sm:text-base rounded-[10px] border-0" 
          style={{ background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Link'}
        </Button>
        <p className="text-center">
          <Link className="hover:underline font-normal text-xs sm:text-sm" style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }} href={ROUTES.AUTH.LOGIN}>
            Back to Login
          </Link>
        </p>
      </div>
    </form>
  );
}
