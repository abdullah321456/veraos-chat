import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import {AIResponseDetail} from "@/app/(dashboard-layout)/(ai-search-layout)/ai-search/_view/conversation/type";

type AssociationsConnectionProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
};

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  if (!str || str.trim() === '') return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
    .replace(/\/([a-z])/g, (match, letter) => '/' + letter.toUpperCase())
    .replace(/\(([a-z])/g, (match, letter) => '(' + letter.toUpperCase());
};

// Utility function to capitalize state names only
const capitalizeState = (str: string): string => {
  if (!str || str.trim() === '') return '';
  const trimmedStr = str.trim();
  
  // Handle state abbreviations (2 letters) - make them uppercase
  if (trimmedStr.length === 2) {
    return trimmedStr.toUpperCase();
  }
  
  // Handle full state names - capitalize first letter of each word
  return trimmedStr
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
};

// Utility function to format address
const formatAddress = (address: string, city: string, state: string, zip: string): string => {
  const formattedAddress = capitalizeWords(address || '');
  const formattedCity = capitalizeWords(city || '');
  const formattedState = capitalizeState(state || '');
  const formattedZip = zip || '';
  
  if (!formattedAddress && !formattedCity && !formattedState) return '';
  
  const parts = [formattedAddress, formattedCity, formattedState, formattedZip].filter(Boolean);
  return parts.join(', ');
};

// Utility function to format phone number
const formatPhone = (phone: string): string => {
  if (!phone || phone.trim() === '') return '';
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  return phone;
};

export function AssociationsConnection({ isEditable = false, isDrawer, details }: AssociationsConnectionProps) {
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

  // Get family members from details
  const familyMembers = details?.familyMembers || [];
  
  // Don't show the component if there are no family members
  if (familyMembers.length === 0) return null;

  return (
    <Accordion
      translateButton={isEditable}
      title="Associations and Connections"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div className={cn(isDrawer ? "grid gap-3" : "grid grid-cols-3 gap-3")}>
        {familyMembers.map((member: any, index: number) => {
          const fullName = [member.FIRST, member.MID, member.LAST].filter(Boolean).join(' ');
          const primaryAddress = formatAddress(member.Address1, member.CITY, member.STATE, member.ZI);
          const phone = formatPhone(member.PHONE || member.CELL_PHONE || member.HOME_PHONE);
          
          return (
            <div key={index} className="border rounded-lg py-1.5 px-2.5 relative">
              <p className="text-xs"></p>
              <div className="space-y-2 mt-2">
                {fullName && (
                  <p className="text-black font-medium text-xs leading-5">
                    Name: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(fullName)}</span>
                  </p>
                )}
                {member.Gender && (
                  <p className="text-black font-medium text-xs leading-5">
                    Gender: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(member.Gender)}</span>
                  </p>
                )}
                {member.DOB && (
                  <p className="text-black font-medium text-xs leading-5">
                    Date of Birth: <span className="text-black text-xs font-normal leading-4">{member.DOB}</span>
                  </p>
                )}
                {primaryAddress && (
                  <p className="text-black font-medium text-xs leading-5">
                    Address: <span className="text-black text-xs font-normal leading-4">{primaryAddress}</span>
                  </p>
                )}
                {phone && (
                  <p className="text-black font-medium text-xs leading-5">
                    Phone: <span className="text-black text-xs font-normal leading-4">{phone}</span>
                  </p>
                )}
                {member.AKA1 && (
                  <p className="text-black font-medium text-xs leading-5">
                    Alias: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(member.AKA1)}</span>
                  </p>
                )}
                {member.AKA2 && (
                  <p className="text-black font-medium text-xs leading-5">
                    Alias 2: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(member.AKA2)}</span>
                  </p>
                )}
                {member.COUNTY && (
                  <p className="text-black font-medium text-xs leading-5">
                    County: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(member.COUNTY)}</span>
                  </p>
                )}
                {false && (
                  <p className="text-black font-medium text-xs leading-5">
                    Source: <span className="text-black text-xs font-normal leading-4">{capitalizeWords(member.SOURCE)}</span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
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
