import type { FC } from "react";

import { type LucideIcon, MessagesSquare, FileText } from "lucide-react";

import { cn } from "@/utils/cn";

type RecordTableRowVariant = "interview" | "presentation";
type RecordType = 0 | 1;

interface RecordAnalysis {
  gazeScore?: number;
  gazeDistribution?: {
    screen: number;
    camera: number;
  };
  fluencyLevel?: 0 | 1 | 2;
  speedScore?: number;
  speedDistribution?: {
    fast: number;
    optimal: number;
    slow: number;
  };
  speedFeedback?: string;
  finalScore?: number;
  type?: RecordType;
}

const variantConfigMap: Record<
  RecordTableRowVariant,
  { Icon: LucideIcon; Color: string; Text: string }
> = {
  interview: {
    Icon: MessagesSquare,
    Color: "text-primary-800 bg-primary-100",
    Text: "면접",
  },
  presentation: {
    Icon: FileText,
    Color: "text-secondary-900 bg-secondary-100",
    Text: "발표",
  },
};

export interface RecordTableRowProps extends RecordAnalysis {
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
        <div className="text-body-01 flex items-center gap-3 text-text-primary">
          <span className={cn("rounded-lg p-4", Color)}>
            <Icon size={21} />
          </span>
          <div>
            <p className="text-body-01 line-clamp-1">{title}</p>
            <span className="flex items-center gap-1 text-text-deactivated">
              <p className={cn(Color, "bg-background-light")}>{Text}</p>
              <p className="">•</p> <p className="text-body-03">{createAt}</p>
            </span>
          </div>
        </div>
        <button className="text-label-04 min-w-25 cursor-pointer rounded-xl border border-primary-700 p-2 text-primary-700 hover:bg-primary-700 hover:text-text-inverse">
          리포트 보기
        </button>
      </div>
    </tr>
  );
};
