'use client';

import { AdvancedRadio } from '@/components/atom/advance-radio';
import { Button } from '@/components/atom/button';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

interface PlanLimitProps {
  isEditable: boolean;
}

export function PlanLimit({ isEditable }: PlanLimitProps) {
  const { isDarkMode } = useDarkMode();
  
  const cardBg = isDarkMode ? '#505662' : 'white';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtextColor = isDarkMode ? '#A7A7A7' : '#6B7280';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div 
        className="shadow-lg p-4 border rounded-[10px] w-full sm:w-[346px] hidden"
        style={{
          backgroundColor: cardBg,
          borderColor: borderColor
        }}
      >
        <div className="space-y-4">
          <h5 
            className="text-base font-bold"
            style={{ color: textColor }}
          >
            Current Plan
          </h5>
          <div className="flex items-center justify-between">
            <h6 
              className="text-sm font-normal"
              style={{ color: textColor }}
            >
              Plan Name
            </h6>
            <h6 
              className="text-sm font-bold text-right"
              style={{ color: textColor }}
            >
              Pay-as-you-go
            </h6>
          </div>
          <div className="flex items-center justify-between gap-6">
            <h6 
              className="text-sm font-normal"
              style={{ color: textColor }}
            >
              Renewal Date
            </h6>
            <h6 
              className="text-sm font-bold"
              style={{ color: textColor }}
            >
              Renews on Mar 15, 2025
            </h6>
          </div>
          <div className="flex items-center justify-between">
            <h6 
              className="text-sm font-normal"
              style={{ color: textColor }}
            >
              Monthly/Annual Fee
            </h6>
            <h6 
              className="text-sm font-bold"
              style={{ color: textColor }}
            >
              $99 per month
            </h6>
          </div>
          {isEditable ? (
            <div className="pt-2">
              <Button>Change Plan</Button>
            </div>
          ) : (
            <div className="pt-2">
              <p 
                className="text-sm italic"
                style={{ color: subtextColor }}
              >
                Only organization administrators can change plans.
              </p>
            </div>
          )}
        </div>
      </div>
      <PaymentType isEditable={isEditable} />
    </div>
  );
}

interface PaymentTypeProps {
  isEditable: boolean;
}

function PaymentType({ isEditable }: PaymentTypeProps) {
  const { isDarkMode } = useDarkMode();
  
  const cardBg = isDarkMode ? '#505662' : 'white';
  const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtextColor = isDarkMode ? '#A7A7A7' : '#6B7280';
  const selectionBorderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : undefined;
  const selectionBg = isDarkMode ? '#404652' : undefined;
  const selectionTextColor = isDarkMode ? '#FFFFFF' : undefined;

  const selectionElementClassNames =
    'peer-checked:text-primary peer-checked:font-semibold border rounded p-4 text-center cursor-pointer ring-0 peer-checked:ring-[2px] peer-checked:ring-primary text-sm duration-300';

  return (
    <div 
      className="shadow-lg p-4 border rounded-[10px] w-full sm:w-[346px] space-y-6 hidden"
      style={{
        backgroundColor: cardBg,
        borderColor: borderColor
      }}
    >
      <p 
        className="text-base font-bold"
        style={{ color: textColor }}
      >
        Payment Method
      </p>
      <div className="grid grid-cols-2 gap-3">
        <AdvancedRadio name="paymentType" defaultChecked disabled={!isEditable}>
          <div 
            className={`${selectionElementClassNames} ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              borderColor: selectionBorderColor,
              backgroundColor: selectionBg,
              color: selectionTextColor
            }}
          >
            Credit Card
          </div>
        </AdvancedRadio>
        <AdvancedRadio name="paymentType" disabled={!isEditable}>
          <div 
            className={`${selectionElementClassNames} ${!isEditable ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{
              borderColor: selectionBorderColor,
              backgroundColor: selectionBg,
              color: selectionTextColor
            }}
          >
            Paypal
          </div>
        </AdvancedRadio>
      </div>
      {isEditable ? (
        <div className="pt-3 !mt-10">
          <Button>Update Payment Method</Button>
        </div>
      ) : (
        <div className="pt-3 !mt-10">
          <p 
            className="text-sm italic"
            style={{ color: subtextColor }}
          >
            Only organization administrators can update payment methods.
          </p>
        </div>
      )}
    </div>
  );
}
