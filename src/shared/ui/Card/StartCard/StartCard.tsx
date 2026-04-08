import { Mic, Users, type LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

type StartCardType = "interview" | "presentation";

const typeConfigMap: Record<
  StartCardType,
  { Icon: LucideIcon; iconColor: string; buttonHover: string }
> = {
  interview: {
    iconColor: "text-primary-900",
    Icon: Users,
    buttonHover: "hover:text-primary-900",
  },
  presentation: {
    iconColor: "text-secondary-900",
    Icon: Mic,
    buttonHover: "hover:text-secondary-900",
  },
};

export interface StartCardProps {
  type: StartCardType;
  title: string;
  description: string;
  buttonText: string;
}

export const StartCard = ({
  type,
  title,
  description,
  buttonText,
}: StartCardProps) => {
  const { Icon, iconColor, buttonHover } = typeConfigMap[type];
  return (
    <section
      className={cn(
        "flex flex-col items-center gap-10 p-10",
        "bg-white border border-gray-100 rounded-2xl shadow-sm",
      )}
    >
      <div>
        <Icon className={cn("h-20 w-20", iconColor)} />
      </div>

      <div className="flex flex-col text-center min-w-0">
        <h3 className="text-xl text-gray-900 line-clamp-1 tracking-tight">
          {title}
        </h3>
        <p className=" text-gray-500 line-clamp-2 tracking-tight">
          {description}
        </p>
      </div>
      <button className={cn("text-2xl font-medium", buttonHover)}>
        {buttonText}
      </button>
    </section>
  );
};
