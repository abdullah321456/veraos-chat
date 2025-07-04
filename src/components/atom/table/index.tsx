/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { Fragment, useEffect, useLayoutEffect, useState } from 'react';

import {
  type ColumnDef,
  type Header,
  type HeaderGroup,
  type Row,
  type SortingState,
  type Table,
  flexRender, // eslint-disable-next-line import/named
  getCoreRowModel, // eslint-disable-next-line import/named
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import isFunction from 'lodash/isFunction';

import cn from '@/lib/utils/cn';

export type SortHandlerParams = {
  sorted: boolean; // if sorted or not
  sortBy: string;
  order: 'asc' | 'desc' | '';
};

type TableProps<T> = {
  className?: string;
  data: T[];
  columns: ColumnDef<T>[];
  onSort?: ({ sorted, sortBy, order }: SortHandlerParams) => void;
  size: number;
  loading?: boolean;
  loaderClassName?: string;
  rowClassName?: string | ((data: T) => string);
  getTable?: (table: Row<T>[]) => void;
  onRowClick?: (row: any) => void;
};

export function Table<T>({
  className,
  data,
  columns,
  onSort,
  size,
  loading = false,

  rowClassName,

  getTable,
  onRowClick,
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  useLayoutEffect(() => {
    if (sorting.length) {
      onSort?.({
        sorted: true,
        sortBy: sorting?.[0]?.id,
        order: sorting?.[0]?.desc === true ? 'desc' : 'asc',
      });
    } else {
      onSort?.({ sorted: false, sortBy: '', order: '' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  const table: Table<T> = useReactTable({
    data: data,
    columns,
    manualSorting: true,
    state: { sorting },
    enableSorting: true,
    pageCount: Math.ceil(data.length / size) ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // enableColumnPinning: true,
    // getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  console.log('table', table.getSelectedRowModel().rows);

  useEffect(() => {
    getTable?.(table.getSelectedRowModel().rows);
  }, [table.getSelectedRowModel().rows]);

  // const isFirstRowSelected = table
  //   .getSelectedRowModel()
  //   .rows.some((row) => row.index === 0);

  // accessing meta data
  // console.log(table.getAllLeafColumns().map((col) => col.columnDef));

  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div className={cn('relative rounded-xl border p-5', loading && 'pointer-events-none', className)}>
      <div className={cn('relative overflow-x-auto pb-3 focus-visible:!outline-none')}>
        <div
          className="w-full focus-visible:!outline-none"
          style={{
            minWidth: table.getTotalSize(),
          }}
        >
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<unknown>) => (
            <Fragment key={headerGroup.id}>
              <div className="flex justify-between rounded-lg bg-[#F9F9F9] py-1 text-xs text-slate-800">
                {headerGroup.headers.map((header: Header<unknown, unknown>) => {
                  // @ts-ignore
                  const isSortable = header.column.columnDef.meta?.sortable;
                  return (
                    <Fragment key={header.id}>
                      <td
                        {...{
                          // colSpan: header.colSpan,
                          style: {
                            width: header.getSize() === Number.MAX_SAFE_INTEGER ? 'auto' : header.getSize(),
                          },
                          ...(isSortable && {
                            onClick: header.column.getToggleSortingHandler(),
                          }),
                        }}
                        className={cn(
                          'px-2 py-2 text-left font-medium text-[#7A7575]',
                          // isFirstRowSelected &&
                          //   'first-of-type:rounded-b-none last-of-type:rounded-b-none',
                          // @ts-expect-error
                          header.column.columnDef.meta?.headerClassName
                        )}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex w-full cursor-pointer select-none items-center gap-2">
                            {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                            {isSortable
                              ? {
                                  asc: <SortingIcon state="asc" />,
                                  desc: <SortingIcon state="desc" />,
                                }[header.column.getIsSorted() as string] ??
                                (header.column.columnDef.header !== '' && <SortingIcon />)
                              : null}
                          </div>
                        )}
                      </td>
                    </Fragment>
                  );
                })}
              </div>
            </Fragment>
          ))}

          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {table.getRowModel().rows.map((row: Row<any>) => {
              // get row data
              const rowData = row.original;
              const ROW_CLASS_NAME = isFunction(rowClassName) ? rowClassName(rowData) : rowClassName;
              return (
                <Fragment key={row.id}>
                  <div
                    className={cn(
                      'flex w-full justify-between border-b border-[#ECECEC] last-of-type:border-b-0',
                      ROW_CLASS_NAME
                      // row.getIsSelected() &&
                      //   'border-slate-500/0 [&_.selected-bg]:!bg-gray-50/50'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <div
                          key={cell.id}
                          style={{ width: cell.column.getSize() || 'auto' }}
                          className={cn(
                            'inline-block px-2 py-1',
                            // row.getIsSelected() &&
                            //   'bg-gray-50/50 [&_.selected-bg]:!bg-gray-50/50',
                            // @ts-ignore
                            cell.column.columnDef.meta?.className
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      );
                    })}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div
        title="Loading..."
        className={cn(
          'invisible absolute top-[40px] flex h-[calc(100%_-_52px)] w-full items-center justify-center rounded-b-lg bg-navy/[0.05] opacity-0 backdrop-blur-sm duration-300',
          loaderClassName,
          loading && 'visible opacity-100'
        )}
      >
        <LoadingSpinner className={cn('h-12 w-12 border-navy')} />
      </div> */}
    </div>
  );
}

function Triangle({ ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={5} fill="none" {...props}>
      <path
        fill="currentColor"
        d="M4.273.254a.317.317 0 0 1 .454 0L7.967 3.7c.169.179.03.457-.227.457H1.26c-.257 0-.395-.278-.227-.457L4.273.254Z"
      />
    </svg>
  );
}

function SortingIcon({ state }: { state?: 'asc' | 'desc' }) {
  const isAsc = state === 'asc';
  const isDesc = state === 'desc';
  return (
    <span className="relative z-0 flex flex-col items-center gap-px">
      <Triangle className={isAsc ? 'text-black' : 'text-black/40'} />
      <Triangle className={cn('rotate-180', isDesc ? 'text-black' : 'text-black/40')} />
    </span>
  );
}
