'use client';
import cn from '@/lib/utils/cn';
import {SVGProps} from 'react';
import {PiArrowRight} from 'react-icons/pi';
import {AIResponseDetail} from './type';
import {FullReportOverlay} from './full-report-overlay';
import {useDrawer} from '@/components/drawer-views/use-drawer';
import {DrawerHeader} from './cta';
import {FullReport} from '../../full-report/_view/full-report';
import {toEnhancedTitleCase} from '@/lib/utils/title-case';
import {normalizeMergeResponse} from "../../../../../../types";
import {apiService} from '@/services/apiService';
import { useState, useEffect } from 'react';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';


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

const capitalizeWords = (str: string): string => {
    if (!str || str.trim() === '') return '';

    return str
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export function AiResponseDetails({detailsData}: { detailsData: (AIResponseDetail & { _index?: string })[] }) {
    const [showFullReport, setShowFullReport] = useState(false);
    const [fullReportDetails, setFullReportDetails] = useState<AIResponseDetail | null>(null);
    const [isLargeDevice, setIsLargeDevice] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState(false);
    const {openDrawer} = useDrawer();
    const darkModeContext = useDarkMode();
    
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
        const storageValue = getDarkModeFromStorage();
        const contextValue = darkModeContext.isDarkMode;
        // Use context if it's explicitly true, otherwise trust localStorage
        return contextValue === true ? true : storageValue;
    });

    useEffect(() => {
        const checkDeviceSize = () => {
            setIsLargeDevice(window.innerWidth >= 640);
            setIsSmallDevice(window.innerWidth < 640);
        };
        
        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, []);

    useEffect(() => {
        const updateDarkMode = () => {
            const storageValue = getDarkModeFromStorage();
            const contextValue = darkModeContext.isDarkMode;
            // Prefer context if it's true, otherwise use storage
            const newValue = contextValue === true ? true : storageValue;
            setIsDarkMode(newValue);
        };

        // Initial update
        updateDarkMode();

        // Listen to storage events (from other tabs)
        window.addEventListener('storage', updateDarkMode);
        
        // Poll localStorage frequently for same-tab changes
        const interval = setInterval(updateDarkMode, 100);
        
        return () => {
            window.removeEventListener('storage', updateDarkMode);
            clearInterval(interval);
        };
    }, [darkModeContext.isDarkMode]);

    function handleFullReport(props: AIResponseDetail) {
        if (isLargeDevice) {
            // Use overlay for large devices
            setFullReportDetails(props);
            setShowFullReport(true);
        } else {
            // Use drawer for small devices
            // Use gradient for dark mode on small devices, solid color for large devices
            const drawerBg = isDarkMode 
                ? (isSmallDevice 
                    ? 'linear-gradient(143.11deg, #22252A 4.37%, #1F2736 78.56%)' 
                    : '#404652')
                : undefined;
            
            const drawerStyle = drawerBg
                ? typeof drawerBg === 'string' && drawerBg.startsWith('linear-gradient')
                    ? { background: drawerBg }
                    : { backgroundColor: drawerBg }
                : {};

            openDrawer({
                closeOnPathnameChange: true,
                containerClassName: 'w-full sm:w-[470px]',
                view: (
                    <div className="h-screen" style={drawerStyle}>
                        <DrawerHeader details={props}/>
                        <div className="h-[calc(100vh-56px)] overflow-y-auto">
                            <FullReport isDrawer details={props}/>
                        </div>
                    </div>
                ),
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-1 pr-2 sm:pr-4 md:pr-6 py-4 sm:py-6">
                {detailsData?.map((item) => (
                    <SingleDetails key={item.id} {...item} onFullReport={handleFullReport} />
                ))}
            </div>
            {/* Only show overlay on large devices */}
            {isLargeDevice && (
                <FullReportOverlay 
                    isOpen={showFullReport} 
                    onClose={() => setShowFullReport(false)} 
                    details={fullReportDetails || undefined}
                />
            )}
        </>
    );
}

function SingleDetails(props: AIResponseDetail & { onFullReport?: (details: AIResponseDetail) => void }) {
    const darkModeContext = useDarkMode();
    
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
        const storageValue = getDarkModeFromStorage();
        const contextValue = darkModeContext.isDarkMode;
        // Use context if it's explicitly true, otherwise trust localStorage
        return contextValue === true ? true : storageValue;
    });

    // Sync dark mode from context and localStorage
    useEffect(() => {
        const updateDarkMode = () => {
            const storageValue = getDarkModeFromStorage();
            const contextValue = darkModeContext.isDarkMode;
            // Prefer context if it's true, otherwise use storage
            const newValue = contextValue === true ? true : storageValue;
            setIsDarkMode(newValue);
        };

        // Initial update
        updateDarkMode();

        // Listen to storage events (from other tabs)
        window.addEventListener('storage', updateDarkMode);
        
        // Poll localStorage frequently for same-tab changes
        const interval = setInterval(updateDarkMode, 100);
        
        return () => {
            window.removeEventListener('storage', updateDarkMode);
            clearInterval(interval);
        };
    }, [darkModeContext.isDarkMode]);

    const calculateAge = (birthdate: string) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };


    function getCitiesAndStates(addresses: string[], limit: number = 3): string[] {
        const cityStateSet = new Set<string>();

        for (const addr of addresses) {
            let cityState: string | null = null;

            // Case 1: format like "New York, NY 10065"
            let match = addr.match(/,\s*([^,]+?),?\s*([A-Z]{2})\b/);
            if (match) {
                cityState = `${match[1].trim()} ${match[2]}`;
            } else {
                // Case 2: format like "Yreka CA 96097" or "City State ZIP"
                match = addr.match(/([A-Za-z\s]+)\s+([A-Z]{2})\b/);
                if (match) {
                    cityState = `${match[1].trim()} ${match[2]}`;
                }
            }

            if (cityState) {
                cityStateSet.add(cityState);
            }

            if (cityStateSet.size >= limit) break; // stop when reaching the limit
        }

        return Array.from(cityStateSet);
    }

    const getLocations = () => {

        if (props.Known_Addresses && props.Known_Addresses.length > 0) {
            return (Array.from(getCitiesAndStates(props.Known_Addresses)).slice(0, 3))
        }


        if (props.criminals && props.criminals.length > 0 && props.criminals[0].Known_Addresses &&
            props.criminals[0].Known_Addresses.length > 0) {
            return (Array.from(getCitiesAndStates(props.criminals[0].Known_Addresses)).slice(0, 3))
        }

        const locations = new Set<string>();
        const records = [
            ...normalizeMergeResponse(props.education),
            ...normalizeMergeResponse(props.rv),
            ...normalizeMergeResponse(props.motorcycles),
            ...normalizeMergeResponse(props.national_drivers_license),
            ...normalizeMergeResponse(props.bankruptcy),
            ...normalizeMergeResponse(props.automobile),
            ...normalizeMergeResponse(props.foreign_movers),
            ...normalizeMergeResponse(props.cell_records),
            ...normalizeMergeResponse(props.drunk_drivings),
            ...normalizeMergeResponse(props.voip),
            ...normalizeMergeResponse(props.vets),
            ...normalizeMergeResponse(props.email_master),
            ...normalizeMergeResponse(props.dob_master),
            ...normalizeMergeResponse(props.devices),
            ...normalizeMergeResponse(props.criminals),
            ...normalizeMergeResponse(props.criminals_small)

        ];

        const address = capitalizeWords(props.ADDRESS || props.ADDRESS1 || props.ADDRESS2 || props.Address1 || props.address
            || props.Address || props.Address2 || "");
        const city = capitalizeWords(props.CITY || props.City || props.N_CITY || "");
        const state = capitalizeState(props.STATE || props.ST || props.State || props.N_STATE || "");
        const zip = props.ZIP || props.ZIP4 || props.ZIP5 || props.Zip || props.zip || props.Zi || props.N_ZIP;


        if (address || city || state) {
            locations.add(`${city || ""} ${state || ""}`);
        }
        records.forEach(record => {

            if (!record) return
            const address = capitalizeWords(record.ADDRESS || record.ADDRESS1 || record.ADDRESS2 || record.Address1
                || record.address
                || record.Address || record.Address2 || "");
            const city = capitalizeWords(record.CITY || record.City || props.N_CITY || "");
            const state = capitalizeState(record.STATE || record.ST || record.State || props.N_STATE || "");
            const zip = record.ZIP || record.ZIP4 || record.ZIP5 || record.Zip || record.zip || record.Zi;


            if (address || city || state) {
                locations.add(`${city || ""} ${state || ""}`);
            }
        });

        return Array.from(locations).slice(0, 3);
    };

    const getEmailCount = () => {
        const uniqueEmails = new Set<string>();

        if (props.Know_Emails && props.Know_Emails.length > 0) {
            return (Array.from((props.Know_Emails))).length
        }


        if (props.criminals && props.criminals.length > 0 && props.criminals[0].Know_Emails &&
            props.criminals[0].Know_Emails.length > 0) {
            return (Array.from((props.criminals[0].Know_Emails))).length
        }

        const records = [
            ...normalizeMergeResponse(props.education),
            ...normalizeMergeResponse(props.rv),
            ...normalizeMergeResponse(props.motorcycles),
            ...normalizeMergeResponse(props.national_drivers_license),
            ...normalizeMergeResponse(props.bankruptcy),
            ...normalizeMergeResponse(props.automobile),
            ...normalizeMergeResponse(props.foreign_movers),
            ...normalizeMergeResponse(props.cell_records),
            ...normalizeMergeResponse(props.drunk_drivings),
            ...normalizeMergeResponse(props.voip),
            ...normalizeMergeResponse(props.vets),
            ...normalizeMergeResponse(props.dob_master),
            ...normalizeMergeResponse(props.email_master),
            ...normalizeMergeResponse(props.criminals),
            ...normalizeMergeResponse(props.devices),
            ...normalizeMergeResponse(props.criminals_small)
        ];

        records.forEach(record => {
            const email = record?.email || record?.Email || record?.EMAIL || "";
            if (email && email.trim()) {
                uniqueEmails.add(email.trim().toLowerCase());
            }
        });

        return uniqueEmails.size;
    };

    const getPhoneCount = () => {
        const uniquePhones = new Set<string>();

        if (props.Known_PHONE && props.Known_PHONE.length > 0) {
            return (((props.Known_PHONE))).length
        }


        if (props.criminals && props.criminals.length > 0 && props.criminals[0].Known_PHONE &&
            props.criminals[0].Known_PHONE.length > 0) {
            return (((props.criminals[0].Known_PHONE))).length
        }

        const records = [
            ...normalizeMergeResponse(props.education),
            ...normalizeMergeResponse(props.rv),
            ...normalizeMergeResponse(props.motorcycles),
            ...normalizeMergeResponse(props.national_drivers_license),
            ...normalizeMergeResponse(props.bankruptcy),
            ...normalizeMergeResponse(props.automobile),
            ...normalizeMergeResponse(props.foreign_movers),
            ...normalizeMergeResponse(props.cell_records),
            ...normalizeMergeResponse(props.drunk_drivings),
            ...normalizeMergeResponse(props.voip),
            ...normalizeMergeResponse(props.vets),
            ...normalizeMergeResponse(props.dob_master),
            ...normalizeMergeResponse(props.email_master),
            ...normalizeMergeResponse(props.criminals),
            ...normalizeMergeResponse(props.devices),
            ...normalizeMergeResponse(props.criminals_small)
        ];

        // Add direct phone properties
        const directPhones = [
            props.PHONE,
            props.CELL_PHONE,
            props.HOME_PHONE,
            props.PHONE1,
            props.PHONE2
        ];

        directPhones.forEach(phone => {
            if (phone && phone.trim()) {
                uniquePhones.add(phone.trim().replace(/[^0-9]/g, ""));
            }
        });

        records.forEach(record => {
            const phone = record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
                || record?.PHONE_1 || record?.PHONE_2 || record?.PHONE_3
                || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE || record?.POE_PHONE || "";
            if (phone && phone.trim()) {
                uniquePhones.add(phone.trim().replace(/[^0-9]/g, ""));
            }
        });

        return uniquePhones.size;
    };

    async function handleFullReportClick() {
        try {
            apiService.postData('/users/reports', {
                message: JSON.stringify(props), title: props.message
            });
        } catch (error) {
            console.error('Error creating report from response-details:', error);
        }
        
        if (props.onFullReport) {
            props.onFullReport(props);
        }
    }

    const isCriminal = props._index === 'criminals_small' || props._index === 'criminals' ||
        (props.criminals && props.criminals.length>0) ||
        (props.criminals_small && props.criminals_small.length>0);

    const cardStyle = isCriminal 
        ? {
            boxShadow: isDarkMode 
                ? '0px -1px 8.1px 0px rgba(255, 99, 99, 0.25) inset' 
                : '0px -1px 8.1px 0px #C6C4E840 inset',
            background: isDarkMode 
                ? 'linear-gradient(302.79deg, #4A1F1F 20.81%, #2A1F1F 91.35%)' 
                : 'linear-gradient(302.79deg, #FFF3F3 20.81%, #FBFBFC 91.35%)'
        }
        : {
            boxShadow: isDarkMode 
                ? '0px -1px 8.1px 0px rgba(255, 255, 255, 0.05) inset' 
                : undefined,
            background: isDarkMode ? '#404652' : undefined
        };

    return (
        <div 
            className={cn(
                "px-2 sm:px-3 py-2 sm:py-3 border rounded-[8px] relative",
                isCriminal 
                    ? (isDarkMode ? 'border-red-500/30' : 'border-gray-200')
                    : (isDarkMode ? 'border-white/10' : 'border-gray-100')
            )}
            style={cardStyle}
        >
            {isCriminal && (
                <div 
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[8px]"
                    style={{ background: 'linear-gradient(180deg, #FF6363 0%, #D50A58 100%)' }}
                />
            )}
            <div className="flex justify-between items-start sm:items-center mb-2 sm:mb-3 gap-2">
                <p className="font-bold text-xs sm:text-sm break-words">{`${toEnhancedTitleCase(props.FIRST)} ${toEnhancedTitleCase(props.MID)} ${toEnhancedTitleCase(props.LAST)}`}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                <span
                        className={cn('text-[#C51FA0] text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-2.5 bg-[#C51FA0]/10 rounded-md', !props.isExactMatch && 'invisible')}>
          Exact Match
        </span>
                    {isCriminal && (
                        <span 
                            className="text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-md"
                            style={{
                                color: isDarkMode ? '#FF6363' : '#DC2626',
                                background: isDarkMode ? 'rgba(255, 99, 99, 0.2)' : '#FEE2E2'
                            }}
                        >
                            Criminal
                        </span>
                    )}
                </div>
            </div>
            <div className="text-[10px] sm:text-xs space-y-2 sm:space-y-2.5" style={isDarkMode ? { color: '#FFFFFF' } : {}}>
                <div className="flex items-end gap-1.5 sm:gap-2">
                    <CalendarIcon
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={isDarkMode ? { color: '#FFFFFF' } : {}}/> <span>Age: {(props.DOB || (props.criminals && props.criminals.length>0)) ?
                    `${calculateAge(props.DOB || props.criminals[0].DOB)} Years Old` : ' N/A'}</span>
                </div>
                <div className="flex items-end gap-1.5 sm:gap-2">
                    <LocationIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={isDarkMode ? { color: '#FFFFFF' } : {}}/>
                    <div className="text-[10px] sm:text-xs break-words">
                        {getLocations().length > 0 ? getLocations().join(' | ') : 'No location data'}
                    </div>
                </div>
                <div className="flex flex-col gap-2 sm:gap-3 text-[10px] sm:text-[11px]" style={isDarkMode ? { color: '#FFFFFF' } : {}}>
                    <div className="flex items-end gap-1.5 sm:gap-2">
                        <CellPhoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={isDarkMode ? { color: '#FFFFFF' } : {}}/> <span>{getPhoneCount()} Mobile Numbers</span>
                    </div>
                    <div className="flex items-end gap-1.5 sm:gap-2">
                        <EnvelopIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={isDarkMode ? { color: '#FFFFFF' } : {}}/> <span>{getEmailCount()} Email Addresses</span>
                    </div>
                </div>
            </div>
            <button onClick={handleFullReportClick}
                    className="inline-flex gap-1 font-normal text-[10px] sm:text-xs cursor-pointer items-center mt-2 sm:mt-3 px-3 py-2.5 rounded-[6px]"
                    style={isDarkMode 
                        ? { backgroundColor: '#C8BAF72B', color: '#C0AEFF' }
                        : { backgroundColor: '#5C39D91A', color: '#5C39D9' }
                    }>
                View Report <PiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={isDarkMode ? { color: '#C0AEFF' } : { color: '#5C39D9' }}/>
            </button>
        </div>
    );
}

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13.777 6.603H1.895a.5.5 0 0 1 0-1h11.882a.5.5 0 0 1 0 1ZM10.8 9.206a.502.502 0 0 1-.502-.5c0-.276.22-.5.496-.5h.006a.5.5 0 0 1 0 1Zm-2.958 0a.502.502 0 0 1-.503-.5c0-.276.221-.5.497-.5h.006a.5.5 0 0 1 0 1Zm-2.965 0a.503.503 0 0 1-.503-.5c0-.276.221-.5.497-.5h.006a.5.5 0 0 1 0 1Zm5.923 2.591a.502.502 0 0 1-.502-.5c0-.276.22-.5.496-.5h.006a.5.5 0 0 1 0 1Zm-2.958 0a.502.502 0 0 1-.503-.5c0-.276.221-.5.497-.5h.006a.5.5 0 0 1 0 1Zm-2.965 0a.503.503 0 0 1-.503-.5c0-.276.221-.5.497-.5h.006a.5.5 0 0 1 0 1Zm5.651-7.937a.5.5 0 0 1-.5-.5V1.167a.5.5 0 0 1 1 0V3.36a.5.5 0 0 1-.5.5Zm-5.385 0a.5.5 0 0 1-.5-.5V1.167a.5.5 0 0 1 1 0V3.36a.5.5 0 0 1-.5.5Z"
            clipRule="evenodd"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.1 2.7H4.7A2.3 2.3 0 0 0 2.4 5v6.8a2.3 2.3 0 0 0 2.3 2.3h6.4a2.3 2.3 0 0 0 2.3-2.3V5a2.3 2.3 0 0 0-2.3-2.3Zm-6.4-1A3.3 3.3 0 0 0 1.4 5v6.8a3.3 3.3 0 0 0 3.3 3.3h6.4a3.3 3.3 0 0 0 3.3-3.3V5a3.3 3.3 0 0 0-3.3-3.3H4.7Z"
            clipRule="evenodd"
        />
    </svg>
);

const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.167 5.666a1.167 1.167 0 1 0 .001 2.332 1.167 1.167 0 0 0-.001-2.332Zm0 3.334A2.169 2.169 0 0 1 6 6.834a2.17 2.17 0 0 1 2.167-2.168 2.17 2.17 0 0 1 2.167 2.168A2.169 2.169 0 0 1 8.167 9Z"
            clipRule="evenodd"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8.167 2.333c-2.481 0-4.5 2.038-4.5 4.542 0 3.186 3.75 6.29 4.5 6.455.75-.166 4.5-3.27 4.5-6.455 0-2.504-2.019-4.542-4.5-4.542Zm0 12c-1.196 0-5.5-3.701-5.5-7.458 0-3.056 2.467-5.542 5.5-5.542s5.5 2.486 5.5 5.542c0 3.757-4.304 7.458-5.5 7.458Z"
            clipRule="evenodd"
        />
    </svg>
);

const CellPhoneIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="m2.192 2.725.049-.05C3.525 1.39 4.362 1.049 5.255 1.563c.257.147.498.354.825.686l1.004 1.042c.555.605.681 1.186.5 1.866l-.024.09-.028.09-.134.393c-.288.883-.168 1.382.855 2.404 1.063 1.063 1.559 1.15 2.51.817l.17-.059.205-.066.09-.025c.723-.193 1.333-.04 1.98.608l.81.781.238.235c.264.269.438.482.567.708.51.892.17 1.729-1.152 3.046l-.126.127c-.198.19-.382.327-.653.455-.455.216-.992.298-1.616.21-1.538-.213-3.49-1.427-5.962-3.899a34.407 34.407 0 0 1-.578-.591l-.358-.382C1.025 6.455.728 4.217 2.103 2.814l.09-.089Zm3.079.13c-.218-.215-.375-.346-.514-.426-.308-.176-.64-.102-1.255.427l-.193.173a9.97 9.97 0 0 0-.104.097l-.221.216-.02.025-.15.15c-.363.371-.535.824-.387 1.602.243 1.276 1.356 3.008 3.594 5.246 2.333 2.332 4.11 3.438 5.393 3.616.747.104 1.129-.077 1.517-.475l.297-.3a7.96 7.96 0 0 0 .358-.397l.137-.173c.35-.466.382-.745.232-1.007-.057-.1-.14-.209-.26-.342l-.164-.173-.096-.097-1.021-.985c-.341-.315-.574-.36-.928-.265l-.103.03-.422.143c-1.227.396-2.112.204-3.415-1.099-1.35-1.35-1.508-2.25-1.056-3.548l.029-.083.08-.242.04-.154c.07-.336-.01-.57-.37-.93l-.05-.05-.948-.98Z"
            clipRule="evenodd"
        />
    </svg>
);

const EnvelopIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.851 8.976c-.446 0-.89-.147-1.263-.442l-2.99-2.41a.5.5 0 0 1 .628-.779l2.987 2.408a1.03 1.03 0 0 0 1.282-.003l2.958-2.404a.5.5 0 1 1 .63.776L9.122 8.531a2.04 2.04 0 0 1-1.27.445"
            clipRule="evenodd"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.5 2h-7A2.5 2.5 0 0 0 2 4.5v6A2.5 2.5 0 0 0 4.5 13h7a2.5 2.5 0 0 0 2.5-2.5v-6A2.5 2.5 0 0 0 11.5 2Zm-7-1A3.5 3.5 0 0 0 1 4.5v6A3.5 3.5 0 0 0 4.5 14h7a3.5 3.5 0 0 0 3.5-3.5v-6A3.5 3.5 0 0 0 11.5 1h-7Z"
            clipRule="evenodd"
        />
    </svg>
);
