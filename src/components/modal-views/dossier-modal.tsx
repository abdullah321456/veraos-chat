'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atom/button';
import { Modal } from '@/components/atom/modal';
import { PiX, PiEye, PiDownload, PiShare } from 'react-icons/pi';
import { Report } from '@/app/(dashboard-layout)/reports/_view/reports-table';

type DossierModalProps = {
  isOpen: boolean;
  onClose: () => void;
  report?: Report | null;
};

export function DossierModal({ isOpen, onClose, report }: DossierModalProps) {
  const [parsedResponseDetails, setParsedResponseDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (report?.message?.responseDetails) {
      try {
        const parsed = JSON.parse(report.message.responseDetails);
        setParsedResponseDetails(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (error) {
        console.error('Error parsing response details:', error);
        setParsedResponseDetails([]);
      }
    }
  }, [report]);

  const handleDownload = () => {
    if (!report) return;
    
    const data = {
      reportId: report._id,
      message: report.message.message,
      responseDetails: parsedResponseDetails,
      user: report.user,
      createdAt: report.createdAt,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dossier-${report._id}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share && report) {
      navigator.share({
        title: 'Dossier Report',
        text: report.message.message,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(report?.message.message || '');
    }
  };

  if (!report) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="max-w-6xl w-full max-h-[90vh] overflow-hidden"
      className="z-[9999]"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dossier Report</h2>
            <p className="text-sm text-gray-600">
              Generated on {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleDownload}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <PiDownload className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={handleShare}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <PiShare className="w-4 h-4" />
              Share
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <PiX className="w-4 h-4" />
              Close
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Report Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Report Summary</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-gray-800">{report.message.message}</p>
            </div>
          </div>

          {/* User Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">User Information</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{report.user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{report.user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Details */}
          {parsedResponseDetails.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Detailed Records ({parsedResponseDetails.length} found)
              </h3>
              <div className="space-y-4">
                {parsedResponseDetails.map((record, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
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

          {/* Raw Data (Collapsible) */}
          <div className="mb-6">
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-900 mb-3 list-none">
                <span className="group-open:hidden">Show Raw Data</span>
                <span className="hidden group-open:inline">Hide Raw Data</span>
              </summary>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(parsedResponseDetails, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Report ID: {report._id}
            </p>
            <div className="flex gap-2">
              <Button onClick={onClose} variant="outline" size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
