import {BlueLocationIcon} from "@/components/atom/icons/ai-search/blue-location";
import {IpAddressIcon} from "@/components/atom/icons/ai-search/ip-address";
import cn from "@/lib/utils/cn";
import {formatPhoneNumbers} from "@/lib/utils/phone-formatter";
import {useState} from "react";
import {PiEnvelope, PiPhone, PiGlobe} from "react-icons/pi";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputArrayDataCell} from "../../../_components/input-array-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "../../../_view/conversation/type";
import {normalizeMergeResponse} from "../../../../../../../types";

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


function normalizeAddress(address: any) {
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

        if(details.Known_Addresses){
            return details.Known_Addresses
        }


        if(details.criminals && details.criminals.length>0 && details.criminals[0].Known_Addresses){
            return details.criminals[0].Known_Addresses
        }

        const locations = new Set<string>();
        const records = [
            details,
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.criminals_small)
        ];


        const address = capitalizeWords(details.ADDRESS || details.ADDRESS1 || details.ADDRESS2 || details.Address1 || details.address
            || details.Address || details.Address2 || details.N_ADDRESS || "");
        const city = capitalizeWords(details.CITY || details.City || details.N_CITY || "");
        const state = capitalizeState(details.STATE || details.ST || details.State || details.N_STATE || "");
        const zip = details.ZIP || details.ZIP4 || details.ZIP5 || details.Zip || details.zip || details.Zi || details.ZI
            || details.N_ZIP;


        if (address || city || state) {
            locations.add(`${address || ""} ${city || ""} ${state || ""} ${zip || ""}`);
        }


        records.push({PHONE: details.PHONE});
        records.push({PHONE: details.CELL_PHONE})
        records.push({PHONE: details.HOME_PHONE})
        records.push({PHONE: details.PHONE1})
        records.push({PHONE: details.PHONE2})


        records.forEach(record => {
            if (!record) return;
            const address = capitalizeWords(record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
                || record.Address || record.Address2 || record.N_ADDRESS || "");
            const city = capitalizeWords(record.CITY || record.City || record.N_CITY || "");
            const state = capitalizeState(record.STATE || record.ST || record.State || record.N_STATE || "");
            const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip || record.Zi || details.ZI ||
                record.N_ZIP;


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

        if(details.Know_Emails){
            return details.Know_Emails
        }



        if(details.criminals && details.criminals.length>0 && details.criminals[0].Know_Emails){
            return (Array.from(details.criminals[0].Know_Emails))
        }

        const emails = new Set<string>();
        const records = [
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.criminals_small),
            ...normalizeMergeResponse(details.devices)

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

        if(details.Known_PHONE){
            return formatPhoneNumbers(Array.from(details.Known_PHONE))
        }


        if(details.criminals && details.criminals.length>0 && details.criminals[0].Known_PHONE){
            return formatPhoneNumbers(Array.from(details.criminals[0].Known_PHONE))
        }

        const phones = new Set<string>();
        const records = [
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.criminals_small)
        ];
        records.push({PHONE: (details.PHONE || "").replace(/[^0-9]/g, "")});
        records.push({PHONE: (details.CELL_PHONE || "").replace(/[^0-9]/g, "")})
        records.push({PHONE: (details.HOME_PHONE || "").replace(/[^0-9]/g, "")})
        records.push({PHONE: (details.PHONE1 || "").replace(/[^0-9]/g, "")})
        records.push({PHONE: (details.PHONE2 || "").replace(/[^0-9]/g, "")})

        records.forEach(record => {
            if (record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
                || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE
                || record?.PHONE_1 || record?.PHONE_2 || record?.PHONE_3 || record?.POE_PHONE
            ) {
                const phone = record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
                    || record?.PHONE_1 || record?.PHONE_2 || record?.PHONE_3
                    || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE || record?.POE_PHONE;
                if(phone && phone.length>0) phones.add(phone.replace(/[^0-9]/g, ""));
            }
        });

        console.log("phones = ",records)
        // Format phone numbers and remove duplicates by normalizing them
        const formattedPhones = formatPhoneNumbers(Array.from(phones));
        return Array.from(formattedPhones);
    };


    const getAddress = () => {
        if (!details) return [];
        const addressArray = new Set<string>();
        const records = [
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.criminals_small)
        ];
        records.push({ADDRESS: details.ADDRESS})

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
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.criminals_small)
        ];

        for (const record of records) {

            if (
                record &&
                (record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
                    || record.Address || record.Address2 || record.N_ADDRESS) &&
                (record.CITY || record.City || record.N_CITY) &&
                (record.STATE || record.ST || record.State || record.N_STATE)
            ) {

                // Check for ZIP, ZIP4, ZIP5, Zip, zip in order
                const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip || record.Zi || record.ZI
                    || record.N_ZIP;
                const address = capitalizeWords(record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1 || record.address
                    || record.Address || record.Address2 || record.N_ADDRESS || "");
                const city = capitalizeWords(record.CITY || record.City || record.N_CITY || "");
                const state = capitalizeState(record.STATE || record.ST || record.State || record.N_STATE || "");

                if (zip) {
                    return [`${address}, ${city}, ${state} ${zip}`];
                } else {
                    return [`${address}, ${city}, ${state}`];
                }
            }
        }
        return [];
    };


    const getIpAddresses = () => {
        if (!details) return [];

        if(details.Known_IPAddresses){
            return details.Known_IPAddresses
        }

        const ipAddresses = new Set<string>();

        // Get IP addresses from drunk_drivings.IP
        if (details.IP && details.IP.length > 0) {
            ipAddresses.add(details.IP);
        }

        // Get IP addresses from education.IPADDRESS
        if (details.education?.IPADDRESS) {
            ipAddresses.add(details.education.IPADDRESS);
        }




        // Also check other records that might have IP addresses
        const records = [
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.criminals_small)
        ];


        console.log("record?.criminals?.Known_IPAddresses = ",records)

        records.forEach(record => {
            if (record?.IP || record?.IPADDRESS || record?.ip || record?.ipaddress || record?.Known_IPAddresses) {
                const ip = record?.IP || record?.IPADDRESS || record?.ip || record?.ipaddress;
                if (ip) {
                    ipAddresses.add(ip);
                }

                if(record?.Known_IPAddresses){
                    record?.Known_IPAddresses.forEach(ip => {
                        if (ip && typeof ip === 'string') {
                            ipAddresses.add(ip);
                        }
                    });
                }
            }
        });

        return Array.from(ipAddresses);
    };

    const getUuids = () => {
        if (!details) return [];

        const uuids = new Set<string>();

        // Get UUIDs from DEVICE_ID field
        if (details.DEVICE_ID) {
            if (Array.isArray(details.DEVICE_ID)) {
                details.DEVICE_ID.forEach(deviceId => {
                    if (deviceId && typeof deviceId === 'string') {
                        uuids.add(deviceId);
                    }
                });
            } else if (typeof details.DEVICE_ID === 'string') {
                uuids.add(details.DEVICE_ID);
            }
        }

        // Also check devices records for device_id fields
        const records = [
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals_small)
        ];

        records.forEach(record => {
            if (record?.device_id || record?.DEVICE_ID || record?.Device_ID || record?.Known_DeviceIDs) {
                const deviceId = record?.device_id || record?.DEVICE_ID || record?.Device_ID || record?.Known_DeviceIDs;
                if (deviceId) {
                    if (Array.isArray(deviceId)) {
                        deviceId.forEach(id => {
                            if (id && typeof id === 'string') {
                                uuids.add(id);
                            }
                        });
                    } else if (typeof deviceId === 'string') {
                        uuids.add(deviceId);
                    }
                }
            }
        });

        return Array.from(uuids);
    };



    const getCarVins = () => {
        if (!details) return [];

        const carVins = new Set<string>();


        // Also check devices records for device_id fields
        const records = [
            ...normalizeMergeResponse(details.devices),
            ...normalizeMergeResponse(details.education),
            ...normalizeMergeResponse(details.rv),
            ...normalizeMergeResponse(details.motorcycles),
            ...normalizeMergeResponse(details.national_drivers_license),
            ...normalizeMergeResponse(details.bankruptcy),
            ...normalizeMergeResponse(details.automobile),
            ...normalizeMergeResponse(details.foreign_movers),
            ...normalizeMergeResponse(details.cell_records),
            ...normalizeMergeResponse(details.drunk_drivings),
            ...normalizeMergeResponse(details.voip),
            ...normalizeMergeResponse(details.vets),
            ...normalizeMergeResponse(details.email_master),
            ...normalizeMergeResponse(details.criminals),
            ...normalizeMergeResponse(details.dob_master),
            ...normalizeMergeResponse(details.criminals_small)
        ];

        records.forEach(record => {
            if (record?.Known_CarVINs) {
                const carVinRecord = record.Known_CarVINs;
                if (carVinRecord) {
                    if (Array.isArray(carVinRecord)) {
                        carVinRecord.forEach(r => {
                            if (r && typeof r === 'string') {
                                carVins.add(r);
                            }
                        });
                    } else if (typeof carVinRecord === 'string') {
                        carVins.add(carVinRecord);
                    }
                }
            }
        });

        return Array.from(carVins);
    };

    const getExPatriotDate = () => {
        if (!details) return [];
        const exPatriotDates = new Set<string>();

        // Check for MOVEDATE_ in main details
        if ((details as any).MOVEDATE_) {
            exPatriotDates.add((details as any).MOVEDATE_);
        }

        // Check in other records
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
            if (record && (record as any).MOVEDATE_) {
                exPatriotDates.add((record as any).MOVEDATE_);
            }
        });

        return Array.from(exPatriotDates);
    };

    const phones = getPhones();
    const emails = getEmails();
    const ips = getIpAddresses();
    const uuids = getUuids();
    const fullAddress = getFullResidentialAddress();
    let locations = getLocations();
    const exPatriotDates = getExPatriotDate();
    const carVins = getCarVins();


    console.log("carVins", carVins)


    locations = locations.length > 0 && fullAddress.length > 0 ? locations.filter((l: any) => normalizeAddress(fullAddress[0]) !== normalizeAddress(l)) : [];

    const hasAnyData = phones.length > 0 || emails.length > 0 || ips.length > 0 || uuids.length > 0 || fullAddress.length > 0 || locations.length > 0 || exPatriotDates.length > 0;

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
                            entryPrefix={<PiPhone className="text-primary min-w-4 h-4"/>}
                            label="Verified Cell Phone Numbers"
                            editable={editable}
                            onDone={(value) => console.log("phone-numbers", value)}
                            values={phones}
                        />
                    )}
                    {emails.length > 0 && (
                        <InputArrayDataCell
                            entryPrefix={<PiEnvelope className="text-primary min-w-4 h-4"/>}
                            label="Email Addresses"
                            editable={editable}
                            onDone={(value) => console.log("email", value)}
                            values={emails}
                        />
                    )}
                    {ips.length > 0 && (
                        <InputArrayDataCell
                            entryPrefix={<IpAddressIcon className="text-primary min-w-4 h-4"/>}
                            label="IP Addresses"
                            editable={editable}
                            onDone={(value) => console.log("ip-addresses", value)}
                            values={ips}
                        />
                    )}
                    {uuids.length > 0 && (
                        <InputArrayDataCell
                            entryPrefix={<IpAddressIcon className="text-primary min-w-4 h-4"/>}
                            label="Mobile Device Identifiers"
                            editable={editable}
                            onDone={(value) => console.log("uuids", value)}
                            values={uuids}
                        />
                    )}
                    {/*{carVins.length > 0 && (*/}
                    {/*    <InputArrayDataCell*/}
                    {/*        entryPrefix={<IpAddressIcon className="text-primary min-w-4 h-4"/>}*/}
                    {/*        label="Car Vins"*/}
                    {/*        editable={editable}*/}
                    {/*        onDone={(value) => console.log("vin", value)}*/}
                    {/*        values={carVins}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {fullAddress.length > 0 && (
                        <InputArrayDataCell
                            entryPrefix={<BlueLocationIcon className="min-w-4 h-4"/>}
                            label="Full Residential Address"
                            editable={editable}
                            onDone={(value) => console.log("full-residential-address", value)}
                            values={fullAddress}
                        />
                    )}
                    {exPatriotDates.length > 0 && (
                        <InputArrayDataCell
                            entryPrefix={<PiGlobe className="text-primary min-w-4 h-4"/>}
                            label="Ex-Patriot Date"
                            editable={editable}
                            onDone={(value) => console.log("ex-patriot-date", value)}
                            values={exPatriotDates}
                        />
                    )}
                    {locations.length > 0 && (!exPatriotDates || exPatriotDates.length < 1) && (
                        <InputArrayDataCell
                            entryPrefix={<BlueLocationIcon className="min-w-4 h-4"/>}
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
