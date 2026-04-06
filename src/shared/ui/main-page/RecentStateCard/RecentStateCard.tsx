import type { FC } from "react";

import { Trophy, Activity } from "lucide-react";

import "@/index.css";

export type RecentStateCardType = {
  type: "점수" | "횟수";
  content: string;
  number: number;
};

interface Props {
  data: RecentStateCardType;
}

// 타입에 따른 설정을 선언적으로 관리
const CARD_THEME = {
  점수: {
    icon: Trophy,
    mainColor: "var(--color-secondary-900)",
    bgColor: "var(--color-secondary-100)",
    unit: "점",
  },
  횟수: {
    icon: Activity,
    mainColor: "var(--color-primary-900)",
    bgColor: "var(--color-primary-100)",
    unit: "회",
  },
} as const;

const RecentStateCard: FC<Props> = ({ data }) => {
  const { type, content, number } = data; // 구조 분해 할당
  const { icon: Icon, mainColor, bgColor, unit } = CARD_THEME[type];

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-white)] p-5 transition-all">
      {/* 장식용 배경 요소 (Accessibility 처리) */}
      <div
        aria-hidden="true"
        className="absolute -right-2 -top-2 h-24 w-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: mainColor }}
      />

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <span className="text-[var(--text-label-03)] font-[var(--text-label-03--font-weight)] text-[var(--color-text-secondary)]">
          {content}
        </span>

        <div
          className="rounded-lg p-2 transition-colors"
          style={{ backgroundColor: bgColor, color: mainColor }}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="relative z-10 flex items-baseline gap-1">
        <span className="text-[var(--text-head-01)] font-[var(--text-head-01--font-weight)] text-[var(--color-text-primary)]">
          {number.toLocaleString()}
        </span>

        <span className="text-[var(--text-subtitle-03)] font-[var(--text-subtitle-03--font-weight)] text-[var(--color-text-deactivated)]">
          {unit}
        </span>
      </div>

      {/* 하단 강조 선 */}
      <div
        className="mt-4 h-1 w-full rounded-full opacity-20"
        style={{ backgroundColor: mainColor }}
      />
    </div>
  );
};

export default RecentStateCard;
