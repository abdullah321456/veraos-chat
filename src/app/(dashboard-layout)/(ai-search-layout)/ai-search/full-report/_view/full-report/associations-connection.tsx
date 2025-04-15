import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';

type AssociationsConnectionProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
};
const associates = [
  {
    name: 'John Doe',
    relationship: 'Father',
    primaryAddress: '123 Main St, Springfield, IL, 62704',
    additionalAddress: '456 Oak St, Chicago, IL, 60611 (Vacation Home)',
    phone: '(555) 123-4567',
    email: 'johndoe@example.com',
  },
  {
    name: 'Jane Smith',
    relationship: 'Mother',
    primaryAddress: '789 Pine St, New York, NY, 10001',
    additionalAddress: '101 Beach Rd, Miami, FL, 33101 (Winter Home)',
    phone: '(555) 987-6543',
    email: 'janesmith@example.com',
  },
  {
    name: 'Michael Johnson',
    relationship: 'Brother',
    primaryAddress: '321 Oak Ave, Los Angeles, CA, 90012',
    additionalAddress: '202 Sunset Blvd, Malibu, CA, 90265 (Vacation Home)',
    phone: '(555) 222-3333',
    email: 'michaelj@example.com',
  },
];

export function AssociationsConnection({ isEditable = false, isDrawer }: AssociationsConnectionProps)  {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);
  const [newRecord, setNewRecord] = useState(false);

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
      title="Associations and Connections"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer?"grid mt-3 gap-3":"grid grid-cols-3 gap-3")}>
        {associates.map((associate, index) => (
          <div key={index} className="border rounded-lg py-1.5 px-2.5 relative ">
            <p className="text-xs">Known Associate</p>
            <div className="space-y-2 mt-2">
              <p className="text-black font-medium text-xs leading-5">
                Name: <span className="text-black text-xs font-normal leading-4">{associate.name}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Relationship: <span className="text-black text-xs font-normal leading-4">{associate.relationship}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Primary Address: <span className="text-black text-xs font-normal leading-4">{associate.primaryAddress}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Additional Address: <span className="text-black text-xs font-normal leading-4">{associate.additionalAddress}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Phone Number: <span className="text-black text-xs font-normal leading-4">{associate.phone}</span>
              </p>
              <p className="text-black font-medium text-xs leading-5">
                Email: <span className="text-black text-xs font-normal leading-4">{associate.email}</span>
              </p>
            </div>
            {/* <Button size="sm" className="absolute bottom-2 left-3">
              View Details
            </Button> */}
          </div>
        ))}
        {newRecord && <NewRecordForm setNewRecord={setNewRecord} />}
      </div>
      {!newRecord && editable && (
        <button onClick={() => setNewRecord(true)} className="mt-3 text-primary text-xs">
          + Add New
        </button>
      )}
    </Accordion>
  );
}

function NewRecordForm({ setNewRecord }: { setNewRecord: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div className="grid grid-cols-2 gap-3 border rounded-lg p-3">
      <Input size="sm" placeholder="Name" />
      <Input size="sm" placeholder="Relationship" />
      <Input size="sm" placeholder="Primary Address" />
      <Input size="sm" placeholder="Additional Address" />
      <Input size="sm" placeholder="Phone Number" />
      <Input size="sm" placeholder="Email" />
      <Button size="sm" variant="outline" onClick={() => setNewRecord(false)}>
        Cancel
      </Button>
      <Button size="sm" onClick={() => setNewRecord(false)}>
        Save
      </Button>
    </div>
  );
}
