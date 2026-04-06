import type { CSSProperties } from "react";

import { Mic, Users } from "lucide-react";

export type RecentRecordCardType = {
  type: "면접" | "발표";
  name: string;
  time: Date | string;
  score: number;
};

interface RecentRecordCardProps {
  data: RecentRecordCardType;
}

const TYPE_CONFIG = {
  면접: {
    Icon: Users,
    theme: "secondary",
  },
  발표: {
    Icon: Mic,
    theme: "primary",
  },
} as const;

const formatDate = (inputTime: Date | string): string => {
  const dateObj =
    typeof inputTime === "string" ? new Date(inputTime) : inputTime;
  if (isNaN(dateObj.getTime())) return "날짜 없음";

  return dateObj.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function RecentRecordCard({ data }: RecentRecordCardProps) {
  const { type, name, time, score } = data;
  const { Icon, theme } = TYPE_CONFIG[type];

  const formattedDate = formatDate(time);
  const validatedScore = Math.min(Math.max(score, 0), 100);

  // 2. 테마 스타일 상수화 (CSS 변수명 가독성 개선)
  const themeStyles = {
    bg: `var(--color-${theme}-100)`,
    point: `var(--color-${theme}-700)`,
    dark: `var(--color-${theme}-900)`,
    border: `var(--color-${theme}-200)`,
  };

  return (
    <div
      className="group flex w-full items-center justify-between rounded-lg border border-[var(--color-border-default)] bg-[var(--color-white)] p-4 transition-all hover:shadow-md hover:border-[var(--hover-border-color)]"
      // 3. 커스텀 속성(CSS Variable)을 직접 전달하여 <style jsx> 오류 해결
      style={
        {
          "--hover-border-color": themeStyles.point,
        } as CSSProperties
      }
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors group-hover:opacity-80"
          style={{ backgroundColor: themeStyles.bg }}
        >
          <Icon size={24} style={{ color: themeStyles.dark }} />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-[var(--text-subtitle-03)] font-[var(--text-subtitle-03--font-weight)] text-[var(--color-text-primary)]">
            {name}
          </h4>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[var(--text-label-05)] font-[var(--text-label-05--font-weight)] transition-colors"
              style={{
                backgroundColor: themeStyles.bg,
                color: themeStyles.dark,
                borderColor: themeStyles.border,
              }}
            >
              {type}
            </span>

            <span className="text-[var(--text-caption-02)] text-[var(--color-text-deactivated)]">
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end">
        <span className="text-[var(--text-label-05)] font-[var(--text-label-05--font-weight)] uppercase tracking-tighter text-[var(--color-text-placeholder)]">
          Score
        </span>
        <div className="flex items-baseline">
          <span
            className="text-[var(--text-head-03)] font-[var(--text-head-03--font-weight)]"
            style={{ color: themeStyles.dark }}
          >
            {validatedScore}
          </span>
          <span
            className="ml-0.5 text-[var(--text-subtitle-05)] font-[var(--text-subtitle-05--font-weight)]"
            style={{ color: themeStyles.point }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  );
}
