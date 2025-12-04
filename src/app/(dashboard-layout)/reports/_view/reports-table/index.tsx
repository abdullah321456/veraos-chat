'use client';

import { Table } from '@/components/atom/table';
import { createColumns } from './columns';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atom/button';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/apiService';
import { LoadingSpinner } from '@/components/atom/loading-spinner';
import { ReportDetailsModal } from './report-details-modal';
import { useModal } from '@/components/modal-views/use-modal';
import { ConfirmModal } from '@/components/atom/confirm-modal';
import { PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { useDarkMode } from '@/lib/contexts/dark-mode-context';

export type Report = {
  _id: string;
  user: {
    _id: string;
    full_name: string;
    email: string;
  };
  message: string; // Stringified AI response details
  title: string; // The title/message from the AI response
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};




export const ReportsTable = React.memo(function ReportsTable() {
  const { isDarkMode } = useDarkMode();
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [renderReports, setRenderReports] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening modal with report details
  const handleOpenModal = (report: Report) => {
    console.log('Opening modal with report:', report);
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // Handle clear all reports
  const handleClearAll = () => {
    openModal({
      view: (
        <ConfirmModal
          icon={<PiTrash className="w-8 h-8" />}
          title="Clear All Reports"
          description="Are you sure you want to delete all reports? This action cannot be undone."
          onConfirm={async () => {
            try {
              await apiService.deleteData('/users/reports/user');
              toast.success('All reports deleted successfully');
              setReports([]);
              setRenderReports(!renderReports);
              closeModal();
            } catch (error) {
              console.error('Error deleting all reports:', error);
              toast.error('Failed to delete all reports');
              closeModal();
            }
          }}
          cancelButtonText="Cancel"
        />
      ),
      containerClassName: ConfirmModal.containerClassName,
    });
  };

  // Fetch reports data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getData('/users/reports/user');
        if (response.success && response.data) {
          setReports(response.data);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="sm:pr-6 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <LoadingSpinner size="lg" className="h-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="sm:pr-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const headingStyle = isDarkMode
    ? { backgroundColor: '#404652', color: '#FFFFFF' }
    : { backgroundColor: 'white', color: '#111827' };

  const containerStyle = isDarkMode
    ? { backgroundColor: '#404652' }
    : { backgroundColor: 'white' };

  const tableClassName = isDarkMode
    ? 'border-0 bg-[#404652] p-0 border-gray-50 h-full flex flex-col'
    : 'border-0 bg-white p-0 border-gray-50 h-full flex flex-col';

  const rowClassName = isDarkMode
    ? 'py-1 cursor-pointer hover:bg-[#505662]'
    : 'py-1 cursor-pointer hover:bg-gray-50';

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-2 flex-shrink-0 w-full">
          <h2 
            className="text-lg font-bold -mb-1 px-2 py-0 sm:p-4 bg-transparent sm:rounded-tl-lg sm:rounded-tr-lg w-full"
            style={headingStyle}
          >
            Reports
          </h2>
          {/*{reports.length > 0 && (*/}
          {/*  <Button */}
          {/*    onClick={handleClearAll} */}
          {/*    size="sm" */}
          {/*    variant="outline" */}
          {/*    color="danger" */}
          {/*    className="rounded-md"*/}
          {/*  >*/}
          {/*    <PiTrash className="w-4 h-4 me-1" />*/}
          {/*    Clear All*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>
        <div 
          className="flex-1 min-h-[calc(100vh-155px)] max-h-[calc(100vh-130px)]
          sm:max-h-[calc(100vh-160px)] flex flex-col rounded-b-[20px] overflow-hidden"
          style={containerStyle}
        >
          <div className="flex-1 overflow-y-auto pb-6" style={{paddingRight: '0px'}}>
            <Table<Report>
              key={String(renderReports)}
              columns={createColumns(handleOpenModal, isDarkMode)}
              data={reports || []}
              size={10}
              rowClassName={rowClassName}
              className={tableClassName}
              onRowClick={handleOpenModal}
            />
          </div>
        </div>
      </div>
      
      {/* Report Details Modal */}
      <ReportDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
      />
    </>
  );
});

