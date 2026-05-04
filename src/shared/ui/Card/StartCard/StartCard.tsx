import type { FC } from "react";

import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

export interface StartCardProps {
  bgImage?: string;
  Icon: LucideIcon;
  IconClass?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonClass?: string;
  className?: string;
}

export const StartCard: FC<StartCardProps> = (props) => {
  const {
    bgImage,
    Icon,
    IconClass,
    title,
    description,
    buttonText,
    buttonClass,
    className,
  } = props;
  return (
    <section
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white p-8 transition-all",
        className,
      )}
    >
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to left, black, transparent)",
        }}
      ></div>
      <div
        className={cn(
          "mb-6 flex h-14 w-14 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
          IconClass,
        )}
      >
        <Icon size={28} />
      </div>
      <h3 className="text-head-03 mb-2">{title}</h3>
      <p className="mb-6 leading-relaxed whitespace-pre-wrap text-gray-500">
        {description}
      </p>
      <button
        className={cn(
          "flex cursor-pointer items-center gap-2 transition-all group-hover:gap-4",
          "text-label-01!",
          buttonClass,
        )}
      >
        {buttonText}
        <ArrowRight size={18} />
      </button>
    </section>
  );
};
