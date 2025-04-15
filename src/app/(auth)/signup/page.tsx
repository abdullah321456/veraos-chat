import { Suspense } from 'react';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { DisplayStepMarker } from './_components/display-form-step';
import { SignupForm } from './_forms';
import { FadeAnimation } from '@/components/atom/fade-animatation';

export default function SignupPage() {
  return (
    <Suspense>
      <FadeAnimation>
        <AuthLogo />
        <AuthPageHeader title="Create a new account" />
        <DisplayStepMarker />
        <SignupForm />
      </FadeAnimation>
    </Suspense>
  );
}
