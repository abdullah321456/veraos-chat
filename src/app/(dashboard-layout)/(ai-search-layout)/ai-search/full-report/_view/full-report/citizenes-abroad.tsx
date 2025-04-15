'use client';
import { useState } from 'react';
import { PiGlobe } from 'react-icons/pi';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { InputArrayDataCell } from '../../../_components/input-array-data-cell';
import { Accordion } from '../../_components/accordion';

export function CitizenesAbroad({ isEditable = false }: { isEditable?: boolean }) {
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
      key={String(editable)}
      title="U.S. Citizens Abroad"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <InputArrayDataCell
        entryPrefix={<PiGlobe className="text-primary min-w-4 h-4" />}
        label="Addresses in Other Countries"
        editable={editable}
        onDone={(value) => console.log('value', value)}
        values={['45 High Street, London, England, SW1A 1AA, UK', '12 Rue de la Paix, Paris, France, 75002']}
        rowClassName="bg-transparent px-0 py-0"
        rowWrapperClassName="space-y-1.5"
        rowTextClassName="font-medium"
      />
    </Accordion>
  );
}
