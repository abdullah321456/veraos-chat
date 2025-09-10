'use client';

import {Button} from '@/components/atom/button';
import {CrossIcon} from '@/components/atom/icons/ai-search/cross';
import {ExclamationIcon} from '@/components/atom/icons/ai-search/exclamation';
import {LocationIcon} from '@/components/atom/icons/ai-search/location';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/config/routes';
import {ConfirmModal} from '@/components/atom/confirm-modal';
import {useModal} from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import {PiTrash} from 'react-icons/pi';
import {toast} from 'sonner';
import {AIResponseDetail} from "../../../../../ai-search/_view/conversation/type";
import { useState, useEffect } from 'react';
import { toEnhancedTitleCase } from '@/lib/utils/title-case';

type Props = {
    editable?: boolean;
    isDrawer?: boolean;
    details?: AIResponseDetail
};

export function ReportsFullReport({editable = false, isDrawer, details, message}: Props) {
    const router = useRouter();
    const {openModal, closeModal} = useModal();
    const [showTooltip, setShowTooltip] = useState(false);
    const [localDetails, setLocalDetails] = useState<AIResponseDetail | undefined>(details);
    const [reportMessage, setReportMessage] = useState<string>('');
    const [reportId, setReportId] = useState<string>('');
    const [reportUser, setReportUser] = useState<any>(null);
    const [reportCreatedAt, setReportCreatedAt] = useState<string>('');

    useEffect(() => {
        if (!details) {
            try {
                const stored = localStorage.getItem('fullReportDetails');
                if (stored) {
                    const parsedData = JSON.parse(stored);
                    // Check if it's the new format with report data
                    if (parsedData.details) {
                        console.log('Reports full report - loading new format data:', parsedData);
                        setLocalDetails(parsedData.details);
                        // Get message from reportData.message or from details.message as fallback
                        setReportMessage(parsedData.message || parsedData.details.message || '');
                        setReportId(parsedData.reportId || '');
                        setReportUser(parsedData.user || null);
                        setReportCreatedAt(parsedData.createdAt || '');
                    } else {
                        console.log('Reports full report - loading old format data:', parsedData);
                        // Old format - just details, check if it has message
                        setLocalDetails(parsedData);
                        setReportMessage(parsedData.message || '');
                    }
                }
            } catch (e) {
                // ignore
            }
        }
    }, [details]);

    const getLocations = () => {
        if (!localDetails) return [];

        const locations = new Set<string>();
        const records = [
            localDetails?.education,
            localDetails?.rv,
            localDetails?.motorcycles,
            localDetails?.national_drivers_license,
            localDetails?.bankruptcy,
            localDetails?.automobile,
            localDetails?.foreign_movers,
            localDetails?.cell_records,
            localDetails?.drunk_drivings,
            localDetails?.voip,
            localDetails?.vets
        ];

        if (localDetails?.STATE && (localDetails?.CITY || localDetails?.City)) {
            locations.add(`${localDetails.CITY || localDetails.City}, ${localDetails.ST || localDetails.STATE}`);
        }
        records.forEach(record => {
            if (record && (record?.STATE || record?.ST || record?.State) && (record?.CITY || record?.City)) {
                locations.add(`${record.CITY || record.City}, ${record.ST || record.STATE || record.State}`);
            }
        });

        return Array.from(locations).slice(0, 3);
    };

    function handleCloseFullReport() {
        // Navigate back to reports page
        router.push(ROUTES.REPORTS);
    }

    function handleInfoClick() {
        openModal({
            view: (
                <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">Report Information</h3>
                    <p className="text-sm text-gray-600">
                        This report is generated using data from our comprehensive criminals database, providing detailed and accurate information for investigative purposes.
                    </p>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => closeModal()} size="sm">
                            Close
                        </Button>
                    </div>
                </div>
            ),
            containerClassName: 'w-[400px]',
        });
    }

    function handleArchive() {
        openModal({
            view: (
                <ConfirmModal
                    icon={<PiTrash className="w-8 h-8"/>}
                    title="Archive Report"
                    description="Are you sure you want to archive this report?"
                    onConfirm={() => {
                        toast.success('Report Successfully Archived');
                        closeModal();
                    }}
                    cancelButtonText="Cancel"
                />
            ),
            containerClassName: ConfirmModal.containerClassName,
        });
    }

    // Function to render a simple key-value display
    const renderKeyValue = (key: string, value: any, label?: string) => {
        if (!value || value === '' || value === 'N/A') return null;
        
        return (
            <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100">
                <div className="font-medium text-gray-700 text-sm sm:w-1/3 mb-1 sm:mb-0">
                    {label || key}:
                </div>
                <div className="text-gray-900 text-sm sm:w-2/3">
                    {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </div>
            </div>
        );
    };

    // Function to render array data
    const renderArrayData = (key: string, data: any[], label?: string) => {
        if (!Array.isArray(data) || data.length === 0) return null;
        
        return (
            <div className="py-4 border-b border-gray-100">
                <h4 className="font-semibold text-gray-800 mb-3">{label || key}</h4>
                <div className="space-y-3">
                    {data.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            {typeof item === 'object' ? (
                                <div className="space-y-2">
                                    {Object.entries(item).map(([itemKey, itemValue]) => 
                                        renderKeyValue(itemKey, itemValue)
                                    )}
                                </div>
                            ) : (
                                <div className="text-sm">{String(item)}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    console.log("reports full report - details:", localDetails);

    return (
        <div className={cn('p-6 border border-gray-50 rounded-[10px] w-full mx-auto mr-3', isDrawer && 'p-4 mr-0')}>
            {!isDrawer && (
                <div className="flex items-center justify-between border-b border-b-gray-300 -mx-6 px-6 pb-6">
                    <h4 className="text-black text-[22px] font-bold">Full Report</h4>
                    <CrossIcon onClick={handleCloseFullReport} className="cursor-pointer"/>
                </div>
            )}

            <div className={cn('flex justify-between mt-4', isDrawer && 'mt-0')}>
                <div className="flex gap-6 items-center">
                    <Image src="/men.png" alt="men" width={124} height={124}
                           className={cn('w-[124px] aspect-square h-auto', isDrawer && 'w-24')}/>
                    <div>
                        <h1 className="text-black text-lg font-bold leading-6">
                            {`${toEnhancedTitleCase(localDetails?.FIRST || '')} ${toEnhancedTitleCase(localDetails?.MID || '')} ${toEnhancedTitleCase(localDetails?.LAST || '')}`.trim() || 'N/A'}
                        </h1>
                        <div className="flex items-start gap-2">
                            <LocationIcon className="mt-0.5 flex-shrink-0"/>
                            <p className="text-[#616166] text-xs font-normal leading-relaxed" style={{marginLeft:"-6px"}}>
                                {getLocations().length > 0 ? (
                                    <span className="flex flex-wrap gap-0.5">
                                        {getLocations().map((location, index) => (
                                            <span key={index} className="inline-block">
                                                {location}
                                                {index < getLocations().length - 1 && (
                                                    <span className="mx-1 text-gray-400">|</span>
                                                )}
                                            </span>
                                        ))}
                                    </span>
                                ) : (
                                    'N/A'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <ExclamationIcon
                        className="mt-2 hover:cursor-pointer"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    />
                </div>
            </div>
            
            {/* Report Message Section */}
            {reportMessage && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">AI Analysis Summary</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">{reportMessage}</p>
                    {reportUser && (
                        <div className="mt-3 pt-3 border-t border-blue-200">
                            <p className="text-xs text-blue-700">
                                <span className="font-medium">Generated by:</span> {reportUser.full_name} ({reportUser.email})
                            </p>
                            {reportCreatedAt && (
                                <p className="text-xs text-blue-700">
                                    <span className="font-medium">Created:</span> {new Date(reportCreatedAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            {/* Simple Details Display */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Details</h3>
                
                {localDetails && (
                    <div className="space-y-4">
                        {/* Basic Information */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Basic Information</h4>
                            <div className="space-y-2">
                                {renderKeyValue('FULL_NAME', localDetails.FULL_NAME, 'Full Name')}
                                {renderKeyValue('FIRST', localDetails.FIRST, 'First Name')}
                                {renderKeyValue('MID', localDetails.MID, 'Middle Name')}
                                {renderKeyValue('LAST', localDetails.LAST, 'Last Name')}
                                {renderKeyValue('DOB', localDetails.DOB, 'Date of Birth')}
                                {renderKeyValue('GENDER', localDetails.GENDER, 'Gender')}
                                {renderKeyValue('RACE', localDetails.RACE, 'Race')}
                                {renderKeyValue('HEIGHT', localDetails.HEIGHT, 'Height')}
                                {renderKeyValue('WEIGHT', localDetails.WEIGHT, 'Weight')}
                                {renderKeyValue('HAIRCOLOR', localDetails.HAIRCOLOR, 'Hair Color')}
                                {renderKeyValue('EYECOLOR', localDetails.EYECOLOR, 'Eye Color')}
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Address Information</h4>
                            <div className="space-y-2">
                                {renderKeyValue('ADDRESS', localDetails.ADDRESS, 'Address')}
                                {renderKeyValue('CITY', localDetails.CITY || localDetails.City, 'City')}
                                {renderKeyValue('STATE', localDetails.STATE || localDetails.ST, 'State')}
                                {renderKeyValue('COUNTY', localDetails.COUNTY, 'County')}
                            </div>
                        </div>

                        {/* Criminal Information */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Criminal Information</h4>
                            <div className="space-y-2">
                                {renderKeyValue('OFFENDERST', localDetails.OFFENDERST, 'Offender Status')}
                                {renderKeyValue('OFFENDERCA', localDetails.OFFENDERCA, 'Offender Category')}
                                {renderKeyValue('RISKLEVEL', localDetails.RISKLEVEL, 'Risk Level')}
                                {renderKeyValue('OFFENSEDAT', localDetails.OFFENSEDAT, 'Offense Date')}
                                {renderKeyValue('OFFENSECOD', localDetails.OFFENSECOD, 'Offense Code')}
                                {renderKeyValue('OFFENSEDES', localDetails.OFFENSEDES, 'Offense Description')}
                                {renderKeyValue('CONVICTION', localDetails.CONVICTION, 'Conviction')}
                                {renderKeyValue('CONV_PLACE', localDetails.CONV_PLACE, 'Conviction Place')}
                                {renderKeyValue('VICTIMSAGE', localDetails.VICTIMSAGE, 'Victim Age')}
                                {renderKeyValue('SOURCE', localDetails.SOURCE, 'Source')}
                            </div>
                        </div>

                        {/* Additional Records */}
                        {localDetails.education && renderArrayData('education', localDetails.education, 'Education Records')}
                        {localDetails.automobile && renderArrayData('automobile', localDetails.automobile, 'Automobile Records')}
                        {localDetails.motorcycles && renderArrayData('motorcycles', localDetails.motorcycles, 'Motorcycle Records')}
                        {localDetails.rv && renderArrayData('rv', localDetails.rv, 'RV Records')}
                        {localDetails.national_drivers_license && renderArrayData('national_drivers_license', localDetails.national_drivers_license, 'Driver License Records')}
                        {localDetails.bankruptcy && renderArrayData('bankruptcy', localDetails.bankruptcy, 'Bankruptcy Records')}
                        {localDetails.foreign_movers && renderArrayData('foreign_movers', localDetails.foreign_movers, 'Foreign Movers Records')}
                        {localDetails.cell_records && renderArrayData('cell_records', localDetails.cell_records, 'Cell Records')}
                        {localDetails.drunk_drivings && renderArrayData('drunk_drivings', localDetails.drunk_drivings, 'Drunk Driving Records')}
                        {localDetails.voip && renderArrayData('voip', localDetails.voip, 'VOIP Records')}
                        {localDetails.vets && renderArrayData('vets', localDetails.vets, 'Veteran Records')}

                        {/* Raw Data Section */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">Raw Data</h4>
                            <pre className="text-xs text-gray-600 overflow-auto max-h-96 bg-white p-3 rounded border">
                                {JSON.stringify(localDetails, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {editable && (
                    <div className="flex justify-start mt-6">
                        <Button onClick={handleArchive} size="sm" variant="outline" color="danger">
                            <PiTrash className="w-3.5 h-3.5 me-1"/> Archive
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}