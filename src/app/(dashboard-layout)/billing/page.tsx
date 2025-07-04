import { FadeAnimation } from '@/components/atom/fade-animatation';
import { BillingAddress } from './_components/billing-address';
import { PlanLimit } from './_components/plan-limit';
import { RecentPayments } from './_components/recent-payments';

export default function Page() {
  return (
    <div className="w-[720px] mx-auto">
      <FadeAnimation className="space-y-8">
        <PlanLimit />
        <BillingAddress />
        <RecentPayments />
      </FadeAnimation>
    </div>
  );
}
