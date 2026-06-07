import {
  ClipboardList,
  FileDown,
  LayoutDashboard,
  PlayCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAnalysisDetailQuery } from "@/features/analysis/model/useAnalysisDetailQuery";
import { Button } from "@/shared/ui/Button/Button";
import { AIEvaluationCard } from "@/shared/ui/ReportSection/AIEvaluationCard/AIEvaluationCard";
import { FluencyCard } from "@/shared/ui/ReportSection/FluencyCard/FluencyCard";
import { GazeCard } from "@/shared/ui/ReportSection/GazeCard/GazeCard";
import { NonverbalCard } from "@/shared/ui/ReportSection/NonverbalCard/NonverbalCard";
import { ScriptSimilarityCard } from "@/shared/ui/ReportSection/ScriptSimilarityCard/ScriptSimilarityCard";
import { SpeechCard } from "@/shared/ui/ReportSection/SpeechCard/SpeechCard";

const FLUENCY_SUBTITLE = ["개선 필요", "보통 단계", "우수 단계"];
const FLUENCY_STATUS = ["Low", "Mid", "High"];

const getScoreSubtitle = (score: number) => {
  if (score >= 90) return "매우 높음";
  if (score >= 70) return "높음";
  if (score >= 50) return "보통";
  return "낮음";
};

const getScriptDescription = (score: number) => {
  if (score >= 90)
    return "대본 숙련도가 매우 높으며, 자연스럽게 전달하는 수준입니다.";
  if (score >= 70) return "대본을 잘 숙지하고 있으며, 전달이 자연스럽습니다.";
  if (score >= 50)
    return "대본의 핵심 내용은 전달되었으나, 더 많은 연습이 권장됩니다.";
  return "대본 숙달이 더 필요합니다. 핵심 키워드 중심으로 연습하세요.";
};

const parseFinalFeedback = (feedback: string | null | undefined) => {
  if (!feedback) return { overallReview: "", strengths: [], improvements: [] };
  const parts = feedback.split("<q>").map((s) => s.trim());
  return {
    overallReview: parts[0] ?? "",
    strengths: [parts[1] ?? "", parts[2] ?? ""].filter(Boolean),
    improvements: [parts[3] ?? "", parts[4] ?? ""].filter(Boolean),
  };
};

const PresentationReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { analysisId } = (location.state ?? {}) as { analysisId?: string };

  const { data, isLoading } = useAnalysisDetailQuery(analysisId ?? null);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-body-01 text-text-secondary animate-pulse">
          리포트를 불러오는 중...
        </span>
      </div>
    );
  }

  const fluencyIdx = Math.min(Math.max(data.fluencyLevel, 0), 2);
  const { overallReview, strengths, improvements } = parseFinalFeedback(
    data.finalFeedback,
  );
  const dist = data.speedDistribution ?? { fast: 0, optimal: 0, slow: 0 };
  const speedDesc = `빠름 ${dist.fast}% / 적정 ${dist.optimal}% / 느림 ${dist.slow}%`;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-head-01 tracking-tight text-text-primary">
          발표 분석 리포트
        </h1>
        <div className="flex justify-center gap-6 text-label-03 text-text-tertiary">
          <p>폴더명: {data.title}</p>
          <div className="h-4 w-px bg-border-default" />
          <p>일자: {data.createdAt.slice(0, 10).replace(/-/g, ".")}</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-6">
        <NonverbalCard
          status={data.gestureFeedbackWord}
          subtitle="제스처 분석"
          description={data.gestureFeedbackSentence}
        />
        <FluencyCard
          status={FLUENCY_STATUS[fluencyIdx]}
          subtitle={FLUENCY_SUBTITLE[fluencyIdx]}
          description={data.fluencyFeedback}
        />
        <GazeCard
          percentage={data.gazeDistribution?.camera ?? 0}
          subtitle="카메라 응시율"
          description={data.gazeFeedback}
        />
        <SpeechCard
          score={`${data.speedScore}점`}
          scoreSubtitle="속도 점수"
          wpm={data.speedSpm.toFixed(1)}
          wpmSubtitle="SPM"
          description={speedDesc}
        />
      </section>

      <section className="mb-10 flex flex-col gap-6">
        <ScriptSimilarityCard
          percentage={data.finalScore}
          subtitle={getScoreSubtitle(data.finalScore)}
          description={getScriptDescription(data.finalScore)}
        />
        <AIEvaluationCard
          overallReview={overallReview}
          strengths={strengths}
          improvements={improvements}
        />
      </section>

      <div className="mb-12 flex justify-end gap-3">
        <Button variant="outline" className="w-auto px-6">
          <div className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            <span>PDF 저장하기</span>
          </div>
        </Button>
        <Button variant="primary" className="w-auto px-6">
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            <span>영상 저장하기</span>
          </div>
        </Button>
      </div>

      <footer className="flex justify-center gap-4 border-t border-border-default pt-10">
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
          <div className="flex items-center gap-2 py-1">
            <ClipboardList className="h-5 w-5" />
            <span>전체 리포트 보러가기</span>
          </div>
        </Button>
      </footer>
    </div>
  );
};

export default PresentationReportPage;
