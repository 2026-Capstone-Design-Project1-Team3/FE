import type { FC } from "react";

import { type LucideIcon, MessagesSquare, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

type RecordTableRowVariant = "interview" | "presentation";

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

export interface RecordTableRowProps {
  analysisId: string;
  variant: RecordTableRowVariant;
  title?: string;
  createdAt?: string;
  folderTitle?: string;
}

export const RecordTableRow: FC<RecordTableRowProps> = (props) => {
  const { analysisId, variant, title, createdAt, folderTitle } = props;
  const navigate = useNavigate();
  const { Icon, Color, Text } = variantConfigMap[variant];
  const reportPath = `/${variant}/report`;

  const handleReportClick = () => {
    navigate(reportPath, {
      state: {
        analysisId,
        folderTitle: folderTitle ?? title,
        variant,
      },
    });
  };

  return (
    <tr key={analysisId}>
      <td className="p-0">
        <div className="flex items-center justify-between gap-2 p-5">
          <div className="text-body-01 flex items-center gap-3 text-text-primary">
            <span className={cn("rounded-lg p-4", Color)}>
              <Icon size={21} />
            </span>
            <div>
              <p className="text-body-01 line-clamp-1">{title}</p>
              <div className="flex items-center gap-1 text-text-deactivated">
                <span className={cn(Color, "bg-background-light")}>{Text}</span>
                <span>•</span>
                <span className="text-body-03">{createdAt}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReportClick}
            className="text-label-04 min-w-25 cursor-pointer rounded-xl border border-primary-700 p-2 text-primary-700 hover:bg-primary-700 hover:text-white"
          >
            리포트 보기
          </button>
        </div>
      </td>
    </tr>
  );
};
