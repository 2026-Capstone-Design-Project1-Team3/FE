import { presentationRecords } from "@/mocks/recordPageData";
import { FolderTable } from "@/shared/ui/FolderTable/FolderTable";

export const PresentationRecordPage = () => {
  return (
    <main>
      <div className="min-h-full w-full">
        <div className="mx-auto w-full max-w-6xl px-8 py-12">
          <section className="mb-10">
            <span className="flex gap-2">
              <p className="text-body-01 text-text-secondary mb-7">분석 &gt;</p>
              <p className="text-label-01">발표 연습</p>
            </span>

            <h1 className="text-head-01 text-text-primary">발표 연습 기록</h1>
          </section>

          <FolderTable records={presentationRecords} itemsPerPage={5} />
        </div>
      </div>
    </main>
  );
};
