'use client';

import { Switch } from '@/components/atom/form-elements/switch';
import { useState } from 'react';

const regions = ['North America', 'South America', 'Europe', 'Russia', 'Middle East', 'Asia', 'Africa', 'Oceania'];

export function DefaultSearch() {
  const [isSelectable, setIsSelectable] = useState(false);
  const [switchState, setSwitchState] = useState({
    'North America': false,
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
      <h4 className="text-black text-sm font-bold flex justify-between items-center">
        Global Data{' '}
        <Switch
          onChange={(e) => {
            setIsSelectable(e.target.checked);
            setSwitchState({
              'North America': e.target.checked,
              'South America': e.target.checked,
              Europe: e.target.checked,
              Russia: e.target.checked,
              'Middle East': e.target.checked,
              Asia: e.target.checked,
              Africa: e.target.checked,
              Oceania: e.target.checked,
            });
          }}
          checked={isSelectable}
        />
      </h4>
      <div key={String(isSelectable)}>
        {regions?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <h5 className="text-sm font-normal text-black">{item}</h5>
            <Switch
              disabled={!isSelectable}
              onChange={(e) => setSwitchState({ ...switchState, [item]: e.target.checked })}
              checked={switchState[item as keyof typeof switchState]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
