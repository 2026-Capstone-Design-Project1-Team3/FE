import type { AnalysisDetailResponse } from "@/entities/analysis/model/types";

export interface ReportLocationState {
  analysisId?: string;
  folderTitle?: string;
}

export const VIDEO_UNAVAILABLE_MESSAGE =
  "현재 리포트 응답에 저장할 영상 URL이 없습니다. 영상 URL이 API에 추가되면 이 버튼으로 바로 다운로드할 수 있습니다.";

const clampScore = (score = 0) => Math.min(100, Math.max(0, Math.round(score)));

export const getFluencyStatus = (level?: 0 | 1 | 2) => {
  if (level === 2) return { status: "High", subtitle: "우수 단계" };
  if (level === 1) return { status: "Mid", subtitle: "보통 단계" };
  return { status: "Low", subtitle: "개선 필요" };
};

export const getFinalStatus = (score?: number) => {
  const safeScore = clampScore(score);

  if (safeScore >= 85) return "매우 높음";
  if (safeScore >= 70) return "높음";
  if (safeScore >= 50) return "보통";
  return "개선 필요";
};

export const getScoreDescription = (
  score: number | undefined,
  highText: string,
  lowText: string,
) => (clampScore(score) >= 70 ? highText : lowText);

export const getReportStatus = (
  analysisId: string | undefined,
  isError: boolean,
  isLoading: boolean,
  hasData: boolean,
) => {
  if (!analysisId) return { message: "분석 기록을 찾을 수 없습니다." };
  if (isError) {
    return {
      message: "리포트 정보를 불러오는데 실패했습니다.",
      error: true,
    };
  }
  if (isLoading || !hasData) {
    return { message: "리포트 정보를 불러오는 중입니다..." };
  }
};

export const splitFinalFeedback = (feedback = "") => {
  return feedback
    .split("<q>")
    .map((value) => value.trim())
    .filter(Boolean);
};

export const getReportReview = (detail?: AnalysisDetailResponse) => {
  const feedbacks = splitFinalFeedback(detail?.finalFeedback);

  return {
    overallReview: feedbacks[0] ?? "최종 평가가 없습니다.",
    strengths: feedbacks.slice(1, 3),
    improvements: feedbacks.slice(3, 5),
  };
};

export const formatReportDate = (value?: string) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join(".");
};

export const saveReportPdf = () => {
  const report = document.querySelector<HTMLElement>("[data-print-report]");
  const hiddenElements = document.querySelectorAll<HTMLElement>(
    "[data-print-hidden]",
  );

  if (!report) {
    window.print();
    return;
  }

  const bodyVisibility = document.body.style.visibility;
  const reportStyle = {
    left: report.style.left,
    maxWidth: report.style.maxWidth,
    padding: report.style.padding,
    position: report.style.position,
    top: report.style.top,
    visibility: report.style.visibility,
    width: report.style.width,
  };
  const hiddenDisplays = Array.from(
    hiddenElements,
    (element) => [element, element.style.display] as const,
  );
  const restore = () => {
    document.body.style.visibility = bodyVisibility;
    Object.assign(report.style, reportStyle);
    hiddenDisplays.forEach(([element, display]) => {
      element.style.display = display;
    });
  };

  document.body.style.visibility = "hidden";
  Object.assign(report.style, {
    left: "0",
    maxWidth: "none",
    padding: "0",
    position: "absolute",
    top: "0",
    visibility: "visible",
    width: "100%",
  });
  hiddenElements.forEach((element) => {
    element.style.display = "none";
  });
  window.addEventListener("afterprint", restore, { once: true });
  window.print();
  setTimeout(restore);
};

export const saveReportVideo = (videoUrl?: string, title = "report-video") => {
  if (!videoUrl) return false;

  const link = document.createElement("a");

  link.href = videoUrl;
  link.download = `${title}.mp4`;
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();

  return true;
};

export const getSpeedDistributionDescription = ({
  fast,
  slow,
}: AnalysisDetailResponse["speedDistribution"]) =>
  `빠른 구간은 ${fast}%, 느린 구간은 ${slow}%였습니다. 빠른 구간이 있다면 결론부에서 완급 조절을 신경 써보세요.`;
