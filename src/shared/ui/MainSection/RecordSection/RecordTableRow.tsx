import type { FC } from "react";

import { type LucideIcon, MessagesSquare, FileText } from "lucide-react";

import { cn } from "@/utils/cn";

type RecordTableRowVariant = "interview" | "presentation";

const variantConfigMap: Record<
  RecordTableRowVariant,
  { Icon: LucideIcon; Color: string; Text: string }
> = {
  interview: {
    Icon: MessagesSquare,
    Color: "text-primary-800 bg-primary-800/20",
    Text: "면접",
  },
  presentation: {
    Icon: FileText,
    Color: "text-secondary-800 bg-secondary-800/20",
    Text: "발표",
  },
};

export interface RecordTableRowProps {
  folderId: string;
  variant: RecordTableRowVariant;
  title?: string;
  createAt?: string;
}

export const RecordTableRow: FC<RecordTableRowProps> = (props) => {
  const { folderId, variant, title, createAt } = props;
  const { Icon, Color, Text } = variantConfigMap[variant];
  return (
    <tr key={folderId}>
      <div className="flex items-center justify-between gap-2 p-5">
        <div className="text-body-01 flex items-center gap-3 text-gray-900">
          <span className={cn("rounded-lg p-4", Color)}>
            <Icon size={21} />
          </span>
          <div>
            <p className="text-body-01 line-clamp-1">{title}</p>
            <span className="flex items-center gap-1 text-gray-400">
              <p className={cn(Color, "bg-white")}>{Text}</p>
              <p className="">•</p> <p className="text-body-03">{createAt}</p>
            </span>
          </div>
        </div>
        <button className="text-primary-700 border-primary-700 hover:bg-primary-700 min-w-25 cursor-pointer rounded-xl border p-2 hover:text-white">
          리포트 보기
        </button>
      </div>
    </tr>
  );
};
