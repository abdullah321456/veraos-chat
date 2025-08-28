'use client';
import { Button } from '@/components/atom/button';
import { ModalCloseIcon } from '@/components/atom/icons/ai-search/modal-close';
import { useDrawer } from '@/components/drawer-views/use-drawer';
import { ROUTES } from '@/config/routes';
import useQueryParams from '@/lib/hooks/use-query-params';
import { parsePathnameWithQuery } from '@/lib/utils/parse-pathname-with-query';
import { trackDrawerExpand } from '@/lib/gtag';
import Link from 'next/link';
import { SVGProps, useEffect } from 'react';
import { FullReport } from '../../full-report/_view/full-report';

export function ConversationCta() {
  const { openDrawer } = useDrawer();
  const { queryParams } = useQueryParams();

  function handleFullReport() {
    openDrawer({
      closeOnPathnameChange: true,
      containerClassName: 'w-[470px]',
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
    <div className="flex gap-3 px-16 pt-3">
      <Button variant="outline" size="md" disableTitleCase>
        View Matching Records
      </Button>
      <Button onClick={handleFullReport} size="md" disableTitleCase>
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
    <div className="h-14 bg-gray-100 flex items-center justify-between px-4 py-2">
      <span className="font-bold text-lg text-gray-500">Current Record</span>
      <div className="flex items-center gap-5">
        <Link href={parsePathnameWithQuery(ROUTES.AI_SEARCH.FULL_REPORT, queryParams)} onClick={handleExpand}>
          <DrawerHeaderExpandIcon className="w-5 h-5 text-gray-600" />
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
