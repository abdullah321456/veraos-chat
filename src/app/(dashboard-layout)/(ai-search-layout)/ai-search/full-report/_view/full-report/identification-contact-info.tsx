import { BlueLocationIcon } from "@/components/atom/icons/ai-search/blue-location";
import { IpAddressIcon } from "@/components/atom/icons/ai-search/ip-address";
import cn from "@/lib/utils/cn";
import { formatPhoneNumbers } from "@/lib/utils/phone-formatter";
import { useState } from "react";
import { PiEnvelope, PiPhone } from "react-icons/pi";
import { toast } from "sonner";
import { AccordionActionButton } from "../../../_components/accordion-action-button";
import { InputArrayDataCell } from "../../../_components/input-array-data-cell";
import { Accordion } from "../../_components/accordion";
import { AIResponseDetail } from "../../../_view/conversation/type";

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
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};



function normalizeAddress(address:any) {
  return address
      .toLowerCase()
      .replace(/\s+/g, ' ')         // Replace multiple spaces with single space
      .replace(/[^a-z0-9\s]/g, '')  // Remove punctuation
      .trim();
}


// Utility function to capitalize first letter of each word (for address and city)
const capitalizeWords = (str: string): string => {
  if (!str || str.trim() === '') return '';

  return str
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Utility function to capitalize only the first letter (for emails)
const capitalizeFirstLetter = (str: string): string => {
  if (!str || str.trim() === '') return '';

  return str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase();
};

type IdentificationAndContactProps = {
  isEditable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
};

export function IdentificationAndContact({
  isEditable = false,
  isDrawer,
  details,
}: IdentificationAndContactProps) {
  const [isLocalEdit] = useState(isEditable);
  const [editable, setEditable] = useState(false);

  const actionButtonMode = isLocalEdit && !editable ? "edit" : "save";

  function handleActionButtonClick() {
    if (actionButtonMode !== "save") {
      setEditable(true);
    } else {
      setEditable(false);
      toast.success("Successfully saved");
    }
  }

  const getLocations = () => {
    if (!details) return [];
    const locations = new Set<string>();
    const records = [
      details,
      details.education,
      details.rv,
      details.motorcycles,
      details.national_drivers_license,
      details.bankruptcy,
      details.automobile,
      details.foreign_movers,
      details.cell_records,
      details.drunk_drivings,
      details.voip,
      details.vets
    ];


    const address = capitalizeWords(details.ADDRESS || details.ADDRESS1 || details.ADDRESS2 || details.Address1 || details.address
     || details.Address ||details.Address2 || "");
    const city = capitalizeWords(details.CITY || details.City || "");
    const state = capitalizeState(details.STATE || details.ST || details.State || "");
    const zip = details.ZIP || details.ZIP4 || details.ZIP5 || details.Zip || details.zip || details.Zi || details.ZI;


    if (address || city || state) {
      locations.add(`${address || ""} ${city || ""} ${state || ""} ${zip || ""}`);
    }


    records.forEach(record => {
      if(!record) return;
      const address = capitalizeWords(record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
          || record.Address ||record.Address2 || "");
      const city = capitalizeWords(record.CITY || record.City || "");
      const state = capitalizeState(record.STATE || record.ST || record.State || "");
      const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip || record.Zi || details.ZI;



      if (address || city || state) {
        locations.add(`${address || ""} ${city || ""} ${state || ""} ${zip || ""}`);
      }
      // Add complete address if available
      // if (record && (record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address)) {
      //   const address = record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address;
      //   const city = record.CITY || record.City;
      //   const state = record.STATE || record.ST || record.State;
      //   const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip;
      //   let full = address;
      //   if (city) full += `, ${city}`;
      //   if (state) full += `, ${state}`;
      //   if (zip) full += ` ${zip}`;
      //   locations.add(full);
      // }
    });
    return Array.from(locations);
  };

  const getEmails = () => {
    if (!details) return [];
    const emails = new Set<string>();
    const records = [
      details.education,
      details.rv,
      details.motorcycles,
      details.national_drivers_license,
      details.bankruptcy,
      details.automobile,
      details.foreign_movers,
      details.cell_records,
      details.drunk_drivings,
      details.voip,
      details.vets
    ];

    records.forEach(record => {
      if (record?.email || record?.Email || record?.EMAIL) {
        const email = record?.email || record?.Email || record?.EMAIL;
        if (email) {
          emails.add(capitalizeFirstLetter(email));
        }
      }
    });

    return Array.from(emails);
  };

  const getPhones = () => {
    if (!details) return [];
    const phones = new Set<string>();
    const records = [
      details.education,
      details.rv,
      details.motorcycles,
      details.national_drivers_license,
      details.bankruptcy,
      details.automobile,
      details.foreign_movers,
      details.cell_records,
      details.drunk_drivings,
      details.voip,
      details.vets
    ];
      records.push({PHONE:details.PHONE})

    records.forEach(record => {
      if (record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
          || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE) {
        const phone = record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
            || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE;
        if (phone) {
          phones.add(phone);
        }
      }
    });

    return formatPhoneNumbers(Array.from(phones));
  };


    const getAddress = () => {
        if (!details) return [];
        const addressArray = new Set<string>();
        const records = [
            details.education,
            details.rv,
            details.motorcycles,
            details.national_drivers_license,
            details.bankruptcy,
            details.automobile,
            details.foreign_movers,
            details.cell_records,
            details.drunk_drivings,
            details.voip,
            details.vets
        ];
        records.push({ADDRESS:details.ADDRESS})

        records.forEach(record => {
            if (record?.ADDRESS) {
                const address = record?.ADDRESS;
                if (address) {
                    addressArray.add(address);
                }
            }
        });

        return Array.from(addressArray);
    };

  const getFullResidentialAddress = () => {
    if (!details) return [];
    // Try to find the first record with address, city, state, and zip
    const records = [
      details,
      details.education,
      details.rv,
      details.motorcycles,
      details.national_drivers_license,
      details.bankruptcy,
      details.automobile,
      details.foreign_movers,
      details.cell_records,
      details.drunk_drivings,
      details.voip,
      details.vets
    ];

    for (const record of records) {

      if (
        record &&
        (record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
            || record.Address ||record.Address2) &&
        (record.CITY || record.City) &&
        (record.STATE || record.ST || record.State)
      ) {

        // Check for ZIP, ZIP4, ZIP5, Zip, zip in order
        const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip || record.Zi || record.ZI;
        const address = capitalizeWords(record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
            || record.Address ||record.Address2 || "");
        const city = capitalizeWords(record.CITY || record.City || "");
        const state = capitalizeState(record.STATE || record.ST || record.State || "");

        if (zip) {
          return [`${address}, ${city}, ${state} ${zip}`];
        }else{
          return [`${address}, ${city}, ${state}`];
        }
      }
    }
    return [];
  };



  const getIpAddresses = () => {
    if (!details) return [];
    const ipAddresses = new Set<string>();

    // Get IP addresses from drunk_drivings.IP
    if (details.IP && details.IP.length>0) {
      ipAddresses.add(details.IP);
    }

    // Get IP addresses from education.IPADDRESS
    if (details.education?.IPADDRESS) {
      ipAddresses.add(details.education.IPADDRESS);
    }

    // Also check other records that might have IP addresses
    const records = [
      details.education,
      details.rv,
      details.motorcycles,
      details.national_drivers_license,
      details.bankruptcy,
      details.automobile,
      details.foreign_movers,
      details.cell_records,
      details.drunk_drivings,
      details.voip,
      details.vets
    ];

    records.forEach(record => {
      if (record?.IP || record?.IPADDRESS || record?.ip || record?.ipaddress) {
        const ip = record?.IP || record?.IPADDRESS || record?.ip || record?.ipaddress;
        if (ip) {
          ipAddresses.add(ip);
        }
      }
    });

    return Array.from(ipAddresses);
  };


  const phones = getPhones();
  const emails = getEmails();
  const ips = getIpAddresses();
  const fullAddress = getFullResidentialAddress();
  let locations = getLocations();


  console.log("full address",locations,"   ",fullAddress)


  locations=locations.length>0 && fullAddress.length>0 ? locations.filter((l:any)=>normalizeAddress(fullAddress[0])!==normalizeAddress(l)):[];

  const hasAnyData = phones.length > 0 || emails.length > 0 || ips.length > 0 || fullAddress.length > 0 || locations.length > 0;

  if (!hasAnyData) return null;

  return (
    <Accordion
      translateButton={isEditable}
      title="Identification and Contact Information"
      {...(isLocalEdit && {
        actionButton: (
          <AccordionActionButton
            setEditable={setEditable}
            mode={actionButtonMode}
            onClick={handleActionButtonClick}
          />
        ),
      })}>
      {hasAnyData && (
        <div
          className={cn(
            isDrawer ? "grid gap-4 mt-3" : "grid grid-cols-2 gap-4 mt-3"
          )}>
          {phones.length > 0 && (
            <InputArrayDataCell
              entryPrefix={<PiPhone className="text-primary min-w-4 h-4" />}
              label="Verified Cell Phone Numbers"
              editable={editable}
              onDone={(value) => console.log("phone-numbers", value)}
              values={phones}
            />
          )}
          {emails.length > 0 && (
            <InputArrayDataCell
              entryPrefix={<PiEnvelope className="text-primary min-w-4 h-4" />}
              label="Email Addresses"
              editable={editable}
              onDone={(value) => console.log("email", value)}
              values={emails}
            />
          )}
          {ips.length > 0 && (
            <InputArrayDataCell
              entryPrefix={<IpAddressIcon className="text-primary min-w-4 h-4" />}
              label="IP Addresses"
              editable={editable}
              onDone={(value) => console.log("ip-addresses", value)}
              values={ips}
            />
          )}
          {fullAddress.length > 0 && (
            <InputArrayDataCell
              entryPrefix={<BlueLocationIcon className="min-w-4 h-4" />}
              label="Full Residential Address"
              editable={editable}
              onDone={(value) => console.log("full-residential-address", value)}
              values={fullAddress}
            />
          )}
          {locations.length > 0 && (
            <InputArrayDataCell
              entryPrefix={<BlueLocationIcon className="min-w-4 h-4" />}
              label="Address History"
              editable={editable}
              onDone={(value) => console.log("address-history", value)}
              values={locations}
            />
          )}
        </div>
      )}
    </Accordion>
  );
}
