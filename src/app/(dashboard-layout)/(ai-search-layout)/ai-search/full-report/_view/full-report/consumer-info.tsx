'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { InputArrayDataCell } from '../../../_components/input-array-data-cell';

import cn from '@/lib/utils/cn';
import { InputDataCell } from '../../../_components/input-data-cell';
import { Accordion } from '../../_components/accordion';
type ConsumerInfoProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};
export function ConsumerInfo({ isEditable = false, isDrawer }: ConsumerInfoProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  const actionButtonMode = isLocalEdit && !editable ? 'edit' : 'save';

  function handleActionButtonClick() {
    if (actionButtonMode !== 'save') {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success('Successfully saved');
    }
  }
  return (
    <Accordion
      translateButton={isEditable}
      title="Consumer Information"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className="space-y-3">
        <InputArrayDataCell
          serial
          label="Pets"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={['Dog (Golden Retriever named Max)', 'Cats (Milo and Luna)']}
          rowClassName="bg-transparent px-0 py-0"
        />
        <InputArrayDataCell
          label="Outdoors Person"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={[
            'Hunter: No',
            'Hiking: Frequently hikes local trails',
            'Camping: Occasional weekend camping trips',
            'Fishing: Enjoys fishing during summer vacations',
            'Scuba Diving: No',
            'Boating: Occasionally rents boats for leisure activities',
            'Skiing: Skis once a year during winter trips',
            'Golfing: Plays golf socially on weekends',
            'Cruises: Took a Caribbean cruise in 2022',
            'Domestic Travel: Travels frequently for work and leisure',
            'International Travel: Visited Europe, Asia, and South America',
          ]}
          rowClassName="bg-transparent px-0 py-0"
        />
        <div className={cn(isDrawer?"grid-cols-2 grid gap-3 mt-3":"grid grid-cols-4 gap-3 mt-3")}>
          <InputDataCell label="Tobacco Use" value="None" editable={editable} onDone={(value) => console.log('value', value)} />
          <InputDataCell
            label="Marijuana Use"
            value="Occasional recreational use"
            editable={editable}
            onDone={(value) => console.log('value', value)}
          />
          <InputDataCell
            label="Alcohol Use"
            value="Social drinker, mostly wine and beer"
            editable={editable}
            onDone={(value) => console.log('value', value)}
          />
          <InputDataCell
            label="Household Information"
            value="Married with 2 children"
            editable={editable}
            onDone={(value) => console.log('value', value)}
          />
        </div>
        <InputArrayDataCell
          label="Other Consumer Financial Information"
          editable={editable}
          onDone={(value) => console.log('value', value)}
          values={[
            'Spends on luxury goods, family vacations, and home improvement projects',
            'Uses credit cards regularly, pays off balances monthly',
            'Has savings and investments in stocks and bonds',
          ]}
          rowClassName="bg-transparent px-0 py-0 font-medium"
          rowWrapperClassName="space-y-1.5"
        />
      </div>
    </Accordion>
  );
}
