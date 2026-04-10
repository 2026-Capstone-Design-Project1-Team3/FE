import { cn } from "@/utils/cn";

export interface StatsCardProps {
  title: string;
  score: number | string;
  unit?: string; // 단위: %, 점, 개 등
  description?: string;
  className?: string;
}

export const StatsCard = ({
  title,
  score,
  unit,
  description,
  className,
}: StatsCardProps) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 p-6 rounded-2xl border bg-white shadow-sm min-w-40 max-w-70",
        className,
      )}
    >
      <h3 className="text-sm font-medium  tracking-tight">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight">{score}</span>
        <span className="text-sm font-medium ">{unit}</span>
      </div>
      {description && <p className="text-xs  mt-1">{description}</p>}
    </section>
  );
};
