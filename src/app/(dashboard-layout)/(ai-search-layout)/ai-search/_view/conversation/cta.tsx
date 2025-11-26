'use client';
import { Button } from '@/components/atom/button';
import { ModalCloseIcon } from '@/components/atom/icons/ai-search/modal-close';
import { useDrawer } from '@/components/drawer-views/use-drawer';
import { ROUTES } from '@/config/routes';
import useQueryParams from '@/lib/hooks/use-query-params';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { trackDrawerExpand } from '@/lib/gtag';
import Link from 'next/link';
import { SVGProps, useEffect, ReactNode } from 'react';
import { FullReport } from '../../full-report/_view/full-report';

export function ConversationCta({ message }: { message?: string | ReactNode }) {
  const { openDrawer } = useDrawer();
  const { queryParams } = useQueryParams();

  function handleFullReport() {
    // Store the message in localStorage for the full report to access
    if (message) {
      try {
        // Convert message to string if it's not already
        const messageString = typeof message === 'string' ? message : String(message);
        
        const currentData = localStorage.getItem('fullReportDetails');
        let reportData = currentData ? JSON.parse(currentData) : {};
        
        // If it's the new format, update the message
        if (reportData.details) {
          reportData.message = messageString;
          // Also store message in details object
          reportData.details.message = messageString;
        } else {
          // If it's the old format, create new format
          reportData = {
            details: {
              ...reportData,
              message: messageString
            },
            message: messageString
          };
        }
        
        console.log('Storing report data with message:', reportData);
        localStorage.setItem('fullReportDetails', JSON.stringify(reportData));
      } catch (e) {
        console.error('Error storing message:', e);
      }
    }
    
    openDrawer({
      closeOnPathnameChange: true,
      containerClassName: 'w-full sm:w-[470px]',
      view: (
        <div className="h-screen">
          {/* <Link href={parsePathnameWithQuery(ROUTES.AI_SEARCH.FULL_REPORT, queryParams)}>Click here</Link>
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate impedit ab architecto soluta. Natus quod illum assumenda
          consequatur error cum hic, vel dolor nulla a exercitationem modi iste optio facere! */}
          <DrawerHeader />
          <div className="h-[calc(100vh-56px)] overflow-y-auto">
            <FullReport isDrawer />
          </div>
        </div>
      ),
    });
  }

  useEffect(() => {
    if (!queryParams?.open_current_record_drawer) return;
      handleFullReport();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-2 sm:px-4 md:px-8 lg:px-16 pt-3">
      <Button variant="outline" size="md" disableTitleCase className="w-full sm:w-auto">
        View Matching Records
      </Button>
      <Button onClick={handleFullReport} size="md" disableTitleCase className="w-full sm:w-auto">
        Full Report
      </Button>
    </div>
  );
}

export function DrawerHeader({ details }: { details?: any } = {}) {
  const { closeDrawer } = useDrawer();
  const { queryParams, removeQueryParams } = useQueryParams();

  function handleClose() {
    if (queryParams?.open_current_record_drawer) {
      removeQueryParams(['open_current_record_drawer']);
    }
    closeDrawer();
  }

  function handleExpand() {
    if (details) {
      try {
        localStorage.setItem('fullReportDetails', JSON.stringify(details));
        // Track drawer expand event
        trackDrawerExpand('full_report');
      } catch (e) {
        // fallback: ignore
      }
    }
  }

  return (
    <div className="h-14 bg-gray-100 flex items-center justify-between px-3 sm:px-4 py-2">
      <span className="font-bold text-sm sm:text-lg text-gray-500">Current Record</span>
      <div className="flex items-center gap-3 sm:gap-5">
        <Link href={parsePathnameWithQuery(ROUTES.AI_SEARCH.FULL_REPORT, queryParams)} onClick={handleExpand} className="hidden sm:block">
          <DrawerHeaderExpandIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </Link>
        <button onClick={handleClose} className="border-2 border-gray-500 rounded-full">
          <ModalCloseIcon />
        </button>
      </div>
    </div>
  );
}

const DrawerHeaderExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" fill="none" {...props}>
    <g clipPath="url(#a_DrawerHeaderExpandIcon)">
      <path
        fill="currentColor"
        d="M5.25 1.313V0H.656A.656.656 0 0 0 0 .656V5.25h1.313V2.238l6.096 6.096.925-.925-6.096-6.096H5.25ZM20.344 0H15.75v1.313h3.012l-6.096 6.096.925.925 6.097-6.096V5.25H21V.656A.656.656 0 0 0 20.344 0Zm-.657 18.762-6.096-6.096-.925.925 6.096 6.097H15.75V21h4.594a.656.656 0 0 0 .656-.656V15.75h-1.313v3.012ZM7.41 12.66l-6.096 6.103V15.75H0v4.594c0 .362.294.656.656.656H5.25v-1.313H2.238l6.096-6.096-.925-.932Z"
      />
    </g>
    <defs>
      <clipPath id="a_DrawerHeaderExpandIcon">
        <path fill="#fff" d="M0 0h21v21H0z" />
      </clipPath>
    </defs>
  </svg>
);
