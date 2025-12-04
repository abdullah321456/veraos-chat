'use client';


import { Dropdown } from '@/components/atom/dropdown/dropdown';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { PiEyeFill } from 'react-icons/pi';
import { Report } from '.';
import { apiService } from '@/services/apiService';

// Function to handle view details click
const handleViewDetails = async (report: Report, onOpenModal?: (report: Report) => void) => {
  console.log('handleViewDetails called with report:', report, 'onOpenModal:', onOpenModal);
  try {
    // Parse the response details from the report message (which is now stringified AI response details)
    let parsedDetails = null;
    try {
      parsedDetails = JSON.parse(report.message);
    } catch (e) {
      console.error('Error parsing response details:', e);
      parsedDetails = report.message;
    }
    
    // Call POST API to create report
    const reportData = {
      message: parsedDetails,
      title: report.title || ''
    };
    
    await apiService.postData('/users/reports', {
      message: JSON.stringify(reportData)
    });
    
    console.log('Report created successfully:', reportData);
    
    // Store both the parsed details and the message in localStorage for the AI search full report component to access
    const localStorageData = {
      details: {
        ...parsedDetails,
        message: report.title
      },
      message: report.title,
      reportId: report._id,
      user: report.user,
      createdAt: report.createdAt
    };
    
    localStorage.setItem('fullReportDetails', JSON.stringify(localStorageData));
    
    // Open modal with report details
    if (onOpenModal) {
      onOpenModal(report);
    }
  } catch (error) {
    console.error('Error creating report or navigating:', error);
    // Still open modal even if API call fails
    if (onOpenModal) {
      onOpenModal(report);
    }
  }
};

export const createColumns = (onOpenModal?: (report: Report) => void, isDarkMode?: boolean): ColumnDef<Report>[] => [
  {
    accessorKey: 'title',
    header: 'AI Analysis Summary',
    size: 300,
    cell: ({ row }) => (
      <div className="text-xs">
        <p 
          className="font-medium mb-1 line-clamp-2"
          style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}
        >
          {row.original.title}
        </p>
        {/*<p className="text-xs text-gray-600 text-[10px]">*/}
        {/*  Created: {new Date(row.original.createdAt).toLocaleDateString()}*/}
        {/*</p>*/}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 200,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const date = new Date(createdAt);
      
      return (
        <div className="text-xs">
          <p 
            className="font-medium"
            style={{ color: isDarkMode ? '#FFFFFF' : '#111827' }}
          >
            {date.toLocaleDateString()}
          </p>
          <p style={{ color: isDarkMode ? '#A7A7A7' : '#6B7280' }}>
            {date.toLocaleTimeString()}
          </p>
        </div>
      );
    },
  },
  // {
  //   id: 'actions',
  //   size: 50,
  //   cell: ({ row }) => {
  //     return (
  //       <Dropdown>
  //         {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
  //         {/* @ts-expect-error */}
  //         <Dropdown.Trigger
  //           className="cursor-pointer"
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <MoreHorizontal className="h-4 w-4" />
  //         </Dropdown.Trigger>
  //         <Dropdown.Menu className="bg-white border shadow-md w-[150px]">
  //                  <Dropdown.Item
  //                    className="text-xs font-medium hover:bg-primary-dark/10 duration-150 cursor-pointer"
  //                    onClick={(e) => {
  //                      e.stopPropagation();
  //                      handleViewDetails(row.original, onOpenModal);
  //                    }}
  //                  >
  //             <PiEyeFill className="w-4 h-4 text-gray-500 mr-1.5" /> View Details
  //           </Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     );
  //   },
  // },
];
