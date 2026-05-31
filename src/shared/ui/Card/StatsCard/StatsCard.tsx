import type { ComponentType, ReactNode, SVGProps } from "react";

import { cn } from "@/utils/cn";

export interface StatsCardProps {
  title: string;
  score: number | string;
  unit?: string; // 단위: %, 점, 개 등
  description?: string;
  gap?: string;
  chart?: ReactNode;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const StatsCard = ({
  title,
  score,
  unit,
  description,
  gap,
  chart,
  Icon,
  className,
}: StatsCardProps) => {
  return (
    <section
      className={cn(
        "flex min-h-64 min-w-40 flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium tracking-tight text-text-secondary">
          {title}
        </h3>
        {Icon ? (
          <Icon
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-text-tertiary"
          />
        ) : null}
      </div>

      <div className="mb-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-success-01">
          {score}
        </span>
        {unit ? <span className="text-sm font-medium">{unit}</span> : null}
      </div>

      {gap ? <p className="text-caption-01 text-text-tertiary">{gap}</p> : null}

      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}

      {chart}
    </section>
  );
};
