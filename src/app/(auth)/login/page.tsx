import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { AuthPageHeader } from '../_components/auth-page-header';
import { LoginForm } from './form';

export default function LoginPage() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <AuthPageHeader title="Login to your account" />
      <LoginForm />
    </FadeAnimation>
  );
}
