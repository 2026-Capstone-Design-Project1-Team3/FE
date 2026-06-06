import type { FC } from "react";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

export interface FolderStatisticCardProps {
  title: string;
  description: string;
  score: number;
  Icon: LucideIcon;
  color: string;
  bar: string;
}

export const FolderStatisticCard: FC<FolderStatisticCardProps> = ({
  Icon,
  bar,
  color,
  description,
  score,
  title,
}) => {
  return (
    <article className="rounded-2xl border border-border-default bg-background-light p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-label-01 text-text-secondary">{title}</h3>
          <p className="text-body-03 text-text-deactivated mt-1">
            {description}
          </p>
        </div>
        <Icon className={cn("size-6", color)} strokeWidth={2.25} />
      </div>
      <div className="mt-7 flex items-center gap-1">
        <strong className={cn("text-head-01", color)}>{score}</strong>
        <span className="text-body-02 text-text-deactivated">점</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-border-default">
        <div
          className={cn("h-full rounded-full", bar)}
          style={{ width: `${score}%` }}
        />
      </div>
    </article>
  );
};
