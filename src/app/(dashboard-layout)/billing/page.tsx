'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { BillingAddress } from './_components/billing-address';
import { PlanLimit } from './_components/plan-limit';
import { RecentPayments } from './_components/recent-payments';
import { useUser } from '@/lib/hooks/use-user';

export default function Page() {
  const { userData, loading } = useUser();
  const isOrganization = userData?.role === 'organization';

  if (loading) {
    return (
      <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 md:px-0">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 md:px-0">
      <FadeAnimation className="space-y-6 sm:space-y-8">
        <PlanLimit isEditable={isOrganization} />
        <BillingAddress isEditable={isOrganization} />
        <RecentPayments />
      </FadeAnimation>
    </div>
  );
}
