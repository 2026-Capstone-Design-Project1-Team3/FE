import { MessageCircleMore } from "lucide-react";

interface AnswerCardProps {
  percentage: number;
  subtitle: string;
  description: string;
}
export const AnswerCard = ({
  percentage,
  subtitle,
  description,
}: AnswerCardProps) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="w-full rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <MessageCircleMore
          className="h-7 w-7 pb-1 text-primary-900"
          strokeWidth={2.5}
        />
        <h2 className="text-subtitle-01 text-text-primary">답변 적절성 분석</h2>
      </div>
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex shrink-0 items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg
              className="h-full w-full -rotate-90 transform"
              viewBox="0 0 48 48"
            >
              <circle
                className="text-gray-200"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="24"
                cy="24"
              />
              <circle
                className="text-primary-900 transition-all duration-500 ease-out"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="24"
                cy="24"
              />
            </svg>
            <span className="absolute text-label-01 text-text-primary">
              {percentage}점
            </span>
          </div>
          <span className="text-head-03 text-text-primary">{subtitle}</span>
        </div>
        <p className="text-right text-body-01 text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
};
export default AnswerCard;
