import { AudioWaveform } from "lucide-react";

interface FluencyCardProps {
  status: string;
  subtitle: string;
  description: string;
}

export const FluencyCard = ({
  status,
  subtitle,
  description,
}: FluencyCardProps) => {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <AudioWaveform
          className="h-7 w-7 pb-1 text-primary-900"
          strokeWidth={2.5}
        />
        <h2 className="text-subtitle-01 text-text-primary">발화 유창성 분석</h2>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <span className="text-head-02 text-success-01">{status}</span>
          <span className="text-label-01 text-text-tertiary">{subtitle}</span>
        </div>
        <p className="text-body-01 text-text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default FluencyCard;
