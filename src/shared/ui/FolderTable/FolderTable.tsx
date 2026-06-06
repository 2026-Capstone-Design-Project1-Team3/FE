import { useState, type FC } from "react";

import {
  RecordTableRow,
  type RecordTableRowProps,
} from "@/shared/ui/FolderTable/RecordTableRow";
import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { cn } from "@/utils/cn";

export interface FolderTableProps {
  records?: RecordTableRowProps[];
  itemsPerPage?: number;
  currentPage?: number;
  defaultPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const FolderTable: FC<FolderTableProps> = ({
  records = [],
  itemsPerPage = 5,
  currentPage,
  defaultPage = 1,
  totalPages,
  onPageChange,
  className,
}) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlledPagination = currentPage !== undefined;
  const activePage = currentPage ?? internalPage;
  const pageCount =
    totalPages ?? Math.max(1, Math.ceil(records.length / itemsPerPage));
  const startIndex = (activePage - 1) * itemsPerPage;
  const visibleRecords = isControlledPagination
    ? records
    : records.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (currentPage === undefined) {
      setInternalPage(page);
    }

    onPageChange?.(page);
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-2xl border border-border-default bg-background-light">
        <table className="w-full">
          <thead className="border-b border-border-default">
            <tr className="text-label-01 text-text-deactivated">
              <th className="px-6 py-4 text-left">연습 세션 및 폴더명</th>
              <th className="px-6 py-4 text-center">마지막 연습 일자</th>
              <th className="px-6 py-4 text-right">비디오 수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-deactivated">
            {visibleRecords.length > 0 ? (
              visibleRecords.map((record) => (
                <RecordTableRow key={record.folderId} {...record} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-body-02 py-20 text-center text-text-deactivated"
                >
                  기록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages !== undefined || pageCount > 1 ? (
        <Pagination
          currentPage={activePage}
          totalPages={pageCount}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      ) : null}
    </section>
  );
};
