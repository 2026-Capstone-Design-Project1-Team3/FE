import { Gauge } from "lucide-react";

interface SpeechCardProps {
  score: string;
  scoreSubtitle: string;
  wpm: string;
  wpmSubtitle: string;
  description: string;
}

export const SpeechCard = ({
  score,
  scoreSubtitle,
  wpm,
  wpmSubtitle,
  description,
}: SpeechCardProps) => {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <Gauge className="h-7 w-7 pb-1 text-primary-900" strokeWidth={2.5} />
        <h2 className="text-subtitle-01 text-text-primary">
          발화 속도 데이터 분석
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-8">
          <div className="flex items-baseline gap-2">
            <span className="text-head-02 text-text-primary">{score}</span>
            <span className="text-label-01 text-text-tertiary">
              {scoreSubtitle}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-head-02 text-text-primary">{wpm}</span>
            <span className="text-label-01 text-text-tertiary">
              {wpmSubtitle}
            </span>
          </div>
        </div>
        <p className="text-body-01 text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default SpeechCard;
