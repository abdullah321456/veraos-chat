import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { ResetPasswordForm } from './form';
import { Suspense } from 'react';

function ResetPasswordContent() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader title="Reset your password" />
      <ResetPasswordForm />
    </FadeAnimation>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <FadeAnimation>
        <AuthLogo />
        <AuthPageHeader title="Reset your password" />
        <div className="w-[420px] text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm mt-2 text-gray-600">Loading...</p>
        </div>
      </FadeAnimation>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
