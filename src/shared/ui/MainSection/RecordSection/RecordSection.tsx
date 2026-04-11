import { useEffect, useState } from "react";

import { MOCK_RECORDS } from "@/mocks/recordData";
import {
  RecordCard,
  type RecordCardProps,
} from "@/shared/ui/Card/RecordCard/RecordCard";

interface RecordSectionProps {
  initialData?: RecordCardProps[];
}

export const RecordSection = ({
  initialData = MOCK_RECORDS,
}: RecordSectionProps) => {
  const [IsUploading, setIsUploading] = useState(false);
  const [records, setRecords] = useState<RecordCardProps[]>(initialData);

  //임시로 설정
  useEffect(() => {
    setIsUploading(false);
  }, []);

  useEffect(() => {
    setRecords(initialData);
  }, [initialData]);

  return (
    <section className="flex flex-col gap-1 px-50 py-20 bg-white w-full min-h-120">
      <header className="w-20 pb-5 text-subtitle-01 ">최근 기록</header>
      {records.length > 0 ? (
        records.map((record) => (
          <RecordCard
            folderId={record.folderId}
            variant={record.variant}
            title={record.title || "제목 없음"}
            description={record.description || "상세 설명이 없습니다."}
            createAt={record.createAt || "-"}
            children={IsUploading ? "업로드 중" : "상세보기"}
            disabled={IsUploading}
            className="min-w-xl"
          />
        ))
      ) : (
        <div className="flex flex-1 items-center justify-center text-gray-400">
          기록이 없습니다.
        </div>
      )}
    </section>
  );
};
