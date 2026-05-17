import { useMemo, useState, type FC } from "react";

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
  const activePage = currentPage ?? internalPage;
  const pageCount =
    totalPages ?? Math.max(1, Math.ceil(records.length / itemsPerPage));

  const paginatedRecords = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;

    return records.slice(startIndex, startIndex + itemsPerPage);
  }, [activePage, itemsPerPage, records]);

  const handlePageChange = (page: number) => {
    if (currentPage === undefined) {
      setInternalPage(page);
    }

    onPageChange?.(page);
  };

  return (
    <section className={cn("w-full", className)}>
      <table className="w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-label-01 text-text-deactivated">
            <th className="px-6 py-1 text-left">연습 세션 및 폴더명</th>
            <th className="px-6 py-1 text-center">마지막 연습 일자</th>
            <th className="px-6 py-1 text-right">비디오 수</th>
          </tr>
          <tr aria-hidden="true">
            <th colSpan={3}>
              <div className="bg-border-default h-px w-full" />
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.length > 0 ? (
            paginatedRecords.map((record) => (
              <RecordTableRow key={record.folderId} {...record} />
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-body-02 border-border-default bg-background-light text-text-deactivated rounded-xl border py-20 text-center"
              >
                기록이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 ? (
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
