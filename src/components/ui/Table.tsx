import React, { useState, useMemo } from 'react';
import Pagination from './Pagination';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { DebouncedInput } from './DebouncedInput';

type TableProps = {
  data: any[];
  columns: any[];
  title: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  isLoading?: boolean;
};

const fuzzyFilter = (row: any, columnId: string, value: string, addMeta: Function) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table: React.FC<TableProps> = ({
  data: tableData,
  columns: tableColumns,
  title,
  searchable = true,
  searchPlaceholder = 'Search',
  isLoading = false,
}) => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => tableColumns, [tableColumns]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const rowsPerPage = table.getRowModel().rows.length;

  // Calculate the current range of records being displayed
  const startIndex = useMemo(() => pageIndex * pageSize, [pageIndex, pageSize]);
  const endIndex = useMemo(() => startIndex + (rowsPerPage || 1 - 1), [startIndex, rowsPerPage]);

  return (
    <div className="flex flex-col">
      <div className={`align-middle inline-block w-full overflow-hidden ${!searchable && 'mt-6'}`}>
        <div className="sm:px-6 px-3 bg-white rounded-lg shadow-lg">
          {searchable && (
            <div className="py-5">
              {isLoading && (
                <div className="w-full py-3">
                  <div className="relative animate-pulse flex items-center justify-between">
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              )}
              {!isLoading && (
                <div className="w-full">
                  <div className="relative rounded-md">
                    <DebouncedInput
                      value={globalFilter ?? ''}
                      onChange={(value: string) => setGlobalFilter(String(value))}
                      placeholder={searchPlaceholder}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="overflow-x-auto w-full ">
            <table className="w-full">
              <thead className="text-left border-b rounded-t-lg bg-gray-50">
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <tr key={`${headerGroup.id}-tr-${index}`}>
                    {headerGroup.headers.map((header, i) => {
                      return (
                        <th
                          key={`${header.id}-th-${i}`}
                          colSpan={header.colSpan}
                          scope="col"
                          className="px-6 py-4 text-left text-xs font-medium text-gray-500"
                        >
                          {header.isPlaceholder ? null : (
                            <button
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              <div className="flex items-center">
                                <span className="">
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </span>

                                {/* sort icons  */}
                                {header.column.getCanSort() && (
                                  <div className="flex flex-col ml-3">
                                    {{
                                      asc: (
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                          ></path>
                                        </svg>
                                      ),
                                      desc: (
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                          ></path>
                                        </svg>
                                      ),
                                      // @ts-ignore
                                    }[header.column.getIsSorted()] ?? (
                                      <>
                                        {' '}
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 15l7-7 7 7"
                                          ></path>
                                        </svg>
                                        <svg
                                          className="w-2 h-2"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                          ></path>
                                        </svg>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="">
                {/* if isLoading, use skeleton rows  */}
                {isLoading &&
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b">
                      {table.getHeaderGroups()[0].headers.map((header, i) => {
                        return (
                          <td
                            key={`${header.id}-loader-${i}`}
                            colSpan={header.colSpan}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <div className="flex items-center w-full">
                              <div className="text-sm text-gray-900 w-full">
                                <TdSkeleton />
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                {!isLoading &&
                  table?.getRowModel()?.rows.map((row) => {
                    return (
                      <tr key={row.id + '_row'} className="border-b">
                        {row.getVisibleCells().map((cell, i) => {
                          return (
                            <td
                              key={`${cell.id}-${i}`}
                              className="whitespace-nowrap px-6 py-4 text-sm"
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                {!isLoading && !table?.getRowModel()?.rows?.length && (
                   //@ts-ignore
                  <tr className="border-b text-center" ><td colSpan={20} className='text-center h-40'><div className='p-4'>Data Not found</div></td></tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination maxDisplayedPages={5} table={table} />
        </div>
      </div>
    </div>
  );
};

const TdSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-5 bg-gray-200 animate-pulse"></div>
    </div>
  );
};

export default Table;
