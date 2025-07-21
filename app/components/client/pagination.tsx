import React from "react";

interface PaginationProps {
  page: number;
  totalFilteredPages: number;
  handlePageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalFilteredPages, handlePageChange }) => {
  if (totalFilteredPages === 0) {
    return <div className="text-xs text-neutral-600 dark:text-neutral-400">No results</div>;
  }

  if (totalFilteredPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 cursor-pointer text-sm rounded disabled:opacity-50"
      >
        <span className="inline-block font-bold cursor-pointer select-none hover:text-gray-700">&larr;</span> Prev
      </button>

      <span className="text-center text-sm text-neutral-600 dark:text-neutral-400 mx-2">
        {`${page}/${totalFilteredPages}`}
      </span>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalFilteredPages}
        className="px-3 py-1 text-sm cursor-pointer rounded disabled:opacity-50"
      >
        Next <span className="inline-block select-none">&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
