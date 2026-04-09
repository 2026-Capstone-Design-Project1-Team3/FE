import { cn } from "@/utils/cn";

export interface StateCardProps {
  title: string;
  score: number;
  unit: string; // 단위: %, 점, 개 등
  description?: string;
  className?: string;
}

export const StateCard = ({
  title,
  score,
  unit,
  description,
  className,
}: StateCardProps) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-2 p-6 rounded-2xl border bg-white shadow-sm",
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
