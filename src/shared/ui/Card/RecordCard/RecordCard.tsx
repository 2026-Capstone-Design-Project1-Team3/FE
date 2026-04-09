import type { ButtonHTMLAttributes } from "react";

import { Mic, Users, type LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

type RecordCardVariant = "interview" | "presentation";

const buttonBaseClass =
  "px-4 py-2 rounded-lg text-sm text-white font-medium  bg-gray-600  transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

const varientConfigMap: Record<
  RecordCardVariant,
  { Icon: LucideIcon; iconBg: string }
> = {
  interview: {
    iconBg: "bg-primary-200",
    Icon: Users,
  },
  presentation: {
    iconBg: "bg-secondary-200",
    Icon: Mic,
  },
};

export interface RecordCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  variant: RecordCardVariant;
  title: string;
  button: string;
  date: string;
}

export const RecordCard = ({
  id,
  variant,
  title,
  date,
  button,
  disabled,
}: RecordCardProps) => {
  const { Icon, iconBg } = varientConfigMap[variant];
  return (
    <section
      id={id}
      className={cn(
        "flex items-center gap-4 p-4 mb-3",
        "bg-white border border-gray-100 rounded-2xl shadow-sm",
      )}
    >
      <div className={cn("p-3 rounded-xl", iconBg)}>
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-gray-900 line-clamp-1">
          {title}
        </span>
        <span className="text-sm text-gray-500 line-clamp-1">{date}</span>
      </div>
      <button
        disabled={disabled}
        className={cn(buttonBaseClass, "line-clamp-1 max-w-30")}
      >
        {button}
      </button>
    </section>
  );
};
