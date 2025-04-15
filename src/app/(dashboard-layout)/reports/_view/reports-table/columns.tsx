'use client';

import { Checkbox } from '@/components/atom/form-elements/checkbox';

import { Dropdown } from '@/components/atom/dropdown/dropdown';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { PiEyeFill } from 'react-icons/pi';
import { Dossier, Report } from '.';

export const columns: ColumnDef<Report>[] = [
  {
    id: 'select',
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(value) => {
          table.toggleAllPageRowsSelected(value.target.checked);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={(value) => row.toggleSelected(value.target.checked)} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    size: 250,
    cell: ({ row }) => (
      <div className="text-xs">
        <p className="font-medium mb-1">{row.getValue('title')}</p>
        <p className="text-xs text-gray-600 text-[10px]">{row.original.archiveDate}</p>
      </div>
    ),
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    size: 300,
    cell: ({ row }) => <p className="text-xs">{row.getValue('summary')}</p>,
  },
  {
    id: 'actions',
    size: 50,
    cell: () => {
      return (
        <Dropdown>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <Dropdown.Trigger className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </Dropdown.Trigger>
          <Dropdown.Menu className="bg-white border shadow-md w-[150px]">
            <Dropdown.Item className="text-xs font-medium hover:bg-primary-dark/10 duration-150">
              <PiEyeFill className="w-4 h-4 text-gray-500 mr-1.5" /> View Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    },
  },
  // ...
];
export const dossierColumns: ColumnDef<Dossier>[] = [
  {
    id: 'select',
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onChange={(value) => table.toggleAllPageRowsSelected(value.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={(value) => row.toggleSelected(value.target.checked)} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 220,
    cell: ({ row }) => (
      <div className="text-xs">
        <p className="font-medium mb-1">{row.getValue('name')}</p>
        <p className="text-xs text-gray-600 text-[10px]">{row.original.archiveDate}</p>
      </div>
    ),
  },
  {
    accessorKey: 'caseFileNumber',
    header: 'CASE FILE NUMBER',
    size: 150,
    cell: ({ row }) => <p className="text-xs">{row.getValue('caseFileNumber')}</p>,
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    size: 280,
    cell: ({ row }) => <p className="text-xs">{row.getValue('summary')}</p>,
  },
  {
    id: 'actions',
    size: 50,
    cell: () => {
      return (
        <Dropdown>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <Dropdown.Trigger className="cursor-pointer">
            <MoreHorizontal className="h-4 w-4" />
          </Dropdown.Trigger>
          <Dropdown.Menu className="bg-white border shadow-md w-[150px]">
            <Dropdown.Item className="text-xs font-medium hover:bg-primary-dark/10 duration-150">
              <PiEyeFill className="w-4 h-4 text-gray-500 mr-1.5" /> View Details
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    },
  },
  // ...
];
