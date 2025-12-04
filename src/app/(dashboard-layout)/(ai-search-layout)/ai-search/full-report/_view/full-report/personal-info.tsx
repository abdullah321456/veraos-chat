"use client";
import cn from "@/lib/utils/cn";
import {useState, useEffect} from "react";
import {toast} from "sonner";
import {AccordionActionButton} from "../../../_components/accordion-action-button";
import {InputDataCell} from "../../../_components/input-data-cell";
import {Accordion} from "../../_components/accordion";
import {AIResponseDetail} from "../../../_view/conversation/type";
import {toEnhancedTitleCase} from '@/lib/utils/title-case';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string | number | any): string => {
    if (!str) return '';

    // Convert to string if it's not already
    const strValue = String(str);
    if (strValue.trim() === '') return '';

    return strValue
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

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
    const darkModeContext = useDarkMode();
    const [isLocalEdit] = useState(isEditable);
    const [editable, setEditable] = useState(false);
    
    // Helper to get dark mode from localStorage
    const getDarkModeFromStorage = () => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('darkMode');
                return saved === 'true';
            } catch {
                return false;
            }
        }
        return false;
    };

    // Always read from localStorage as source of truth (works even in portals)
    // Also sync with context if it's available and true
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        const storageValue = getDarkModeFromStorage();
        const contextValue = darkModeContext.isDarkMode;
        // Use context if it's explicitly true, otherwise trust localStorage
        return contextValue === true ? true : storageValue;
    });

    // Sync dark mode from context and localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const updateDarkMode = () => {
            const storageValue = getDarkModeFromStorage();
            const contextValue = darkModeContext.isDarkMode;
            // Prefer context if it's true, otherwise use storage
            const newValue = contextValue === true ? true : storageValue;
            setIsDarkMode(newValue);
        };

        // Initial update immediately
        updateDarkMode();

        // Listen to storage events (from other tabs)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'darkMode') {
                updateDarkMode();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        
        // Poll localStorage frequently for same-tab changes (more aggressive polling)
        const interval = setInterval(updateDarkMode, 50);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [darkModeContext.isDarkMode]);

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

        // Add one day to the date
        date.setDate(date.getDate() + 1);

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

    const formattedDOB = formatDateToMMDDYYYY(details?.DOB || (details?.criminals && details.criminals.length>0 && details.criminals[0].DOB) || '');
    const calculatedAge = calculateAge(details?.DOB ||
        (details?.criminals && details.criminals.length>0 && details.criminals[0].DOB) || '');

    const hasMain = details?.FIRST || details?.MID || details?.LAST;
    const hasAliases = details?.AKA1 || details?.AKA2;
    const hasDOB = !!details?.DOB || (details?.criminals && details.criminals.length>0 && details.criminals[0].DOB);
    const hasMarital = !!details?.MARITALSTA || !!details?.Marital_Status;
    const hasGender = !!details?.GENDER || !!details?.Gender ||
        (details?.criminals && details.criminals.length>0 && details.criminals[0].Gender)
    const isSmoker = !!details?.SMOKER;
    const hasIncome = !!details?.Income;
    const hasHomeowner = !!details?.HOMEOWNER;
    const hasOwnRent = !!details?.OWN_RENT;
    const hasEthnicity = !!details?.ETHNICITY;
    const hasSkinTone = !!details?.SkinTone;
    const hasRace = !!details?.RACE;
    const hasScarsMarks = !!(details as any)?.ScarsMarks;
    const hasMilitaryService = !!(details as any)?.MilitaryService;
    const hasDOD = !!details?.DOD;
    const hasDeathRecord = !!(details as any)?.Death_Record || !!((details as any)?.criminals && (details as any).criminals.length > 0 && (details as any).criminals[0]?.Death_Record);
    const hasAny = hasMain || hasAliases || hasDOB || hasMarital || hasGender || isSmoker || hasIncome || hasHomeowner || hasOwnRent || hasEthnicity || hasSkinTone || hasRace || hasScarsMarks || hasMilitaryService || hasDOD || hasDeathRecord;

    if (!hasAny) return null;


    // Debug: Log dark mode state
    useEffect(() => {
        console.log("PersonalInfo - isDarkMode:", isDarkMode, "isDrawer:", isDrawer, "storage:", getDarkModeFromStorage(), "context:", darkModeContext.isDarkMode);
    }, [isDarkMode, isDrawer, darkModeContext.isDarkMode]);
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
            {(() => {
                const deathRecord = (details as any)?.Death_Record || 
                                   ((details as any)?.criminals && (details as any).criminals.length > 0 && (details as any).criminals[0]?.Death_Record);
                
                if (deathRecord) {
                    const containerBg = isDarkMode ? '#4A1F1F' : '#FDF2F8';
                    const containerBorder = isDarkMode ? 'rgba(239, 68, 68, 0.3)' : '#EF4444';
                    const dividerBorder = isDarkMode ? 'rgba(239, 68, 68, 0.3)' : '#EF4444';
                    const labelColor = isDarkMode ? '#FFFFFF' : '#374151';
                    const valueColor = isDarkMode ? '#FFFFFF' : '#111827';
                    
                    return (
                        <div 
                            className="mb-4 border rounded-md overflow-hidden"
                            style={{
                                backgroundColor: containerBg,
                                borderColor: containerBorder
                            }}
                        >
                            <div className="flex flex-col sm:flex-row">
                                {deathRecord.Death_Index_Match !== undefined && (
                                    <div 
                                        className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r last:border-b-0 last:border-r-0"
                                        style={{ borderColor: dividerBorder }}
                                    >
                                        <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>Death Index Match</div>
                                        <div className="text-sm font-semibold" style={{ color: valueColor }}>{deathRecord.Death_Index_Match ? "Yes" : "No"}</div>
                                    </div>
                                )}
                                {deathRecord.Death_Date && (
                                    <div 
                                        className="flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r last:border-b-0 last:border-r-0"
                                        style={{ borderColor: dividerBorder }}
                                    >
                                        <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>Death Date</div>
                                        <div className="text-sm font-semibold" style={{ color: valueColor }}>{deathRecord.Death_Date}</div>
                                    </div>
                                )}
                                {deathRecord.Cause_of_Death && (
                                    <div className="flex-1 px-4 py-3">
                                        <div className="text-xs font-medium mb-1" style={{ color: labelColor }}>Death Cause</div>
                                        <div className="text-sm font-semibold" style={{ color: valueColor }}>{deathRecord.Cause_of_Death}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }
                return null;
            })()}
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
                        {(details?.MID || (details.criminals?.length>0 && details.criminals[0].MID)) && (
                            <InputDataCell
                                label="Middle Name"
                                value={toEnhancedTitleCase(details.MID || details.criminals[0].MID)}
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
                        label="Alias 1"
                        value={capitalizeWords(details.AKA1)}
                        editable={editable}
                    />
                )}
                {details?.AKA2 && (
                    <InputDataCell
                        label="Alias 2"
                        value={capitalizeWords(details.AKA2)}
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
                        value={capitalizeWords(`${calculatedAge} years`)}
                        editable={editable}
                    />
                )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
                {(details?.MARITALSTA || details?.Marital_Status) && (
                    <InputDataCell
                        label="Marital Status"
                        value={capitalizeWords(details?.MARITALSTA || details?.Marital_Status)}
                        editable={editable}
                    />
                )}
                {(details?.GENDER || details?.Gender ||
                    (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].GENDER)
                ) && (
                    <InputDataCell label="Gender" value={capitalizeWords(details?.GENDER || details?.Gender ||
                        (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].GENDER))}
                                   editable={editable}/>
                )}
                {details?.SMOKER && (
                    <InputDataCell label="Smoker" value={capitalizeWords(details.SMOKER)} editable={editable}/>
                )}
                {details?.Income && (
                    <InputDataCell label="Income" value={capitalizeWords(details.Income)} editable={editable}/>
                )}
                {details?.HOMEOWNER && (
                    <InputDataCell label="Homeowner" value={capitalizeWords(details.HOMEOWNER)} editable={editable}/>
                )}
                {details?.OWN_RENT && (
                    <InputDataCell
                        label="Dwelling Status"
                        value={details.OWN_RENT.toLowerCase() === 'own' ? 'Own' : 'Rent'}
                        editable={editable}
                    />
                )}
                {/*{details?.ETHNICITY && (*/}
                {/*    <InputDataCell label="Ethnicity" value={capitalizeWords(details.ETHNICITY)} editable={editable}/>*/}
                {/*)}*/}
                {details?.SkinTone && (
                    <InputDataCell label="Skin Tone" value={capitalizeWords(details.SkinTone)} editable={editable}/>
                )}
                {(details?.RACE || details?.ETHNICITY ||
                    (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].RACE)
                ) && (
                    <InputDataCell label="Race" value={capitalizeWords(details.RACE || details.ETHNICITY ||
                        (details?.criminals && details?.criminals.length > 0 && details?.criminals[0].RACE)
                    )}
                                   editable={editable}/>
                )}
                {(details as any)?.ScarsMarks && (
                    <InputDataCell label="Scars & Tattoos" value={capitalizeWords((details as any).ScarsMarks)}
                                   editable={editable}/>
                )}
                {(details as any)?.MilitaryService && (
                    <InputDataCell label="Military Service" value={capitalizeWords((details as any).MilitaryService)}
                                   editable={editable}/>
                )}
                {details?.DOD && (
                    <InputDataCell label="Date of Death" value={capitalizeWords(details.DOD)} editable={editable}/>
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
