import {
  ClipboardList,
  FileDown,
  LayoutDashboard,
  PlayCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import { AIEvaluationCard } from "@/shared/ui/ReportSection/AIEvaluationCard/AIEvaluationCard";
import { FluencyCard } from "@/shared/ui/ReportSection/FluencyCard/FluencyCard";
import { GazeCard } from "@/shared/ui/ReportSection/GazeCard/GazeCard";
import { NonverbalCard } from "@/shared/ui/ReportSection/NonverbalCard/NonverbalCard";
import { ScriptSimilarityCard } from "@/shared/ui/ReportSection/ScriptSimilarityCard/ScriptSimilarityCard";
import { SpeechCard } from "@/shared/ui/ReportSection/SpeechCard/SpeechCard";

const PresentationReportPage = () => {
  const navigate = useNavigate();

  const MOCK_DATA = {
    header: {
      folder: "2024 상반기 학급 학술 홍보",
      date: "2024. 10. 24",
    },
    nonverbal: {
      status: "안정적",
      subtitle: "자세 유지",
      description:
        "어깨와 팔의 대칭이 안정적입니다. 강조 시 손 동작을 추가하면 더욱 효과적입니다.",
    },
    fluency: {
      status: "High",
      subtitle: "우수 단계",
      description:
        "불필요한 추임새 없이 문장 연결이 매우 매끄럽고 호흡이 안정적입니다.",
    },
    gaze: {
      percentage: 88,
      subtitle: "정면 응시율",
      description:
        "높은 응시율로 청중에게 신뢰감을 전달했으며 시선 배분이 일정합니다.",
    },
    speech: {
      score: "92점",
      scoreSubtitle: "적정성",
      wpm: "135",
      wpmSubtitle: "WPM",
      description:
        "전반적인 속도는 이상적이나, 결론 부분에서 속도가 빨라지는 점을 주의하세요.",
    },
    script: {
      percentage: 90,
      subtitle: "매우 높음",
      description:
        "대본 숙련도가 매우 높으며, 본인의 언어로 자연스럽게 전달하는 수준입니다. 암기보다는 이해도가 돋보입니다.",
    },
    aiEvaluation: {
      overallReview:
        "전체적인 전달력은 우수하지만, 결론부의 강조를 위한 완급 조절이 보완되면 완벽한 발표가 될 것입니다.",
      strengths: [
        "안정적인 시선 처리 및 청중 교감",
        "자연스러운 제스처와 신체 언어",
      ],
      improvements: [
        "적절한 포즈(Pause) 활용 필요",
        "핵심 키워드 발음 시 강세 조절",
      ],
    },
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-head-01 tracking-tight text-text-primary">
          발표 분석 리포트
        </h1>
        <div className="flex justify-center gap-6 text-label-03 text-text-tertiary">
          <p>폴더명: {MOCK_DATA.header.folder}</p>
          <div className="h-4 w-px bg-border-default" />
          <p>일자: {MOCK_DATA.header.date}</p>
        </div>
      </header>

      <section className="mb-6 grid grid-cols-2 gap-6">
        <NonverbalCard
          status={MOCK_DATA.nonverbal.status}
          subtitle={MOCK_DATA.nonverbal.subtitle}
          description={MOCK_DATA.nonverbal.description}
        />
        <FluencyCard
          status={MOCK_DATA.fluency.status}
          subtitle={MOCK_DATA.fluency.subtitle}
          description={MOCK_DATA.fluency.description}
        />
        <GazeCard
          percentage={MOCK_DATA.gaze.percentage}
          subtitle={MOCK_DATA.gaze.subtitle}
          description={MOCK_DATA.gaze.description}
        />
        <SpeechCard
          score={MOCK_DATA.speech.score}
          scoreSubtitle={MOCK_DATA.speech.scoreSubtitle}
          wpm={MOCK_DATA.speech.wpm}
          wpmSubtitle={MOCK_DATA.speech.wpmSubtitle}
          description={MOCK_DATA.speech.description}
        />
      </section>

      <section className="mb-10 flex flex-col gap-6">
        <ScriptSimilarityCard
          percentage={MOCK_DATA.script.percentage}
          subtitle={MOCK_DATA.script.subtitle}
          description={MOCK_DATA.script.description}
        />
        <AIEvaluationCard
          overallReview={MOCK_DATA.aiEvaluation.overallReview}
          strengths={MOCK_DATA.aiEvaluation.strengths}
          improvements={MOCK_DATA.aiEvaluation.improvements}
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
