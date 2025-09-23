'use client';

import { InputArrayDataCell } from '../(dashboard-layout)/(ai-search-layout)/ai-search/_components/input-array-data-cell';
import { ForgotPasswordTest } from './forgot-password-test';
import { UrlTest } from './url-test';

export function TestComponent() {
  return (
    <div className="p-8">
      <ForgotPasswordTest />
      
      <div className="mt-8">
        <UrlTest />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Other Tests</h2>
        <div className="grid grid-cols-3 gap-4">
          <InputArrayDataCell
            //   editable
            label="Death index match"
            values={['asdf']}
            onDone={(newValue) => {
              console.log('newValue', newValue);
            }}
          />
        </div>
      </div>
    </div>
  );
}
