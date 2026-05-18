import { useEffect, useState } from "react";

import { mockRecords } from "@/mocks/mainRecordData";
import {
  RecordTableRow,
  type RecordTableRowProps,
} from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

interface RecordSectionProps {
  initialData?: RecordTableRowProps[];
  filterVariant?: RecordTableRowProps["variant"];
  count?: number;
  className?: string;
}

export const RecordSection = ({
  initialData = mockRecords,
  filterVariant,
  count = 5,
  className,
}: RecordSectionProps) => {
  const [records, setRecords] = useState<RecordTableRowProps[]>(initialData);
  const filteredRecords = filterVariant
    ? records.filter((record) => record.variant === filterVariant)
    : records;
  const recentRecords = filteredRecords.slice(0, count);

  useEffect(() => {
    setRecords(initialData);
  }, [initialData]);

  return (
    <section className={className}>
      <div className="rounded-2xl border border-border-default bg-background-light">
        <table className="w-full">
          <tbody className="divide-y divide-border-default">
            {recentRecords.length > 0 ? (
              recentRecords.map((record) => (
                <RecordTableRow
                  key={record.folderId}
                  {...record}
                  title={record.title || "제목 없음"}
                  createAt={record.createAt || "--"}
                />
              ))
            ) : (
              <tr>
                <td className="text-body-02 py-40 text-center text-text-deactivated">
                  기록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
