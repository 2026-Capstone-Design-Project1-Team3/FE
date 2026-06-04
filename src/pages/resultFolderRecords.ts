import type { FolderInfo } from "@/entities/folder/model/types";
import type { RecordTableRowProps } from "@/shared/ui/FolderTable/RecordTableRow";

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join(".");
};

export const toFolderRecords = (
  folders: FolderInfo[] = [],
  variant: RecordTableRowProps["variant"],
): RecordTableRowProps[] =>
  folders.map(({ folderId, title, totalAnalyses, updatedAt }) => ({
    folderId,
    variant,
    title,
    createAt: formatDate(updatedAt),
    videoCount: totalAnalyses,
  }));
