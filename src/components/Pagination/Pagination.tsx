import React from 'react';
import { Paginator ,PaginatorPageChangeEvent} from 'primereact/paginator';

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  rowsPerPage,
  onPageChange
}) => {
  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    onPageChange(event.page + 1);
  };

  return (
    <Paginator
      first={(currentPage - 1) * rowsPerPage}
      rows={rowsPerPage}
      totalRecords={totalRecords}
      onPageChange={handlePageChange}
      template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    />
  );
};