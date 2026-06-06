import { ChevronRight, Mic } from "lucide-react";

import { Button } from "@/shared/ui/Button/Button";

interface QuestionCardProps {
  questions: string[];
  currentIndex: number;
  isAnswering: boolean;
  onStartAnswer: () => void;
  onNextQuestion: () => void;
}

export const QuestionCard = ({
  questions,
  currentIndex,
  isAnswering,
  onStartAnswer,
  onNextQuestion,
}: QuestionCardProps) => {
  if (!questions || questions.length === 0) return null;

  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border-default bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-subtitle-01 text-text-primary">현재 질문</span>
        <div className="rounded-full bg-primary-100 px-3 py-1">
          <span className="text-label-01 text-primary-900">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className="mb-6 flex min-h-35 items-center justify-center rounded-xl border border-border-deactivated bg-background-dark px-8 py-6">
        <p className="text-center text-subtitle-02 text-text-primary">
          {questions[currentIndex]}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          onClick={onStartAnswer}
          disabled={isAnswering}
        >
          <div className="flex items-center gap-2">
            <Mic
              className={isAnswering ? "h-5 w-5 animate-pulse" : "h-5 w-5"}
            />
            <span>{isAnswering ? "답변 중..." : "답변하기"}</span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={onNextQuestion}
          disabled={isLastQuestion}
        >
          <div className="flex items-center gap-2">
            <span>
              {isLastQuestion ? "마지막 질문" : "다음 질문으로 넘어가기"}
            </span>
            <ChevronRight className="h-5 w-5" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
