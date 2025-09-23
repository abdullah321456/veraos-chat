import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { ForgotPasswordForm } from './form';

export default function ForgotPasswordPage() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader title="Reset your password" />
      <ForgotPasswordForm />
    </FadeAnimation>
  );
}
