import { FadeAnimation } from '@/components/atom/fade-animatation';
import { AuthLogo } from '../_components/auth-logo';
import { PendingApprovalForm } from './form';

export default function PendingApprovalPage() {
  return (
    <FadeAnimation>
      <AuthLogo />
      <PendingApprovalForm />
    </FadeAnimation>
  );
}

