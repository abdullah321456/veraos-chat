'use client';

import { Switch } from '@/components/atom/form-elements/switch';
import { useState } from 'react';

const regions = ['North America', 'South America', 'Europe', 'Russia', 'Middle East', 'Asia', 'Africa', 'Oceania'];

export function DefaultSearch() {
  const [isSelectable, setIsSelectable] = useState(false);
  const [switchState, setSwitchState] = useState({
    'North America': true, // Only North America is enabled by default
    'South America': false,
    Europe: false,
    Russia: false,
    'Middle East': false,
    Asia: false,
    Africa: false,
    Oceania: false,
  });

  return (
    <div>
      <h4 className="text-black text-xs sm:text-sm font-bold flex justify-between items-center mb-2">
        Global Data{' '}
        <Switch
          onChange={(e) => {
            // Global Data switch doesn't change when clicked
          }}
          checked={false}
        />
      </h4>
      <div key={String(isSelectable)} className="space-y-2">
        {regions?.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <h5 className="text-xs sm:text-sm font-normal text-black">{item}</h5>
            <Switch
              onChange={(e) => {
                // Only allow North America to be toggled, ignore changes to other switches
                if (item === 'North America') {
                  setSwitchState(prevState => ({ ...prevState, [item]: e.target.checked }));
                }
              }}
              checked={switchState[item as keyof typeof switchState]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
