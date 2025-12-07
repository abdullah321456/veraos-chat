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
import { useRouter as useNProgressRouter } from 'next-nprogress-bar';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/apiService';
import { authUtils } from '@/lib/utils/auth';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export function LoginForm() {
    const router = useNProgressRouter();
    const nextRouter = useRouter();
    const { isDarkMode } = useDarkMode();
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

                // Verify token was set (for debugging)
                const tokenSet = authUtils.getToken();
                if (!tokenSet) {
                    console.error('Failed to set token in cookie');
                    toast.error('Failed to save authentication token');
                    return;
                }

                // Set flag to indicate coming from login
                sessionStorage.setItem('fromLogin', 'true');

                toast.success('Login successful!', {
                    duration: 2000,
                    position: 'top-right',
                });
                
                // Use window.location.href instead of router.push to ensure cookie is sent with request
                // This ensures the middleware can read the token on the next request
                // Small delay to ensure cookie is fully set before navigation
                setTimeout(() => {
                    window.location.href = ROUTES.HOME;
                }, 100);
            } else {
                toast.error(response.message || 'Invalid credentials');
            }
        } catch (error: any) {
            // Prevent any default behavior or page refresh
            console.error('Login error:', error);
            console.log('Error response:', error?.response);
            console.log('Error data:', error?.response?.data);

            const errorMessage = error?.response?.data?.message || error?.message || '';
            console.log('Error message:', errorMessage);

            // Check if account is not approved yet (check multiple variations)
            const notApprovedKeywords = ['not approved', 'pending approval', 'not yet approved', 'approval pending'];
            const isNotApproved = notApprovedKeywords.some(keyword =>
                errorMessage.toLowerCase().includes(keyword)
            );

            console.log('Is not approved:', isNotApproved);

            if (isNotApproved) {
                console.log('Redirecting to pending approval page');
                // Redirect to pending approval page with email using Next.js router
                nextRouter.push(`${ROUTES.AUTH.PENDING_APPROVAL}?email=${encodeURIComponent(inputs.email)}`);
                return;
            }

            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.error('Something went wrong!');
            }
            // Explicitly prevent any further error propagation
        }
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await handleSubmit(onSubmit)(e);
        } catch (error) {
            // Catch any unhandled errors to prevent page refresh
            console.error('Form submission error:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="w-full max-w-full sm:max-w-[420px] mx-auto min-w-0 box-border">
            <div className="space-y-3 sm:space-y-4 w-full min-w-0 box-border">

                <div className="space-y-2">
                    <Input {...register('email')} isRequired label="Email Address" type="email" placeholder="Enter your email" error={errors.email?.message} />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium" style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}>
                            Password <span className="text-red-500">*</span>
                        </label>
                        <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-xs sm:text-sm font-normal underline text-primary">
                            Forgot Password?
                        </Link>
                    </div>
                    <PasswordInput isRequired {...register('password')} placeholder="Enter your password" error={errors.password?.message} />
                </div>
                <div>
                    <Checkbox 
                        label="Remember Password" 
                        labelClassName="select-none"
                        style={isDarkMode ? { color: '#FFFFFF' } : undefined}
                    />
                </div>
                <div className="pt-2 sm:pt-4 space-y-3 sm:space-y-4">
                    <Button 
                        type="submit" 
                        className="w-full text-sm sm:text-base rounded-[10px] border-0" 
                        style={{ background: 'linear-gradient(113.07deg, #5C39D9 15.59%, #7B6FFF 64.93%)' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                    <p className="text-center text-xs sm:text-sm md:text-base px-2 break-words">
                        <span style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>Don&apos;t have an account? </span>
                        <Link className="underline text-primary font-semibold break-words" href={ROUTES.AUTH.SIGNUP}>
                            Create a new one
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}


