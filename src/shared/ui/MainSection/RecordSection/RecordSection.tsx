import { useEffect, useState } from "react";

import { ChevronRight } from "lucide-react";

import { MOCK_RECORDS } from "@/mocks/recordData";
import {
  RecordTableRow,
  type RecordTableRowProps,
} from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

interface RecordSectionProps {
  initialData?: RecordTableRowProps[];
  className?: string;
}

export const RecordSection = ({
  initialData = MOCK_RECORDS,
  className,
}: RecordSectionProps) => {
  const [records, setRecords] = useState<RecordTableRowProps[]>(initialData);

  useEffect(() => {
    setRecords(initialData);
  }, [initialData]);

  return (
    <section className={className}>
      <div className="mb-4 flex justify-between">
        <div>
          <h2 className="text-head-03">최근 연습 기록</h2>
        </div>

        <button className="text-label-04 -mb-2 flex min-w-20 cursor-pointer items-center gap-1 text-gray-400 transition-all hover:gap-2 hover:text-gray-800">
          전체 보기
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="rounded-2xl border border-gray-300 bg-white">
        <table className="w-full">
          <tbody className="divide-y divide-gray-300">
            {records.length > 0 ? (
              records.map((record) => (
                <RecordTableRow
                  folderId={record.folderId}
                  variant={record.variant}
                  title={record.title || "제목 없음"}
                  createAt={record.createAt || "--"}
                />
              ))
            ) : (
              <td colSpan={3} className="py-40 text-center text-gray-400">
                기록이 없습니다.
              </td>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
