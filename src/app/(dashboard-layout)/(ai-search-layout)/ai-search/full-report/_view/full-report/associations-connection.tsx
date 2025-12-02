import { Button } from '@/components/atom/button';
import { Input } from '@/components/atom/form-elements/input';
import cn from '@/lib/utils/cn';
import { SetStateAction } from 'jotai';
import { Dispatch, useState } from 'react';
import { toast } from 'sonner';
import { AccordionActionButton } from '../../../_components/accordion-action-button';
import { Accordion } from '../../_components/accordion';
import {AIResponseDetail} from "@/app/(dashboard-layout)/(ai-search-layout)/ai-search/_view/conversation/type";
import {BlueLocationIcon} from "@/components/atom/icons/ai-search/blue-location";
import {PiPhone, PiEnvelope} from "react-icons/pi";
import {IpAddressIcon} from "@/components/atom/icons/ai-search/ip-address";

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

  // Color array for location pins
  const locationColors = ['text-purple-500', 'text-green-500', 'text-blue-500', 'text-orange-500'];
  
  return (
    <Accordion
      translateButton={isEditable}
      title="Associations And Connections"
      {...(isLocalEdit && {
        actionButton: <AccordionActionButton setEditable={setEditable} mode={actionButtonMode} onClick={handleActionButtonClick} />,
      })}
    >
      <div>
        {(() => {
          // Group members by address
          const groupedByAddress = familyMembers.reduce((acc: any, member: any) => {
            const address = formatAddress(member.Address1, member.CITY, member.STATE, member.ZI);
            const key = address || 'Unknown Address';
            
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(member);
            return acc;
          }, {});

          const addressEntries = Object.entries(groupedByAddress);
          
          // Split addresses into two columns
          const leftColumn = addressEntries.slice(0, Math.ceil(addressEntries.length / 2));
          const rightColumn = addressEntries.slice(Math.ceil(addressEntries.length / 2));

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {/* Left Column */}
              <div className="space-y-4">
                {leftColumn.map(([address, members]: [string, any], addressIndex: number) => {
                  const colorClass = locationColors[addressIndex % locationColors.length];
                  return (
                    <div key={address} className="space-y-3">
                      {/* Address Header with Location Icon */}
                      <div className="flex items-center gap-2">
                        <BlueLocationIcon className={cn("w-5 h-5 flex-shrink-0", colorClass)} />
                        <h3 className="font-medium text-sm text-black">
                          {address}
                        </h3>
                      </div>
                      
                      {/* Associated People */}
                      <div className="space-y-3">
                        <p className="text-xs text-gray-600 font-medium">Associated People:</p>
                        {members.map((member: any, index: number) => {
                          const fullName = [member.FIRST, member.MID, member.LAST].filter(Boolean).join(' ');
                          const phone = formatPhone(member.PHONE || member.CELL_PHONE || member.HOME_PHONE);
                          const email = member.email || member.Email || member.EMAIL;
                          const ipAddress = member.IP || member.IPADDRESS || member.ip || member.ipaddress;
                          const deviceId = member.DEVICE_ID || member.device_id || member.Device_ID;
                          
                          return (
                            <div key={index} className="bg-purple-50 rounded-lg p-3 space-y-2">
                              {/* Name */}
                              <h4 className="font-semibold text-sm text-black">
                                {capitalizeWords(fullName)}
                              </h4>
                              
                              {/* Contact Information */}
                              <div className="space-y-1.5">
                                {phone && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <PiPhone className="text-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{phone}</span>
                                  </div>
                                )}
                                {email && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <PiEnvelope className="text-blue-500 w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{email}</span>
                                  </div>
                                )}
                                {ipAddress && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <IpAddressIcon className="text-blue-500 w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{ipAddress}</span>
                                  </div>
                                )}
                                {deviceId && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <svg className="text-primary w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-700">{deviceId}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                {rightColumn.map(([address, members]: [string, any], addressIndex: number) => {
                  const colorIndex = leftColumn.length + addressIndex;
                  const colorClass = locationColors[colorIndex % locationColors.length];
                  return (
                    <div key={address} className="space-y-3">
                      {/* Address Header with Location Icon */}
                      <div className="flex items-center gap-2">
                        <BlueLocationIcon className={cn("w-5 h-5 flex-shrink-0", colorClass)} />
                        <h3 className="font-medium text-sm text-black">
                          {address}
                        </h3>
                      </div>
                      
                      {/* Associated People */}
                      <div className="space-y-3">
                        <p className="text-xs text-gray-600 font-medium">Associated People:</p>
                        {members.map((member: any, index: number) => {
                          const fullName = [member.FIRST, member.MID, member.LAST].filter(Boolean).join(' ');
                          const phone = formatPhone(member.PHONE || member.CELL_PHONE || member.HOME_PHONE);
                          const email = member.email || member.Email || member.EMAIL;
                          const ipAddress = member.IP || member.IPADDRESS || member.ip || member.ipaddress;
                          const deviceId = member.DEVICE_ID || member.device_id || member.Device_ID;
                          
                          return (
                            <div key={index} className="bg-purple-50 rounded-lg p-3 space-y-2">
                              {/* Name */}
                              <h4 className="font-semibold text-sm text-black">
                                {capitalizeWords(fullName)}
                              </h4>
                              
                              {/* Contact Information */}
                              <div className="space-y-1.5">
                                {phone && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <PiPhone className="text-primary w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{phone}</span>
                                  </div>
                                )}
                                {email && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <PiEnvelope className="text-blue-500 w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{email}</span>
                                  </div>
                                )}
                                {ipAddress && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <IpAddressIcon className="text-blue-500 w-4 h-4 flex-shrink-0" />
                                    <span className="text-gray-700">{ipAddress}</span>
                                  </div>
                                )}
                                {deviceId && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <svg className="text-primary w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-700">{deviceId}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
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
