import { useEffect, useState } from "react";

import { Clock } from "lucide-react";

interface TimerCardProps {
  isRunning: boolean;
  initialSeconds?: number;
}

export const TimeCard = ({ isRunning, initialSeconds = 0 }: TimerCardProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isRunning]);
  const formatTime = (totalSeconds: number) => {
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  return (
    <div className="w-full min-w-60 rounded-2xl border border-border-default bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-label-01 text-text-secondary">진행 시간</span>
        <Clock className="h-6 w-6 text-primary-900" strokeWidth={2.5} />
      </div>
      <div>
        <span className="text-head-01 tracking-tight text-text-primary">
          {formatTime(seconds)}
        </span>
      </div>
    </div>
  );
};

export default TimeCard;
