import type { ReactNode } from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

export interface StatsCardProps {
  title: string;
  Icon: LucideIcon;
  score: number | string;
  unit?: string; // 단위: %, 점, 개 등
  gap?: string;
  chart?: ReactNode;
  className?: string;
}

export const StatsCard = ({
  title,
  Icon,
  score,
  unit,
  gap,
  chart,
  className,
}: StatsCardProps) => {
  return (
    <section
      className={cn(
        "flex min-h-52 min-w-80 flex-col gap-2 rounded-xl border border-border-default bg-background-light p-7 shadow-sm",
        className,
      )}
    >
      <span className="flex items-center justify-between">
        <h3 className="text-body-03 text-text-tertiary">{title}</h3>
        <Icon size={21} className="text-primary-800" />
      </span>

      <div className="flex items-baseline gap-2">
        <h1 className="text-head-02 text-text-secondary">
          {score}
          {unit}
        </h1>
        <p className="text-body-03 text-primary-800">{gap}</p>
      </div>
      {chart}
    </section>
  );
};
