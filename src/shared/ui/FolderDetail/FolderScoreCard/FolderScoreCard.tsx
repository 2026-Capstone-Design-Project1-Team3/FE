import type { FC } from "react";

export interface FolderScoreCardProps {
  title: string;
  score: number;
  delta: string;
}

export const FolderScoreCard: FC<FolderScoreCardProps> = ({
  title,
  score,
  delta,
}) => {
  return (
    <section className="border-border-default bg-background-light flex min-h-60 flex-col rounded-xl border px-7 py-6">
      <h2 className="text-label-01 text-text-secondary">{title}</h2>

      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <div className="border-primary-900 flex size-28 items-center justify-center rounded-full border-3">
          <strong className="text-head-01 text-primary-900">{score}</strong>
        </div>
        <p className="text-body-01 text-text-secondary">
          지난 세션 대비
          <span className="text-secondary-900 text-label-01">{delta}</span> 향상
        </p>
      </div>
    </section>
  );
};
