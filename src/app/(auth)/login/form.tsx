'use client';
import { Button } from '@/components/atom/button';
import { Checkbox } from '@/components/atom/form-elements/checkbox';
import { Input } from '@/components/atom/form-elements/input';
import { PasswordInput } from '@/components/atom/form-elements/password-input/password-input';
import { ROUTES } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LoginFormInputType, LoginFormSchema } from './validation';
import { useRouter } from 'next-nprogress-bar';
import { apiService } from '@/services/apiService';
import { authUtils } from '@/lib/utils/auth';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormInputType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(inputs: LoginFormInputType) {
    try {
      const response = await apiService.postData('/users/login', inputs);

      if (response.access_token) {
        // Save the access token
        authUtils.setToken(response.access_token);
        
        // Set flag to indicate coming from login
        sessionStorage.setItem('fromLogin', 'true');

        toast.success('Login successful!', {
          duration: 2000,
          position: 'top-right',
        });
        router.push(ROUTES.HOME);
        return true;
      }

      toast.error(response.message || 'Invalid credentials');
      return false;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
      return false;
    }
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-[420px]">
          <div className="space-y-4">

              <Input {...register('email')} isRequired label="Email Address" type="email" placeholder="Enter your email" error={errors.email?.message} />
              <div className="relative">
                  <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="absolute -top-0.5 text-sm font-normal right-0 underline text-primary">
                      Forgot Password?
                  </Link>
                  <PasswordInput isRequired {...register('password')} label="Password" placeholder="Enter your password" error={errors.password?.message} />
              </div>
              <div>
                  <Checkbox label="Remember Password" labelClassName="select-none" />
              </div>
              <div className="pt-3 space-y-5">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                  <p className="text-center">
                      <span className="text-gray-600">Don&apos;t have an account? </span>
                      <Link className="underline text-primary font-semibold" href={ROUTES.AUTH.SIGNUP}>
                          Create a new one
                      </Link>
                  </p>
              </div>
          </div>
          <p className="text-center mt-2">
              <Link className="underline text-primary font-medium" href={ROUTES.AUTH.JOIN_WITH_INVITE_CODE}>
                  Join With Invitation Code
              </Link>
          </p>
      </form>
  );
}
