import { AdvancedRadio } from '@/components/atom/advance-radio';
import { Button } from '@/components/atom/button';

export function PlanLimit() {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      <div className="shadow-lg p-4 border border-gray-50 rounded-[10px] w-[346px]">
        <div className="space-y-4">
          <h5 className="text-black text-base font-bold">Current Plan</h5>
          <div className="flex items-center justify-between">
            <h6 className="text-black text-sm font-normal">Plan Name</h6>
            <h6 className="text-black text-sm font-bold text-right">Pay-as-you-go</h6>
          </div>
          <div className="flex items-center justify-between gap-6">
            <h6 className="text-black text-sm font-normal">Renewal Date</h6>
            <h6 className="text-black text-sm font-bold">Renews on Mar 15, 2025</h6>
          </div>
          <div className="flex items-center justify-between">
            <h6 className="text-black text-sm font-normal">Monthly/Annual Fee</h6>
            <h6 className="text-black text-sm font-bold">$99 per month</h6>
          </div>
          <div className="pt-2">
            <Button>Change Plan</Button>
          </div>
        </div>
      </div>
      <PaymentType />
    </div>
  );
}

function PaymentType() {
  const selectionElementClassNames =
    'peer-checked:text-primary peer-checked:font-semibold border rounded p-4 text-center cursor-pointer ring-0 peer-checked:ring-[2px] peer-checked:ring-primary text-sm duration-300';

  return (
    <div className="shadow-lg p-4 border border-gray-50 rounded-[10px] w-[346px] space-y-6">
      <p className="text-black text-base font-bold">Payment Method</p>
      <div className="grid grid-cols-2 gap-3 ">
        <AdvancedRadio name="paymentType" defaultChecked>
          <div className={selectionElementClassNames}>Credit Card</div>
        </AdvancedRadio>
        <AdvancedRadio name="paymentType">
          <div className={selectionElementClassNames}>Paypal</div>
        </AdvancedRadio>
      </div>
      <div className="pt-3 !mt-10">
        <Button>Update Payment Method</Button>
      </div>
    </div>
  );
}
