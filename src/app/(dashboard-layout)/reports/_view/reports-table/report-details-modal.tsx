'use client';

import { Button } from '@/components/atom/button';
import { CrossIcon } from '@/components/atom/icons/ai-search/cross';
import { LocationIcon } from '@/components/atom/icons/ai-search/location';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toEnhancedTitleCase } from '@/lib/utils/title-case';
import { Report } from '.';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
};

export function ReportDetailsModal({ isOpen, onClose, report }: Props) {
  const [localDetails, setLocalDetails] = useState<any>(null);
  const [reportMessage, setReportMessage] = useState<string>('');

  console.log('ReportDetailsModal - isOpen:', isOpen, 'report:', report);

  useEffect(() => {
    if (report && isOpen) {
      try {
        // Parse the response details from the report message
        const parsedDetails = JSON.parse(report.message);
        setLocalDetails(parsedDetails);
        setReportMessage(report.title || '');
      } catch (e) {
        console.error('Error parsing report details:', e);
        setLocalDetails(null);
        setReportMessage(report.title || '');
      }
    }
  }, [report, isOpen]);

  if (!isOpen || !report) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
          <CrossIcon onClick={onClose} className="cursor-pointer" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Report Message Section */}
          {reportMessage && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">AI Analysis Summary</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{reportMessage}</p>
            </div>
          )}

          {/* Person Info */}
          <div className="flex gap-6 items-center mb-6">
            <Image src="/men.png" alt="men" width={124} height={124} className="w-[124px] aspect-square h-auto" />
            <div>
              <h1 className="text-black text-lg font-bold leading-6">
                {localDetails ? 
                  `${toEnhancedTitleCase(localDetails?.FIRST || '')} ${toEnhancedTitleCase(localDetails?.MID || '')} ${toEnhancedTitleCase(localDetails?.LAST || '')}`.trim() || 'N/A'
                  : 'N/A'
                }
              </h1>
              <div className="flex items-start gap-2">
                <LocationIcon className="mt-0.5 flex-shrink-0" />
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

          {/* Details */}
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

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <Button onClick={onClose} size="sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
