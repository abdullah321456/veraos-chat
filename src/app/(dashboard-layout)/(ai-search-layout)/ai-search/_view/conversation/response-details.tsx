'use client';
import cn from '@/lib/utils/cn';
import {SVGProps} from 'react';
import {PiArrowRight} from 'react-icons/pi';
import {AIResponseDetail} from './type';
import {useDrawer} from '@/components/drawer-views/use-drawer';
import {DrawerHeader} from './cta';
import {FullReport} from '../../full-report/_view/full-report';
import {toEnhancedTitleCase} from '@/lib/utils/title-case';
import {normalizeMergeResponse} from "../../../../../../types";
import { apiService } from '@/services/apiService';
// REMOVE: import { useState } from 'react';


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

export function AiResponseDetails({detailsData}: {detailsData: (AIResponseDetail & { _index?: string })[] }) {
    const {openDrawer} = useDrawer();
    // REMOVE: const [showFullReport, setShowFullReport] = useState(false);
    // REMOVE: const [fullReportDetails, setFullReportDetails] = useState<AIResponseDetail | null>(null);

    function handleFullReport(props: AIResponseDetail) {
        openDrawer({
            closeOnPathnameChange: true,
            containerClassName: 'w-[470px]',
            view: (
                <div className="h-screen">
                    <DrawerHeader details={props}/>
                    <div className="h-[calc(100vh-56px)] overflow-y-auto">
                        <FullReport isDrawer details={props}/>
                    </div>
                </div>
            ),
        });
    }

    return (
        <div className="grid grid-cols-3 gap-3 pl-1 pr-6 py-6">
            {detailsData?.map((item) => (
                <SingleDetails key={item.id} {...item} />
            ))}
        </div>
    );
}

function SingleDetails(props: AIResponseDetail) {
    const {openDrawer} = useDrawer();

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

    const getLocations = () => {
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
            ...normalizeMergeResponse(props.criminals),
            ...normalizeMergeResponse(props.criminals_small)


        ];

        return records.filter(record => (record?.email || record?.Email || record?.EMAIL || "").length > 0).length;
    };

    const getPhoneCount = () => {
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
            ...normalizeMergeResponse(props.criminals),
            ...normalizeMergeResponse(props.criminals_small)


        ];

        records.push({PHONE: props.PHONE});
        records.push({PHONE: props.CELL_PHONE})
        records.push({PHONE: props.HOME_PHONE})
        records.push({PHONE: props.PHONE1})
        records.push({PHONE: props.PHONE2})

        return records.filter(record => (record?.phone || record?.Phone || record?.Phone1 || record?.Phone2
            || record?.PHONE_1 || record?.PHONE_2 || record?.PHONE_3
            || record?.HOMEPHONE || record?.WORKPHONE || record?.CELL || record?.PHONE || "").length > 0).length;
    };

    async function handleFullReport(props: AIResponseDetail) {
        try {


            
            apiService.postData('/users/reports', {
                message:JSON.stringify(props),title:props.message
            });
            
        } catch (error) {
            console.error('Error creating report from response-details:', error);
        }
        
        openDrawer({
            closeOnPathnameChange: true,
            containerClassName: 'w-[470px]',
            view: (
                <div className="h-screen">
                    <DrawerHeader details={props}/>
                    <div className="h-[calc(100vh-56px)] overflow-y-auto">
                        <FullReport isDrawer details={props}/>
                    </div>
                </div>
            ),
        });
    }

    return (
        <div className={cn(
            "px-3 py-3 shadow-lg shadow-gray-200/70 border rounded-xl",
            (props._index === 'criminals_small' || props._index === 'criminals') ? 'border-red-500' : 'border-gray-100'
        )}>
            <div className="flex justify-between items-center mb-3">
                <p className="font-bold">{`${toEnhancedTitleCase(props.FIRST)} ${toEnhancedTitleCase(props.MID)} ${toEnhancedTitleCase(props.LAST)}`}</p>
                <span
                    className={cn('text-[#C51FA0] text-xs py-1.5 px-2.5 bg-[#C51FA0]/10 rounded-md', !props.isExactMatch && 'invisible')}>
          Exact Match
        </span>
            </div>
            <div className="text-xs space-y-2.5">
                <div className="flex items-center gap-2">
                    <CalendarIcon
                        className="w-4 h-4"/> Age: {props.DOB ? `${calculateAge(props.DOB)} Years Old` : ' N/A'}
                </div>
                <div className="flex items-center gap-2">
                    <LocationIcon className="w-4 h-4"/>
                    <div className="text-xs">
                        {getLocations().length > 0 ? getLocations().join(' | ') : 'No location data'}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 text-[11px] whitespace-nowrap">
                    <div className="flex items-center gap-2">
                        <CellPhoneIcon className="w-4 h-4"/> {getPhoneCount()} Mobile Numbers
                    </div>
                    <div className="flex items-center gap-2">
                        <EnvelopIcon className="w-4 h-4"/> {getEmailCount()} Email Addresses
                    </div>
                </div>
            </div>
            <button onClick={(e) => handleFullReport(props)}
                    className="inline-flex gap-1 font-bold text-xs text-primary cursor-pointer items-center mt-4">
                View Report <PiArrowRight className="w-4 h-4 text-primary-dark"/>
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
            fill="#000"
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
