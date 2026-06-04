import { useState } from "react";

import {
  ClipboardList,
  FileDown,
  LayoutDashboard,
  PlayCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  formatReportDate,
  getFluencyStatus,
  getFinalStatus,
  getReportReview,
  getReportStatus,
  getScoreDescription,
  getSpeedDistributionDescription,
  saveReportPdf,
  saveReportVideo,
  type ReportLocationState,
  VIDEO_UNAVAILABLE_MESSAGE,
} from "./reportDetailUtils";

import { useAnalysisDetailQuery } from "@/features/analysis/model/useAnalysisDetailQuery";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { AIEvaluationCard } from "@/shared/ui/ReportSection/AIEvaluationCard/AIEvaluationCard";
import { AnswerCard } from "@/shared/ui/ReportSection/AnswerCard/AnswerCard";
import { FluencyCard } from "@/shared/ui/ReportSection/FluencyCard/FluencyCard";
import { GazeCard } from "@/shared/ui/ReportSection/GazeCard/GazeCard";
import { NonverbalCard } from "@/shared/ui/ReportSection/NonverbalCard/NonverbalCard";
import { SpeechCard } from "@/shared/ui/ReportSection/SpeechCard/SpeechCard";

const InterviewReportPage = () => {
  const navigate = useNavigate();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { analysisId, folderTitle } =
    (useLocation().state as ReportLocationState | null) ?? {};
  const { data, isError, isLoading } = useAnalysisDetailQuery(analysisId);
  const status = getReportStatus(analysisId, isError, isLoading, Boolean(data));
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const handleVideoSave = () =>
    !saveReportVideo(data?.videoUrl, data?.title) && setIsVideoModalOpen(true);

  if (status || !data) {
    return (
      <div
        className={`mx-auto w-full max-w-5xl px-4 py-20 text-center ${
          status?.error ? "text-error-01" : "text-text-deactivated"
        }`}
      >
        {status?.message}
      </div>
    );
  }

  const fluency = getFluencyStatus(data.fluencyLevel);
  const review = getReportReview(data);

  return (
    <div
      data-print-report
      className="mx-auto flex w-full max-w-5xl flex-col px-4 py-12"
    >
      <header className="mb-12 text-center">
        <h1 className="text-head-01 text-text-primary mb-4 tracking-tight">
          면접 분석 리포트
        </h1>
        <div className="text-label-03 text-text-tertiary flex justify-center gap-6">
          <p>폴더명: {folderTitle ?? data.title}</p>
          <div className="h-4 w-px bg-border-default" />
          <p>일자: {formatReportDate(data.createdAt)}</p>
        </div>
      </header>
      <section className="mb-6 grid grid-cols-2 gap-6">
        <NonverbalCard
          status={data.gestureFeedbackWord || "제스처"}
          subtitle="비언어 표현"
          description={
            data.gestureFeedbackSentence || "비언어 표현 피드백이 없습니다."
          }
        />
        <FluencyCard
          status={fluency.status}
          subtitle={fluency.subtitle}
          description={data.fluencyFeedback || "발화 유창성 피드백이 없습니다."}
        />
        <GazeCard
          percentage={data.gazeDistribution.camera}
          subtitle="정면 응시율"
          description={getScoreDescription(
            data.gazeScore,
            "높은 응시율로 면접관에게 신뢰감을 전달했으며 시선 배분이 일정합니다.",
            `화면 응시 ${data.gazeDistribution.screen}%입니다. 카메라 응시 비율을 조금 더 높여보세요.`,
          )}
        />
        <SpeechCard
          score={`${data.speedScore}점`}
          scoreSubtitle="적절성"
          wpm={`${data.speedDistribution.optimal}%`}
          wpmSubtitle="적정 속도"
          description={getSpeedDistributionDescription(data.speedDistribution)}
        />
      </section>
      <section className="mb-10 flex flex-col gap-6">
        <AnswerCard
          percentage={data.finalScore}
          subtitle={getFinalStatus(data.finalScore)}
          description={review.overallReview}
        />
        <AIEvaluationCard
          overallReview={review.overallReview}
          strengths={review.strengths}
          improvements={review.improvements}
        />
      </section>
      <div data-print-hidden className="mb-12 flex justify-end gap-3">
        <Button
          variant="outline"
          className="w-auto px-6"
          onClick={saveReportPdf}
        >
          <div className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            <span>PDF 저장하기</span>
          </div>
        </Button>
        <Button
          variant="primary"
          className="w-auto px-6"
          onClick={handleVideoSave}
        >
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>영상 저장하기</span>
          </div>
        </Button>
      </div>
      <footer
        data-print-hidden
        className="flex justify-center gap-4 border-t border-border-default pt-10"
      >
        <Button
          variant="outline"
          className="w-auto px-10"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            <span>대시보드로 가기</span>
          </div>
        </Button>
        <Button
          variant="outline"
          className="w-auto px-10"
          onClick={() => navigate("/report")}
        >
          <div className="flex items-center py-1 gap-2">
            <ClipboardList className="h-5 w-5" />
            <span>전체 리포트 보러가기</span>
          </div>
        </Button>
      </footer>
      <Modal
        isOpen={isVideoModalOpen}
        title="영상 저장을 할 수 없습니다"
        description={VIDEO_UNAVAILABLE_MESSAGE}
        onClose={closeVideoModal}
        onConfirm={closeVideoModal}
      />
    </div>
  );
};
export default InterviewReportPage;
