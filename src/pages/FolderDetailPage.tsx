import { useState } from "react";

import { Award, Gauge, ScanEye } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";

import { useCardNewsQuery } from "@/features/analysis/model/useCardNewsQuery";
import { useFolderStatisticsQuery } from "@/features/folder/model/useFolderStatisticsQuery";
import { FolderStatisticCard } from "@/shared/ui/FolderDetail/FolderStatisticCard/FolderStatisticCard";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { Pagination } from "@/shared/ui/Pagination/Pagination";

const ITEMS_PER_PAGE = 5;

interface FolderDetailLocationState {
  folderTitle?: string;
  variant?: "interview" | "presentation";
}

const normalizeScore = (score = 0) =>
  Math.min(100, Math.max(0, Math.round(score)));

export const FolderDetailPage = () => {
  const { pathname, state } = useLocation();
  const { folderId } = useParams();
  const routeVariant = pathname.includes("/interview/")
    ? "interview"
    : "presentation";
  const { folderTitle: stateFolderTitle, variant = routeVariant } =
    (state as FolderDetailLocationState | null) ?? { variant: routeVariant };
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, isLoading } = useCardNewsQuery({
    params: {
      folderId,
      limit: ITEMS_PER_PAGE,
      page: currentPage - 1,
      how: 0,
      type: variant === "presentation" ? 0 : 1,
    },
    enabled: Boolean(folderId),
  });
  const {
    data: statistics,
    isError: isStatisticsError,
    isLoading: isStatisticsLoading,
  } = useFolderStatisticsQuery({ folderId });
  const records =
    data?.cardnews.map(({ analysisId, createdAt, title }) => ({
      analysisId,
      createdAt,
      folderTitle: stateFolderTitle ?? folderId ?? "폴더명",
      title,
      variant,
    })) ?? [];
  const totalCount = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const folderTitle = stateFolderTitle ?? folderId ?? "폴더명";
  const statisticItems = [
    {
      title: "시선 점수",
      description: "카메라 응시와 시선 안정성",
      score: normalizeScore(statistics?.gazeScore),
      Icon: ScanEye,
      color: "text-secondary-900",
      bar: "bg-secondary-900",
    },
    {
      title: "발화 속도",
      description: "말의 빠르기와 전달 흐름",
      score: normalizeScore(statistics?.speedScore),
      Icon: Gauge,
      color: "text-primary-800",
      bar: "bg-primary-800",
    },
    {
      title: variant === "presentation" ? "발표 유사성" : "면접 적합성",
      description:
        variant === "presentation"
          ? "대본 대비 발표 일치도"
          : "답변의 질문 적합도",
      score: normalizeScore(statistics?.finalScore),
      Icon: Award,
      color: "text-error-01",
      bar: "bg-error-01",
    },
  ];

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
              총 {totalCount}개의 세션 기록이 저장되어있습니다.
            </p>
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
            <>
              <RecordSection
                initialData={records}
                count={ITEMS_PER_PAGE}
                folderTitle={folderTitle}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                className="mt-16"
              />
            </>
          )}

          <section className="mt-16">
            <h2 className="text-head-03 text-text-primary mb-8">
              폴더 인사이트 요약
            </h2>

            {isStatisticsError ? (
              <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-error-01">
                통계 정보를 불러오는데 실패했습니다.
              </div>
            ) : isStatisticsLoading ? (
              <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-text-deactivated">
                통계 정보를 불러오는 중입니다...
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-3">
                {statisticItems.map((item) => (
                  <FolderStatisticCard key={item.title} {...item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default FolderDetailPage;
