import { PaginationProps } from '@/constants/interface.constant';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import ReactPaginate from 'react-paginate';

const PreviousNextButtonClass =
  'border rounded-md bg-neutral-20 hover:bg-neutral-40 block w-full h-full cursor-pointer text-center';
const disabledButtonClass = 'opacity-50 cursor-not-allowed';

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  initialPage,
}) => {
  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected + 1; // React Paginate uses zero-based indexing
    onPageChange(selectedPage);
  };
  if (!pageCount) return null;
  return (
    <div className="flex justify-center py-6 ">
      <ReactPaginate
        previousLabel={
          <span className="flex py-1 px-3 w-full h-full  items-center justify-center">
            <ArrowLeft className="text-neutral-700" />
          </span>
        }
        nextLabel={
          <span className="flex py-1 px-3 w-full h-full  items-center justify-center">
            <ArrowRight className="text-neutral-700" />
          </span>
        }
        breakLabel={'...'}
        breakClassName={'text-neutral-500'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'flex space-x-2'}
        pageClassName={'border rounded-md hover:bg-neutral-40 cursor-pointer'}
        pageLinkClassName={
          'block w-full h-full px-3 py-1 text-neutral-700 cursor-pointer text-center'
        }
        activeClassName={'bg-primary-100 hover:bg-primary-300 text-neutral-0'}
        previousClassName={`${PreviousNextButtonClass} ${initialPage === 1 ? disabledButtonClass : ''}`}
        nextClassName={`${PreviousNextButtonClass} ${pageCount <= (initialPage || 0) ? disabledButtonClass : ''}`}
        disabledClassName={disabledButtonClass}
        initialPage={initialPage ? initialPage - 1 : 0}
      />
    </div>
  );
};

export default Pagination;
