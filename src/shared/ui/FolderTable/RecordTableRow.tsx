import type { FC } from "react";

import { FolderOpen, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

type RecordTableRowVariant = "interview" | "presentation";

const variantIconColorMap: Record<RecordTableRowVariant, string> = {
  interview: "bg-primary-100 text-primary-800",
  presentation: "bg-secondary-100 text-secondary-900",
};

const cellClass =
  "bg-background-light group-hover:bg-gray-50 group-focus-visible:bg-gray-50 px-6 py-5 transition-colors";

export interface RecordTableRowProps {
  folderId: string;
  variant: RecordTableRowVariant;
  title?: string;
  subTitle?: string;
  createAt?: string;
  videoCount?: number;
}

export const RecordTableRow: FC<RecordTableRowProps> = ({
  folderId,
  variant,
  title,
  subTitle,
  createAt,
  videoCount = 0,
}) => {
  const navigate = useNavigate();
  const iconColor = variantIconColorMap[variant];
  const titleText = title || "제목 없음";

  const handleNavigate = () => {
    navigate(`/report/${variant}/${folderId}`, {
      state: {
        folderTitle: titleText,
        variant,
      },
    });
  };

  return (
    <tr
      key={folderId}
      aria-label={`${titleText} 폴더 상세 보기`}
      onClick={handleNavigate}
      className="group cursor-pointer outline-none"
    >
      <td className={cellClass}>
        <div className="flex items-center gap-4">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg",
              iconColor,
            )}
          >
            <FolderOpen size={22} strokeWidth={2.25} />
          </span>
          <div className="min-w-0">
            <p className="text-body-01 text-text-primary line-clamp-1">
              {titleText}
            </p>
            {subTitle ? (
              <p className="text-body-03 text-text-deactivated line-clamp-1">
                {subTitle}
              </p>
            ) : null}
          </div>
        </div>
      </td>
      <td
        className={cn(
          cellClass,
          "text-body-01 text-text-secondary text-center",
        )}
      >
        {createAt || "--"}
      </td>
      <td
        className={cn(cellClass, "text-body-02 text-text-secondary text-right")}
      >
        <span className="inline-flex items-center justify-end gap-1">
          <Images size={18} strokeWidth={2} />
          {videoCount}개의 영상
        </span>
      </td>
    </tr>
  );
};
