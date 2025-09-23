'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { ResetPasswordForm } from './form';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    console.log('Reset password page mounted');
    console.log('All search params:', Object.fromEntries(searchParams.entries()));
    console.log('Code param:', searchParams.get('code'));
    console.log('Email param:', searchParams.get('email'));
  }, [searchParams]);

  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader title="Reset your password" />
      <ResetPasswordForm />
    </FadeAnimation>
  );
}
