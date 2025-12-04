'use client';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { BillingAddress } from './_components/billing-address';
import { PlanLimit } from './_components/plan-limit';
import { RecentPayments } from './_components/recent-payments';
import { useUser } from '@/lib/hooks/use-user';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export default function Page() {
  const { isDarkMode } = useDarkMode();
  const { userData, loading } = useUser();
  const isOrganization = userData?.role === 'organization';

  const containerBg = isDarkMode ? '#404652' : 'white';
  const headerBg = isDarkMode ? '#404652' : '#F6F6F9';
  const headerTextColor = isDarkMode ? '#FFFFFF' : '#000000';
  const pulseBg = isDarkMode ? '#505662' : '#E5E7EB';

  if (loading) {
    return (
      <div 
        className="w-full min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-130px)] sm:rounded-[20px] overflow-hidden flex flex-col"
        style={{ backgroundColor: containerBg }}
      >
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 md:px-0 sm:pr-8">
            <div className="animate-pulse space-y-6 sm:space-y-8">
              <div 
                className="h-32 rounded"
                style={{ backgroundColor: pulseBg }}
              ></div>
              <div 
                className="h-32 rounded"
                style={{ backgroundColor: pulseBg }}
              ></div>
              <div 
                className="h-32 rounded"
                style={{ backgroundColor: pulseBg }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full min-h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-110px)] sm:max-h-[calc(100vh-110px)] sm:rounded-[20px] overflow-hidden flex flex-col sm:pr-6"
      style={{ backgroundColor: containerBg }}
    >
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Header for small devices */}
        <div 
          className="flex justify-between items-center flex-shrink-0 w-full sm:hidden"
          style={{ backgroundColor: headerBg, paddingBottom: '10px' }}
        >
          <h2 
            className="text-lg font-bold px-2 py-0 rounded-tl-lg rounded-tr-lg w-full"
            style={{ color: headerTextColor }}
          >
            Billing
          </h2>
        </div>
        <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 md:px-0 sm:pr-8">
          <FadeAnimation className="space-y-6 sm:space-y-8">
            <PlanLimit isEditable={isOrganization} />
            <BillingAddress isEditable={isOrganization} />
            <RecentPayments />
          </FadeAnimation>
        </div>
      </div>
    </div>
  );
}
