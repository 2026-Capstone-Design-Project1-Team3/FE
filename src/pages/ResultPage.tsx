import { ChevronRight, Gauge, ScanEye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { toFolderRecords } from "./resultFolderRecords";

import { useAnalysisStatisticsQuery } from "@/features/analysis/model/useAnalysisStatisticsQuery";
import { useFolderListQuery } from "@/features/folder/model/useFolderListQuery";
import { FolderTable } from "@/shared/ui/FolderTable/FolderTable";
import { cn } from "@/utils/cn";

const STATISTICS_LIMIT = 10;

const getAverage = (values: number[]) => {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((total, value) => total + value, 0) / values.length,
  );
};

const normalizeScore = (score = 0) =>
  Math.min(100, Math.max(0, Math.round(score)));

export const ResultPage = () => {
  const navigate = useNavigate();
  const {
    data: statistics,
    isError: isStatisticsError,
    isLoading: isStatisticsLoading,
  } = useAnalysisStatisticsQuery(STATISTICS_LIMIT);
  const {
    data: presentationFolders,
    isError: isPresentationError,
    isLoading: isPresentationLoading,
  } = useFolderListQuery({ type: 0, limit: 3, how: 0 });
  const {
    data: interviewFolders,
    isError: isInterviewError,
    isLoading: isInterviewLoading,
  } = useFolderListQuery({ type: 1, limit: 3, how: 0 });

  const folderSections = [
    {
      title: "최근 발표 기록",
      path: "/report/presentation",
      records: toFolderRecords(presentationFolders, "presentation"),
      isError: isPresentationError,
      isLoading: isPresentationLoading,
    },
    {
      title: "최근 면접 기록",
      path: "/report/interview",
      records: toFolderRecords(interviewFolders, "interview"),
      isError: isInterviewError,
      isLoading: isInterviewLoading,
    },
  ];
  const gazeAverage = normalizeScore(
    getAverage(statistics?.statistics.map(({ gazeScore }) => gazeScore) ?? []),
  );
  const speedAverage = normalizeScore(
    getAverage(
      statistics?.statistics.map(({ speedScore }) => speedScore) ?? [],
    ),
  );
  const statisticCards = [
    {
      title: "평균 시선 점수",
      value: gazeAverage,
      unit: "점",
      description: "카메라 응시 안정성",
      Icon: ScanEye,
      color: "text-secondary-900",
      bar: "bg-secondary-900",
      progress: gazeAverage,
    },
    {
      title: "평균 발화 속도",
      value: speedAverage,
      unit: "점",
      description: "말의 속도와 리듬",
      Icon: Gauge,
      color: "text-primary-800",
      bar: "bg-primary-800",
      progress: speedAverage,
    },
  ];

  return (
    <main>
      <div className="p-8 py-10">
        <section className="pb-10">
          <h1 className="text-head-01 text-text-primary">분석 요약</h1>
          <p className="text-body-01 text-text-secondary">
            최근 10개 분석 기록을 기준으로 시선과 발화 속도의 흐름을 요약합니다.
          </p>
        </section>
        {isStatisticsError ? (
          <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-error-01">
            통계 정보를 불러오는데 실패했습니다.
          </div>
        ) : isStatisticsLoading ? (
          <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-text-deactivated">
            통계 정보를 불러오는 중입니다...
          </div>
        ) : (
          <section className="grid gap-5 md:grid-cols-2">
            {statisticCards.map(
              ({
                Icon,
                bar,
                color,
                description,
                progress,
                title,
                unit,
                value,
              }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border-default bg-background-light p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-label-01 text-text-secondary">
                        {title}
                      </h2>
                      <p className="text-body-03 text-text-deactivated mt-1">
                        {description}
                      </p>
                    </div>
                    <Icon className={cn("size-6", color)} strokeWidth={2.25} />
                  </div>
                  <div className="mt-7 flex items-end gap-1">
                    <strong className={cn("text-head-01", color)}>
                      {value}
                    </strong>
                    <span className="text-body-02 text-text-deactivated mb-1">
                      {unit}
                    </span>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-border-default">
                    <div
                      className={cn("h-full rounded-full", bar)}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </article>
              ),
            )}
          </section>
        )}
        {folderSections.map(({ isError, isLoading, path, records, title }) => (
          <section key={path}>
            <div className="mb-4 flex justify-between pt-10">
              <h2 className="text-head-03 text-text-primary">{title}</h2>
              <button
                className="text-label-04 -mb-2 flex min-w-20 cursor-pointer items-center gap-1 text-text-deactivated transition-all hover:gap-2 hover:text-text-secondary"
                onClick={() => navigate(path)}
              >
                전체 보기
                <ChevronRight size={16} />
              </button>
            </div>
            {isError ? (
              <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-error-01">
                기록을 불러오는데 실패했습니다.
              </div>
            ) : isLoading ? (
              <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-text-deactivated">
                기록을 불러오는 중입니다...
              </div>
            ) : (
              <FolderTable records={records} itemsPerPage={3} />
            )}
          </section>
        ))}
      </div>
    </main>
  );
};

export default ResultPage;
