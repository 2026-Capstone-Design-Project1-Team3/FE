import { useMemo, useState } from "react";

import { useLocation, useParams } from "react-router-dom";

import { folderInsights, folderRecords } from "@/mocks/folderDetailData";
import { mockRecords } from "@/mocks/mainRecordData";
import { interviewRecords, presentationRecords } from "@/mocks/reportPageData";
import { FolderInsightSummary } from "@/shared/ui/FolderDetail/FolderInsightSummary/FolderInsightSummary";
import { FolderScoreCard } from "@/shared/ui/FolderDetail/FolderScoreCard/FolderScoreCard";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

const ITEMS_PER_PAGE = 5;

interface FolderDetailLocationState {
  folderTitle?: string;
  variant?: "interview" | "presentation";
}

export const FolderDetailPage = () => {
  const { pathname, state } = useLocation();
  const { folderId } = useParams();
  const routeVariant = pathname.includes("/interview/")
    ? "interview"
    : "presentation";
  const { folderTitle: stateFolderTitle, variant = routeVariant } =
    (state as FolderDetailLocationState | null) ?? { variant: routeVariant };
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(folderRecords.length / ITEMS_PER_PAGE),
  );
  const folderTitle =
    stateFolderTitle ??
    [
      ...interviewRecords,
      ...presentationRecords,
      ...mockRecords,
      ...folderRecords,
    ].find((record) => record.folderId === folderId)?.title ??
    folderId ??
    "폴더명";
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return folderRecords
      .slice(startIndex, startIndex + ITEMS_PER_PAGE)
      .map((record) => ({
        ...record,
        variant,
      }));
  }, [currentPage, variant]);

  return (
    <main>
      <div className="min-h-full w-full">
        <div className="mx-auto w-full max-w-6xl px-8 py-12">
          <section className="mb-8">
            <span className="flex gap-2">
              <p className="text-body-01 text-text-secondary mb-8">
                분석 &gt;
                {variant === "presentation" ? " 발표 연습 " : " 면접 연습 "}
                &gt;
              </p>
              <p className="text-label-01">{folderTitle}</p>
            </span>

            <h1 className="text-head-01 text-text-primary">폴더 상세 기록</h1>
            <p className="text-body-01 text-text-secondary mt-3">
              총 {folderRecords.length}개의 세션 기록이 저장되어있습니다.
            </p>
          </section>

          <RecordSection
            initialData={paginatedRecords}
            count={ITEMS_PER_PAGE}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-16"
          />

          <section className="mt-16">
            <h2 className="text-head-03 text-text-primary mb-8">
              폴더 인사이트 요약
            </h2>

            <div className="flex flex-col gap-6 lg:flex-row">
              <FolderInsightSummary insights={folderInsights} />
              <FolderScoreCard title="평균 코칭 성과" score={90} delta="+5%" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default FolderDetailPage;
