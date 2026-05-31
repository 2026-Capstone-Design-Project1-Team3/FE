import { Bot, CheckCircle, TrendingUp } from "lucide-react";

interface AIEvaluationCardProps {
  overallReview: string;
  strengths: string[];
  improvements: string[];
}

export const AIEvaluationCard = ({
  overallReview,
  strengths,
  improvements,
}: AIEvaluationCardProps) => {
  return (
    <div className="w-full rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <Bot className="h-7 w-7 pb-1 text-primary-900" strokeWidth={2.5} />
        <h2 className="text-subtitle-01 text-text-primary">
          AI 총평 및 개선 제안
        </h2>
      </div>
      <p className="text-subtitle-02 text-info-02">"{overallReview}"</p>
      <hr className="my-6 border-border-default" />
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle
              className="h-5 w-5 text-primary-900"
              strokeWidth={2.5}
            />
            <h3 className="text-label-01 text-text-primary">강점</h3>
          </div>
          <div className="flex flex-col gap-2">
            {strengths.map((strength, index) => (
              <p key={index} className="text-body-01 text-text-secondary">
                · {strength}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp
              className="h-5 w-5 text-secondary-900"
              strokeWidth={2.5}
            />
            <h3 className="text-label-01 text-text-primary">개선 제안</h3>
          </div>
          <div className="flex flex-col gap-2">
            {improvements.map((improvement, index) => (
              <p key={index} className="text-body-01 text-text-secondary">
                · {improvement}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEvaluationCard;
