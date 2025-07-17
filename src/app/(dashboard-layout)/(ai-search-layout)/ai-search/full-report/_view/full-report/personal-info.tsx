"use client";
import cn from "@/lib/utils/cn";
import {useState} from "react";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputDataCell} from "../../../_components/input-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "../../../_view/conversation/type";
import { toEnhancedTitleCase } from '@/lib/utils/title-case';

type PersonalInfoProps = {
    isEditable?: boolean;
    isDrawer?: boolean;
    details?: AIResponseDetail
};

export function PersonalInfo({
                                 isEditable = false,
                                 isDrawer,
                                 details
                             }: PersonalInfoProps) {
    const [isLocalEdit] = useState(isEditable);
    const [editable, setEditable] = useState(false);

    const calculateAge = (birthdate: string) => {
        if (!birthdate) return null;
        
        const today = new Date();
        const birthDate = new Date(birthdate);
        
        // Check if the date is valid
        if (isNaN(birthDate.getTime())) return null;
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const formatDateToMMDDYYYY = (dateString: string) => {
        if (!dateString) return undefined;
        
        const date = new Date(dateString);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) return dateString;
        
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
    };

    const actionButtonMode = isLocalEdit && !editable ? "edit" : "save";

    function handleActionButtonClick() {
        if (actionButtonMode !== "save") {
            setEditable(true);
        } else {
            setEditable(false);
            toast.success("Successfully saved");
        }
    }

    const formattedDOB = formatDateToMMDDYYYY(details?.DOB || '');
    const calculatedAge = calculateAge(details?.DOB || '');

    const hasMain = details?.FIRST || details?.MID || details?.LAST;
    const hasAliases = details?.AKA1 || details?.AKA2;
    const hasDOB = !!details?.DOB;
    const hasMarital = !!details?.MARITALSTA;
    const hasGender = !!details?.GENDER;
    const hasAny = hasMain || hasAliases || hasDOB || hasMarital || hasGender;

    if (!hasAny) return null;

    return (
        <Accordion
            translateButton={isEditable}
            title="Personal Information"
            {...(isLocalEdit && {
                actionButton: (
                    <AccordionActionButton
                        setEditable={setEditable}
                        mode={actionButtonMode}
                        onClick={handleActionButtonClick}
                    />
                ),
            })}>
            <div className={cn("grid gap-4", isDrawer ? "grid" : "grid-cols-6")}>
                {/* <InputDataCell label="Death index match" value="" editable={editable} onDone={(value) => console.log("value", value)} /> */}
                {/* <InputDataCell label="Name Prefix" value="Mr." editable={editable}/> */}
                {isDrawer ? (
                    <div className="grid grid-cols-3 gap-3">
                        {details?.FIRST && (
                          <InputDataCell
                              label="First Name"
                              value={toEnhancedTitleCase(details.FIRST)}
                              editable={editable}
                          />
                        )}
                        {details?.MID && (
                          <InputDataCell
                              label="Middle Name"
                              value={toEnhancedTitleCase(details.MID)}
                              editable={editable}
                          />
                        )}
                        {details?.LAST && (
                          <InputDataCell 
                              label="Last Name" 
                              value={toEnhancedTitleCase(details.LAST)} 
                              editable={editable}
                          />
                        )}
                    </div>
                ) : (
                    <>
                        {details?.FIRST && (
                          <InputDataCell
                              label="First Name"
                              value={toEnhancedTitleCase(details.FIRST)}
                              editable={editable}
                          />
                        )}
                        {details?.MID && (
                          <InputDataCell
                              label="Middle Name"
                              value={toEnhancedTitleCase(details.MID)}
                              editable={editable}
                          />
                        )}
                        {details?.LAST && (
                          <InputDataCell 
                              label="Last Name" 
                              value={toEnhancedTitleCase(details.LAST)} 
                              editable={editable}
                          />
                        )}
                    </>
                )}
                {/* <InputDataCell label="Name Prefix" value="Sr." editable={editable}/> */}
            </div>
            <div
                className={cn(
                    "grid gap-4",
                    isDrawer ? "grid grid-cols-2 mt-3" : "grid-cols-4 mt-3"
                )}>
                {details?.AKA1 && (
                  <InputDataCell
                      label="Alias/Nickname 1"
                      value={details.AKA1}
                      editable={editable}
                  />
                )}
                {details?.AKA2 && (
                  <InputDataCell
                      label="Alias/Nickname 2"
                      value={details.AKA2}
                      editable={editable}
                  />
                )}
                {formattedDOB && (
                  <InputDataCell
                      label="Date of Birth"
                      value={formattedDOB}
                      editable={editable}
                  />
                )}
                {calculatedAge && (
                  <InputDataCell 
                      label="Age" 
                      value={`${calculatedAge} years`} 
                      editable={editable}
                  />
                )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
                {details?.MARITALSTA && (
                  <InputDataCell
                      label="Marital Status"
                      value={details.MARITALSTA}
                      editable={editable}
                  />
                )}
                {details?.GENDER && (
                  <InputDataCell label="Gender" value={details.GENDER} editable={editable}/>
                )}
                {/* <InputDataCell label="Religion" value="" editable={editable}/> */}
            </div>
            {/* <div className="grid grid-cols-3 gap-4 mt-3">
                <InputDataCell label="No. of Children" value="" editable={editable}/>
            </div> */}
            {/* <div
                className={cn(
                    isDrawer ? "grid mt-3 gap-3" : "grid grid-cols-3 gap-3 mt-3"
                )}>
                <InputDataCell
                    label="Country of Origin/Citizenship Status"
                    value=""
                    editable={editable}
                />
                <>
                    {isDrawer ? (
                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <InputDataCell
                                label="National ID"
                                value=""
                                editable={editable}
                            />
                            <InputDataCell
                                label="Voter Registration"
                                value=""
                                editable={editable}
                            />
                        </div>
                    ) : (
                        <>
                            <InputDataCell
                                label="National ID"
                                value=""
                                editable={editable}
                            />
                            <InputDataCell
                                label="Voter Registration"
                                value=""
                                editable={editable}
                            />
                        </>
                    )}
                </>
            </div> */}
        </Accordion>
    );
}
