import { useState } from "react";

import { toFolderRecords } from "./resultFolderRecords";

import { useFolderListQuery } from "@/features/folder/model/useFolderListQuery";
import { FolderTable } from "@/shared/ui/FolderTable/FolderTable";

const ITEMS_PER_PAGE = 5;

export const PresentationReportPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, isLoading } = useFolderListQuery({
    type: 0,
    how: 0,
    limit: ITEMS_PER_PAGE,
    page: currentPage - 1,
  });
  const records = toFolderRecords(data, "presentation");
  const totalPages = currentPage + (records.length === ITEMS_PER_PAGE ? 1 : 0);

  return (
    <main>
      <div className="min-h-full w-full">
        <div className="mx-auto w-full max-w-6xl px-8 py-12">
          <section className="mb-10">
            <span className="flex gap-2">
              <p className="text-body-01 text-text-secondary mb-7">분석 &gt;</p>
              <p className="text-label-01">발표 연습</p>
            </span>

            <h1 className="text-head-01 text-text-primary">발표 연습 기록</h1>
          </section>

          {isError ? (
            <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-error-01">
              기록을 불러오는데 실패했습니다.
            </div>
          ) : isLoading ? (
            <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-text-deactivated">
              기록을 불러오는 중입니다...
            </div>
          ) : (
            <FolderTable
              records={records}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PresentationReportPage;
