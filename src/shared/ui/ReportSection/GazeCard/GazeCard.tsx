import { Eye } from "lucide-react";

interface GazeCardProps {
  percentage: number;
  subtitle: string;
  description: string;
}

export const GazeCard = ({
  percentage,
  subtitle,
  description,
}: GazeCardProps) => {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <Eye className="h-7 w-7 pb-1 text-primary-900" strokeWidth={2.5} />
        <h2 className="text-subtitle-01 text-text-primary">
          시선 처리 데이터 분석
        </h2>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-3">
          <span className="text-head-02 text-text-primary">{percentage}%</span>
          <span className="text-label-01 text-text-tertiary">{subtitle}</span>
        </div>
        <div className="mb-4 mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary-900 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-body-01 text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default GazeCard;
