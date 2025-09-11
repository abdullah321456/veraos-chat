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
      <div className="pr-6 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <LoadingSpinner size="lg" className="h-32" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pr-6 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pr-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold -mb-1 p-4 rounded-t-lg">Reports</h2>
          {reports.length > 0 && (
            <Button 
              onClick={handleClearAll} 
              size="sm" 
              variant="outline" 
              color="danger" 
              className="rounded-md"
            >
              <PiTrash className="w-4 h-4 me-1" />
              Clear All
            </Button>
          )}
        </div>
        <Table<Report>
          key={String(renderReports)}
          columns={createColumns(handleOpenModal)}
          data={reports || []}
          size={10}
          rowClassName="py-1 cursor-pointer hover:bg-gray-50"
          className="border-0 bg-white p-0 min-h-[calc(100vh-100px)] shadow-lg border-gray-50"
          onRowClick={handleOpenModal}
        />
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

