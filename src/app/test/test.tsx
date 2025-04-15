'use client';

import { InputArrayDataCell } from '../(dashboard-layout)/(ai-search-layout)/ai-search/_components/input-array-data-cell';

export function TestComponent() {
  return (
    <div className="p-8">
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
  );
}
