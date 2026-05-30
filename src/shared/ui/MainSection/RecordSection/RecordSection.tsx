import { useCardNewsQuery } from "@/features/analysis/model/useCardNewsQuery";
import { RecordTableRow } from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

interface RecordSectionProps {
  filterVariant?: "interview" | "presentation";
  count?: number;
  className?: string;
}

export const RecordSection = ({
  filterVariant,
  count = 5,
  className,
}: RecordSectionProps) => {
  const token = localStorage.getItem("accessToken");

  const reqType =
    filterVariant === "presentation"
      ? 0
      : filterVariant === "interview"
        ? 1
        : undefined;

  const { data, isLoading, isError } = useCardNewsQuery({
    params: {
      limit: count,
      how: 0,
      type: reqType,
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <section className={className}>
        <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-text-deactivated">
          기록을 불러오는 중입니다...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={className}>
        <div className="rounded-2xl border border-border-default bg-background-light p-10 text-center text-red-500">
          기록을 불러오는데 실패했습니다.
        </div>
      </section>
    );
  }

  const recentRecords = data?.cardnews || [];

  return (
    <section className={className}>
      <div className="rounded-2xl border border-border-default bg-background-light">
        <table className="w-full">
          <tbody className="divide-y divide-border-default">
            {recentRecords.length > 0 ? (
              recentRecords.map((record) => (
                <RecordTableRow
                  key={record.analysisId}
                  analysisId={record.analysisId}
                  title={record.title || "제목 없음"}
                  createdAt={record.createdAt}
                  variant={record.type === 0 ? "presentation" : "interview"}
                />
              ))
            ) : (
              <tr>
                <td className="text-body-01 py-40 text-center text-text-deactivated">
                  아직 연습 기록이 없습니다. 새로운 연습을 시작해 보세요!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
