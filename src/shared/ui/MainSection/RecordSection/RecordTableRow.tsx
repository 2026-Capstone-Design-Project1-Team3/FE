import type { FC } from "react";

import { ArrowRight } from "lucide-react";

import { cn } from "@/utils/cn";

type RecordTableRowVariant = "interview" | "presentation";

const variantConfigMap: Record<RecordTableRowVariant, { BgColor: string }> = {
  interview: {
    BgColor: "bg-primary-200",
  },
  presentation: {
    BgColor: "bg-secondary-200",
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
  const { BgColor } = variantConfigMap[variant];
  return (
    <tr key={folderId}>
      <td className="text-body-01 max-w-150 py-6 pr-5 text-gray-900">
        {title}
      </td>
      <td className="pr-6">
        <span
          className={cn(
            "text-body-02 rounded-full px-3 py-1 text-gray-700",
            BgColor,
          )}
        >
          {variant}
        </span>
      </td>
      <td className="max-w-25 text-black">{createAt}</td>
      <td>
        <button className="group cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-white">
          <ArrowRight
            size={16}
            className="transition-transform duration-100 group-hover:-rotate-45"
          />
        </button>
      </td>
    </tr>
  );
};
