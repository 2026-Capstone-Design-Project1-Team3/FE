import { useState, useRef } from "react";

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import CameraComponent, {
  type CameraHandle,
} from "@/shared/ui/CameraComponent/CameraComponent";
import { InfoCard } from "@/shared/ui/RecordSection/InfoCard/InfoCard";
import { QuestionCard } from "@/shared/ui/RecordSection/QuestionCard/QuestionCard";
import { SpeedCard } from "@/shared/ui/RecordSection/SpeedCard/SpeedCard";
import { TimeCard } from "@/shared/ui/RecordSection/TimeCard/TimeCard";

const MOCK_INFO = {
  variant: "interview" as const,
  folderName: "2024 상반기 공채",
  date: "2024.05.20",
  companyName: "현대자동차",
  role: "IT 서비스 기획",
};

const MOCK_QUESTIONS = [
  "본인의 가장 큰 강점과 이를 발휘한 경험에 대해 말씀해 주세요.",
  "협업 중 갈등이 발생했을 때 어떻게 해결하시나요?",
  "우리 기업에 지원하게 된 동기는 무엇인가요?",
];

const InterviewRecordPage = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<CameraHandle>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleStartAnswer = () => {
    setIsAnswering(true);
  };

  const handleNextQuestion = () => {
    setIsAnswering(false);
    setCurrentQuestionIndex((prev) =>
      Math.min(MOCK_QUESTIONS.length - 1, prev + 1),
    );
  };

  return (
    <div className="min-h-screen w-full bg-background-dark px-8 py-10 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-360 items-stretch gap-8">
        <section className="flex flex-1 flex-col justify-center gap-6">
          <div className="w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-md">
            <CameraComponent ref={cameraRef} />
          </div>
          <InfoCard
            variant={MOCK_INFO.variant}
            folderName={MOCK_INFO.folderName}
            date={MOCK_INFO.date}
            companyName={MOCK_INFO.companyName}
            role={MOCK_INFO.role}
          />
        </section>

        <aside className="flex w-105 shrink-0 flex-col gap-6">
          <TimeCard isRunning={true} initialSeconds={252} />
          <SpeedCard status="normal" />

          <QuestionCard
            questions={MOCK_QUESTIONS}
            currentIndex={currentQuestionIndex}
            isAnswering={isAnswering}
            onStartAnswer={handleStartAnswer}
            onNextQuestion={handleNextQuestion}
          />

          <Button
            className="mt-auto bg-secondary-900 text-white hover:bg-secondary-800 active:scale-[0.98] py-6 text-subtitle-02"
            onClick={() => navigate("/interview/report")}
          >
            <div className="flex items-center text-white justify-center gap-2">
              <LogOut className="h-5 w-5" strokeWidth={2.5} />
              <span>면접 종료</span>
            </div>
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default InterviewRecordPage;
