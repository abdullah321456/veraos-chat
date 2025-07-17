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
    // Add city/state combos (existing logic)
    if (details?.STATE && (details?.CITY || details?.City)) {
      locations.add(`${details.CITY || details.City}, ${details.ST || details.STATE || details.State}`);
    }
    records.forEach(record => {
      if (record && (record.STATE || record.ST || record.State) && (record.CITY || record.City)) {
        locations.add(`${record.CITY || record.City}, ${record.ST || record.STATE || record.State}`);
      }
      // Add complete address if available
      if (record && (record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address)) {
        const address = record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address;
        const city = record.CITY || record.City;
        const state = record.STATE || record.ST || record.State;
        const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip;
        let full = address;
        if (city) full += `, ${city}`;
        if (state) full += `, ${state}`;
        if (zip) full += ` ${zip}`;
        locations.add(full);
      }
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
        emails.add(record?.email || record?.Email || record?.EMAIL);
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
        (record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address) &&
        (record.CITY || record.City) &&
        (record.STATE || record.ST || record.State)
      ) {

        // Check for ZIP, ZIP4, ZIP5, Zip, zip in order
        const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip;
        const address = record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.address;
        const city = record.CITY || record.City;
        const state = record.STATE || record.ST || record.State;

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
    if (details.drunk_drivings?.IP) {
      ipAddresses.add(details.drunk_drivings.IP);
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

  console.log("identification details = ",details,"   ",getPhones())

  const phones = getPhones();
  const emails = getEmails();
  const ips = getIpAddresses();
  const fullAddress = getFullResidentialAddress();
  const locations = getLocations();

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
