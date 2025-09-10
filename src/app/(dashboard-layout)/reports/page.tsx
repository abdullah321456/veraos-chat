import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/atom/loading-spinner';
// import { ReportsTable } from './_view/reports-table';

const ReportsTable = dynamic(() => import('./_view/reports-table').then((mod) => mod.ReportsTable), { 
  ssr: false,
  loading: () => <LoadingSpinner size="lg" className="h-64" />,
});

export default function Reports() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner size="lg" className="h-64" />}>
        <ReportsTable />
      </Suspense>
    </div>
  );
}
