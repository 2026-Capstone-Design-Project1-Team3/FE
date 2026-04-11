import type { ButtonHTMLAttributes } from "react";

import { Mic, Users, type LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

type RecordCardVariant = "interview" | "presentation";

const buttonBaseClass =
  "px-4 py-2 rounded-lg text-caption-01 text-white  bg-gray-600  transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

const variantConfigMap: Record<
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
  folderId: string;
  variant: RecordCardVariant;
  title: string;
  description: string;
  createAt: string;
}

export const RecordCard = ({
  folderId,
  variant,
  title,
  description,
  createAt,
  children,
  disabled,
  className,
}: RecordCardProps) => {
  const { Icon, iconBg } = variantConfigMap[variant];
  return (
    <section
      id={folderId}
      className={cn(
        "flex items-center gap-4 p-4 mb-3",
        "bg-white border border-gray-100 rounded-2xl shadow-sm",
        className,
      )}
    >
      <div className={cn("p-3 rounded-xl", iconBg)}>
        <Icon className="w-5 h-5 text-gray-700" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-subtitle-03 text-gray-900 line-clamp-1">
          {title}
        </span>
        <span className="text-body-03 text-gray-900 line-clamp-1">
          {description}
        </span>
        <span className="text-caption-01 text-gray-500 line-clamp-1">
          {createAt}
        </span>
      </div>
      <button
        disabled={disabled}
        className={cn(buttonBaseClass, "line-clamp-1 max-w-30")}
      >
        {children}
      </button>
    </section>
  );
};
