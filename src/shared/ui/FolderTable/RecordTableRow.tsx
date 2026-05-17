import type { FC } from "react";

import { FolderOpen, Images } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

interface RecordAnalysis {
  videoCount?: number;
}

type RecordTableRowVariant = "interview" | "presentation";

const variantIconColorMap: Record<RecordTableRowVariant, string> = {
  interview: "bg-primary-100 text-primary-800",
  presentation: "bg-secondary-100 text-secondary-900",
};

export interface RecordTableRowProps extends RecordAnalysis {
  folderId: string;
  variant: RecordTableRowVariant;
  title?: string;
  subTitle?: string;
  createAt?: string;
}

export const RecordTableRow: FC<RecordTableRowProps> = (props) => {
  const {
    folderId,
    variant,
    title,
    subTitle,
    createAt,
    videoCount = 0,
  } = props;
  const navigate = useNavigate();
  const detailPath = `/report/${variant}/${folderId}`;
  const iconColor = variantIconColorMap[variant];

  const handleNavigate = () => {
    navigate(detailPath, {
      state: {
        folderTitle: title || "제목 없음",
        variant,
      },
    });
  };

  return (
    <tr
      key={folderId}
      aria-label={`${title || "제목 없음"} 폴더 상세 보기`}
      onClick={handleNavigate}
      className="group cursor-pointer outline-none"
    >
      <td className="border-border-default bg-background-light group-hover:bg-primary-900/10 group-focus-visible:bg-primary-50 rounded-l-xl border-y border-l px-6 py-5 transition-colors">
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
              {title || "제목 없음"}
            </p>
            {subTitle ? (
              <p className="text-body-03 text-text-deactivated line-clamp-1">
                {subTitle}
              </p>
            ) : null}
          </div>
        </div>
      </td>
      <td className="text-body-01 border-border-default bg-background-light text-text-secondary group-hover:bg-primary-900/10 group-focus-visible:bg-primary-50 border-y px-6 py-5 text-center transition-colors">
        {createAt || "--"}
      </td>
      <td className="text-body-02 border-border-default bg-background-light text-text-secondary group-hover:bg-primary-900/10 group-focus-visible:bg-primary-50 rounded-r-xl border-y border-r px-6 py-5 text-right transition-colors">
        <span className="inline-flex items-center justify-end gap-1">
          <Images size={18} strokeWidth={2} />
          {videoCount}개의 영상
        </span>
      </td>
    </tr>
  );
};
