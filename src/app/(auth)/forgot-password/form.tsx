import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import { ROUTES } from '@/config/routes';
import Link from 'next/link';

export function LoginForm() {
  return (
    <div className="w-[420px]">
      <Input label="Email Address" type="email" placeholder="Enter your email" />
      <p className="text-sm mt-2 text-gray-600">We&apos;ll send you a reset instruction via email</p>
      <div className="pt-6 space-y-5">
        <Button className="w-full">Send Link</Button>
        <p className="text-center">
          <Link className="hover:underline text-gray-600 font-normal text-sm" href={ROUTES.AUTH.LOGIN}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
