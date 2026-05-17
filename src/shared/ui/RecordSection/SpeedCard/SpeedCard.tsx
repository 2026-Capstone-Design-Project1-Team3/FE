import { Gauge } from "lucide-react";

export type SpeedStatus = "slow" | "normal" | "fast";

interface SpeedCardProps {
  status: SpeedStatus;
}

const SPEED_DATA = {
  slow: {
    label: "Slow",
    color: "bg-warning-01",
    description:
      "현재 말하기 속도가 다소 느린 편입니다. 조금 더 빠르게 말해보세요.",
  },
  normal: {
    label: "Normal",
    color: "bg-success-01",
    description: "현재 매우 안정적인 속도로 말하고 있습니다.",
  },
  fast: {
    label: "Fast",
    color: "bg-error-01",
    description: "말하기 속도가 다소 빠릅니다. 조금 더 천천히 말해 보세요.",
  },
};

export const SpeedCard = ({ status }: SpeedCardProps) => {
  const data = SPEED_DATA[status];
  return (
    <div className="w-full rounded-2xl border border-border-default bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-subtitle-01 text-text-secondary">
          말하기 속도
        </span>
        <Gauge className="h-6 w-6 text-primary-900" strokeWidth={2.5} />
      </div>
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="flex w-full gap-2 px-2">
          <div
            className={`h-2.5 flex-1 rounded-full ${status === "slow" ? data.color : "bg-gray-100"}`}
          />
          <div
            className={`h-2.5 flex-1 rounded-full ${status === "normal" ? data.color : "bg-gray-100"}`}
          />
          <div
            className={`h-2.5 flex-1 rounded-full ${status === "fast" ? data.color : "bg-gray-100"}`}
          />
        </div>
        <div className="flex w-full gap-2 px-2">
          <span
            className={`flex-1 text-center ${status === "slow" ? "text-label-01 text-text-primary" : "text-label-02 text-text-tertiary"}`}
          >
            Slow
          </span>
          <span
            className={`flex-1 text-center ${status === "normal" ? "text-label-01 text-text-primary" : "text-label-02 text-text-tertiary"}`}
          >
            Normal
          </span>
          <span
            className={`flex-1 text-center ${status === "fast" ? "text-label-01 text-text-primary" : "text-label-02 text-text-tertiary"}`}
          >
            Fast
          </span>
        </div>
      </div>
      <p className="text-center text-body-01 text-text-primary">
        {data.description}
      </p>
    </div>
  );
};

export default SpeedCard;
