'use client';

import { Button } from '@/components/atom/button';
import { CrossIcon } from '@/components/atom/icons/ai-search/cross';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/atom/confirm-modal';
import { useModal } from '@/components/modal-views/use-modal';
import cn from '@/lib/utils/cn';
import { PiTrash, PiDownload, PiShare } from 'react-icons/pi';
import { toast } from 'sonner';
import { AIResponseDetail } from "../../../ai-search/_view/conversation/type";
import { useState, useEffect } from 'react';
import { toEnhancedTitleCase } from '@/lib/utils/title-case';
import { Report } from '../../_view/reports-table';

type Props = {
  editable?: boolean;
  isDrawer?: boolean;
  details?: AIResponseDetail;
  report?: Report;
};

export function AIResponseFullReport({ editable = false, isDrawer, details, report }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [localDetails, setLocalDetails] = useState<AIResponseDetail | undefined>(details);
  const [reportData, setReportData] = useState<Report | null>(null);
  const [parsedResponseDetails, setParsedResponseDetails] = useState<any[]>([]);

  useEffect(() => {
    if (report) {
      setReportData(report);
      // Parse response details from the report
      if (report.message?.responseDetails) {
        try {
          const parsed = JSON.parse(report.message.responseDetails);
          setParsedResponseDetails(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (error) {
          console.error('Error parsing response details:', error);
          setParsedResponseDetails([]);
        }
      }
    } else if (!details) {
      try {
        const stored = localStorage.getItem('aiResponseReportDetails');
        if (stored) {
          const parsedData = JSON.parse(stored);
          setReportData(parsedData);
          if (parsedData.message?.responseDetails) {
            try {
              const parsed = JSON.parse(parsedData.message.responseDetails);
              setParsedResponseDetails(Array.isArray(parsed) ? parsed : [parsed]);
            } catch (error) {
              console.error('Error parsing stored response details:', error);
              setParsedResponseDetails([]);
            }
          }
        }
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }
  }, [details, report]);

  const handleArchive = () => {
    openModal({
      view: (
        <ConfirmModal
          icon={<PiTrash className="w-8 h-8" />}
          title="Archive AI Response Report"
          description="Are you sure you want to archive this AI response report? This action cannot be undone."
          onConfirm={() => {
            toast.success('AI Response report archived successfully');
            closeModal();
            router.push(ROUTES.REPORTS);
          }}
          cancelButtonText="Cancel"
        />
      ),
      containerClassName: ConfirmModal.containerClassName,
    });
  };

  const handleDownload = () => {
    if (!reportData) return;
    
    const data = {
      reportId: reportData._id,
      message: reportData.message.message,
      responseDetails: parsedResponseDetails,
      user: reportData.user,
      createdAt: reportData.createdAt,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-response-report-${reportData._id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share && reportData) {
      navigator.share({
        title: 'AI Response Report',
        text: reportData.message.message,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(reportData?.message.message || '');
    }
  };

  return (
    <div className={cn('flex flex-col', isDrawer && 'h-full')}>
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Response Full Report</h1>
            {reportData && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">User:</span> {reportData.user.full_name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Generated:</span> {new Date(reportData.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Report ID:</span> {reportData._id}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleDownload}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <PiDownload className="w-3.5 h-3.5 me-1" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <PiShare className="w-3.5 h-3.5 me-1" />
              Share
            </Button>
            {editable && (
              <Button onClick={handleArchive} size="sm" variant="outline" color="danger">
                <PiTrash className="w-3.5 h-3.5 me-1" /> Archive
              </Button>
            )}
            <Button
              onClick={() => router.push(ROUTES.REPORTS)}
              size="sm"
              variant="outline"
            >
              <CrossIcon className="w-3.5 h-3.5 me-1" /> Back to Reports
            </Button>
          </div>
        </div>
      </div>

      {/* AI Analysis Summary Section */}
      {reportData?.message?.message && (
        <div className="bg-blue-50 border-b border-blue-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis Summary</h2>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">{reportData.message.message}</p>
          </div>
        </div>
      )}

      {/* AI Response Details Section */}
      {parsedResponseDetails.length > 0 && (
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            AI Response Details ({parsedResponseDetails.length} records found)
          </h2>
          <div className="space-y-4">
            {parsedResponseDetails.map((record, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Record #{index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(record).map(([key, value]) => (
                    <div key={key} className="min-w-0">
                      <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-gray-900 truncate" title={String(value)}>
                        {String(value) || 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - AI Response Details */}
      <div className={cn('pt-4 space-y-4', isDrawer && 'block')}>
        {parsedResponseDetails.length > 0 && (
          <>
            {/* Personal Information from AI Response */}
            <PersonalInfoFromAI details={parsedResponseDetails[0]} />
            
            {/* Criminal/Legal Information */}
            <CriminalLegalInfo details={parsedResponseDetails[0]} />
            
            {/* Location Information */}
            <LocationInfo details={parsedResponseDetails[0]} />
            
            {/* Additional Records */}
            {parsedResponseDetails.length > 1 && (
              <AdditionalRecords records={parsedResponseDetails.slice(1)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Component for displaying personal information from AI response
function PersonalInfoFromAI({ details }: { details: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <p className="text-gray-900">{details.FULL_NAME || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Date of Birth</label>
          <p className="text-gray-900">{details.DOB || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Gender</label>
          <p className="text-gray-900">{details.GENDER || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Race</label>
          <p className="text-gray-900">{details.RACE || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Height</label>
          <p className="text-gray-900">{details.HEIGHT || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Weight</label>
          <p className="text-gray-900">{details.WEIGHT || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Hair Color</label>
          <p className="text-gray-900">{details.HAIRCOLOR || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Eye Color</label>
          <p className="text-gray-900">{details.EYECOLOR || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

// Component for displaying criminal/legal information
function CriminalLegalInfo({ details }: { details: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Criminal & Legal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Offense Date</label>
          <p className="text-gray-900">{details.OFFENSEDAT || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Offense Code</label>
          <p className="text-gray-900">{details.OFFENSECOD || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Offense Description</label>
          <p className="text-gray-900">{details.OFFENSEDES || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Conviction</label>
          <p className="text-gray-900">{details.CONVICTION || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Conviction Place</label>
          <p className="text-gray-900">{details.CONV_PLACE || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Victim Age</label>
          <p className="text-gray-900">{details.VICTIMSAGE || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

// Component for displaying location information
function LocationInfo({ details }: { details: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Address</label>
          <p className="text-gray-900">{details.ADDRESS || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">City</label>
          <p className="text-gray-900">{details.CITY || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">State</label>
          <p className="text-gray-900">{details.STATE || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">County</label>
          <p className="text-gray-900">{details.COUNTY || 'N/A'}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Source</label>
          <p className="text-gray-900">{details.SOURCE || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

// Component for displaying additional records
function AdditionalRecords({ records }: { records: any[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Records ({records.length})</h2>
      <div className="space-y-4">
        {records.map((record, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-3">Additional Record #{index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(record).map(([key, value]) => (
                <div key={key} className="min-w-0">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-gray-900 truncate" title={String(value)}>
                    {String(value) || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
