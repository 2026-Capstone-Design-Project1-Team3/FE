import type { CSSProperties } from "react";

import { Mic, Users, ChevronRight } from "lucide-react";

export interface StartCardProps {
  type: "발표" | "면접";
  subtext: string;
}

// 1. 테마 설정을 컴포넌트 외부 상수로 분리 (렌더링 시 재계산 방지)
const THEME_CONFIG = {
  발표: {
    colorKey: "primary",
    Icon: Mic,
  },
  면접: {
    colorKey: "secondary",
    Icon: Users,
  },
} as const;

export default function StartCard({ type, subtext }: StartCardProps) {
  const { colorKey, Icon } = THEME_CONFIG[type];

  // 2. CSS 변수를 한곳에서 관리 (JS 핸들러 제거)
  const cardStyle = {
    "--theme-900": `var(--color-${colorKey}-900)`,
    "--theme-50": `var(--color-${colorKey}-50)`,
    "--theme-400": `var(--color-${colorKey}-400)`,
    "--icon-bg": `var(--color-${colorKey}-50)`, // 투명도는 클래스에서 처리 권장
  } as CSSProperties;

  return (
    <div
      className="group cursor-default flex h-80 w-64 flex-col items-center justify-between rounded-2xl border border-[var(--color-border-deactivated)] bg-[var(--color-white)] p-6 shadow-lg transition-all hover:border-[var(--theme-400)] hover:shadow-xl"
      style={cardStyle}
    >
      {/* 아이콘 영역: bg-opacity 대신 변수 활용 */}
      <div className="mb-4 mt-6 rounded-full bg-[var(--theme-50)] p-5 transition-transform group-hover:scale-110">
        <Icon size={48} className="text-[var(--theme-900)]" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex w-full flex-grow items-start justify-center overflow-hidden">
        <p className="line-clamp-4 px-2 text-center text-[var(--color-text-secondary)] text-[var(--text-body-02)] font-[var(--text-body-02--font-weight)] leading-[var(--text-body-02--line-height)]">
          {subtext}
        </p>
      </div>

      {/* 액션 버튼 영역 */}
      <button
        type="button"
        className="group/btn mb-2 mt-4 flex shrink-0 cursor-pointer items-center gap-1 text-[var(--color-text-primary)] text-[var(--text-label-01)] font-[var(--text-label-01--font-weight)] transition-colors hover:text-[var(--theme-900)]"
      >
        <span>{type} 시작하기</span>
        <ChevronRight
          size={20}
          strokeWidth={3}
          className="transition-transform group-hover/btn:translate-x-1"
        />
      </button>
    </div>
  );
}
