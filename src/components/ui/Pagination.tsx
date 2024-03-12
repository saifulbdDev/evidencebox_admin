import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  table: any; // Replace 'any' with the type of your table object
  maxDisplayedPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ table, maxDisplayedPages = 5 }) => {
  const pageIndex: number = table.getState().pagination.pageIndex;
  const pageSize: number = table.getState().pagination.pageSize;
  const rowsPerPage: number = table.getRowModel().rows.length;
  const totalPageCount: number = table.getPageCount();

  // Calculate the current range of records being displayed
  const startIndex: number = pageIndex * pageSize;
  const endIndex: number = startIndex + (rowsPerPage || 1) - 1;

  // Calculate the range of page numbers to display
  const rangeStart: number = Math.max(0, pageIndex - Math.floor(maxDisplayedPages / 2));
  const rangeEnd: number = Math.min(totalPageCount - 1, rangeStart + maxDisplayedPages - 1);

  // Create an array of page numbers to display
  const pageNumbers: number[] = [];
  if (totalPageCount <= maxDisplayedPages) {
    // Display all pages if totalPageCount is less than or equal to maxDisplayedPages
    pageNumbers.push(...Array.from({ length: totalPageCount }, (_, i) => i + 1));
  } else {
    // Display rangeStart to rangeEnd with ellipsis if necessary
    pageNumbers.push(rangeStart + 1);
    if (rangeStart + 1 !== rangeEnd) {
      pageNumbers.push(-1); // -1 represents ellipsis
    }
    for (let i = rangeStart + 1; i <= rangeEnd - 1; i++) {
      pageNumbers.push(i + 1);
    }
    if (rangeStart !== rangeEnd) {
      pageNumbers.push(-1); // -1 represents ellipsis
    }
    pageNumbers.push(rangeEnd + 1);
  }

  return (
    <>
      {totalPageCount > 0 && (
        <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex + 1}</span> of{' '}
                <span className="font-medium">{totalPageCount}</span>{' '}
                {totalPageCount > 1 ? 'pages' : 'page'}
              </p>
            </div>
            <div>
              <div className="flex justify-between flex-1 sm:hidden">
                <button
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    table.getCanNextPage() ? 'text-black' : 'text-[#9CA3AF]'
                  } `}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </button>
              </div>
              <nav
                className="hidden -space-x-px rounded-md shadow-sm isolate sm:inline-flex"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                {pageNumbers.map((pageNumber, index) => (
                  <React.Fragment key={index}>
                    {pageNumber === -1 ? (
                      <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
                        ...
                      </span>
                    ) : (
                      <button
                        onClick={() => table.setPageIndex(pageNumber - 1)}
                        type="button"
                        className={`${
                          pageIndex === pageNumber - 1
                            ? 'bg-primary-300 text-white hover:bg-primary-400  ring-1'
                            : 'ring-gray-300 hover:bg-gray-50 text-gray-500 ring-inset ring-1'
                        } relative inline-flex items-center px-4 py-2 text-sm font-medium  hover:z-10 focus:z-10 focus:outline-offset-0`}
                      >
                        {pageNumber}
                      </button>
                    )}
                  </React.Fragment>
                ))}
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className={`${
                    !table.getCanPreviousPage() ? 'text-[#9CA3AF]' : 'text-black'
                  } relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
