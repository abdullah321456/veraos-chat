import dynamic from 'next/dynamic';
// import { ReportsTable } from './_view/reports-table';

const ReportsTable = dynamic(() => import('./_view/reports-table').then((mod) => mod.ReportsTable), { ssr: false });

export default function Reports() {
  return (
    <div>
      <ReportsTable />
    </div>
  );
}
