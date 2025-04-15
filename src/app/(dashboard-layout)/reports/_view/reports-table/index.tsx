'use client';

import { Table } from '@/components/atom/table';
import { columns, dossierColumns } from './columns';
import { useState } from 'react';
import { Button } from '@/components/atom/button';
import { FadeAnimation } from '@/components/atom/fade-animatation';
import { PiArrowsClockwise, PiTrash } from 'react-icons/pi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/modal-views/use-modal';
import { ConfirmModal } from '@/components/atom/confirm-modal';

export type Report = {
  title: string;
  summary: string;
  archiveDate: string;
};

export type Dossier = {
  name: string;
  caseFileNumber: string;
  summary: string;
  archiveDate: string;
};

const data: Report[] = [
  {
    title: 'Financial Crimes Investigation',
    summary: 'Uncovered fraudulent tax filings and offshore accounts linked to Smith Enterprises.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Surveillance Report',
    summary: 'Evidence of illegal arms distribution and suspicious vehicle activities.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Internal Audit Report',
    summary: 'Discovered non-compliance in hiring and financial reporting processes.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Financial Crimes Investigation',
    summary: 'Uncovered fraudulent tax filings and offshore accounts linked to Smith Enterprises.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Surveillance Report',
    summary: 'Evidence of illegal arms distribution and suspicious vehicle activities.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Internal Audit Report',
    summary: 'Discovered non-compliance in hiring and financial reporting processes.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Financial Crimes Investigation',
    summary: 'Uncovered fraudulent tax filings and offshore accounts linked to Smith Enterprises.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    title: 'Surveillance Report',
    summary: 'Evidence of illegal arms distribution and suspicious vehicle activities.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
];

const data2: Dossier[] = [
  {
    name: 'John Doe',
    caseFileNumber: '#DSR20231105',
    summary: 'Multiple fraud cases linked to international wire transfers.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    name: 'Jane Smith',
    caseFileNumber: '#DSR20231212',
    summary: 'Profile of operations across multiple states with known accomplices.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    name: 'Robert Jackson',
    caseFileNumber: '#DSR20231009',
    summary: 'Evidence linking Jackson to racketeering and money laundering.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    name: 'Emily White',
    caseFileNumber: '#DSR20230618',
    summary: 'Charged with developing ransomware software affecting global institutions.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    name: 'Michael Brown',
    caseFileNumber: '#DSR20230725',
    summary: 'History of theft, fraud, and gang affiliations.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
  {
    name: 'Angela Lee',
    caseFileNumber: '#DSR20230314',
    summary: 'Investigated for leaking classified information to foreign entities.',
    archiveDate: 'Date Archived: January 10, 2025',
  },
];

export function ReportsTable() {
  const router = useRouter();
  const [reportsSelectedRowIds, setReportsSelectedRowIds] = useState<string[]>([]);
  const [dossiersSelectedRowIds, setDossiersSelectedRowIds] = useState<string[]>([]);
  const [renderReports, setRenderReports] = useState(true);
  const [renderDossiers, setRenderDossiers] = useState(true);

  return (
    <div className="pr-6 ">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold -mb-1 p-4 rounded-t-lg">Reports</h2>
            {reportsSelectedRowIds.length > 0 && (
              <TableToolbar
                onDelete={() => {
                  setReportsSelectedRowIds([]);
                  setRenderReports(!renderReports);
                  router.refresh();
                }}
                onRestore={() => {
                  setReportsSelectedRowIds([]);
                  setRenderReports(!renderReports);
                }}
              />
            )}
          </div>
          <Table<Report>
            key={String(renderReports)}
            columns={columns}
            data={data || []}
            size={10}
            rowClassName="py-1"
            className="border-0 bg-white p-0 min-h-[calc(100vh-100px)] shadow-lg border-gray-50"
            getTable={(rows) => {
              const ids = rows.map((row) => row.original.title);
              setReportsSelectedRowIds(ids);
            }}
          />
        </div>
        <div key={String(renderDossiers)}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold -mb-1 p-4 rounded-t-lg">Dossiers</h2>
            {dossiersSelectedRowIds.length > 0 && (
              <TableToolbar
                onDelete={() => {
                  setDossiersSelectedRowIds([]);
                  setRenderDossiers(!renderDossiers);
                }}
                onRestore={() => {
                  setDossiersSelectedRowIds([]);
                  setRenderDossiers(!renderDossiers);
                }}
              />
            )}
          </div>
          <Table<Dossier>
            key={String(renderDossiers)}
            columns={dossierColumns}
            data={data2 || []}
            size={10}
            rowClassName="py-1"
            className="border-0 bg-white p-0 min-h-[calc(100vh-100px)] shadow-lg border-gray-50"
            getTable={(rows) => {
              const ids = rows.map((row) => row.original.name);
              setDossiersSelectedRowIds(ids);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function TableToolbar({ onRestore, onDelete }: { onRestore: () => void; onDelete: () => void }) {
  const { openModal, closeModal } = useModal();

  function handleRestore() {
    openModal({
      view: (
        <ConfirmModal
          variant="info"
          icon={<PiTrash className="w-8 h-8" />}
          title="Restore Report"
          description="Are you sure you want to restore this report?"
          onConfirm={() => {
            toast.success('Successfully Restored');
            onRestore();
            closeModal();
          }}
          cancelButtonText="Cancel"
        />
      ),
      containerClassName: ConfirmModal.containerClassName,
    });
  }
  function handleDelete() {
    openModal({
      view: (
        <ConfirmModal
          icon={<PiTrash className="w-8 h-8" />}
          title="Delete Report"
          description="Are you sure you want to delete this report?"
          onConfirm={() => {
            toast.success('Successfully Deleted');
            onDelete();
            closeModal();
          }}
          cancelButtonText="Cancel"
        />
      ),
      containerClassName: ConfirmModal.containerClassName,
    });
  }

  return (
    <FadeAnimation>
      <div className="inline-flex items-center gap-2">
        <Button onClick={handleRestore} size="sm" variant="outline" className="rounded-md">
          <PiArrowsClockwise className="w-4 h-4 me-1" />
          Restore
        </Button>
        <Button onClick={handleDelete} size="sm" variant="outline" color="danger" className="rounded-md">
          <PiTrash className="w-4 h-4 me-1" />
          Delete
        </Button>
      </div>
    </FadeAnimation>
  );
}
