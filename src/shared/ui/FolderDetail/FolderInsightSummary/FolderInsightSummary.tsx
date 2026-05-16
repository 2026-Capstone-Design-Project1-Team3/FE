import type { FC } from "react";

import { Sparkles } from "lucide-react";

interface InsightItem {
  label: string;
  title: string;
  description: string;
  tone: "positive" | "growth";
}

export interface FolderInsightSummaryProps {
  insights: InsightItem[];
}

export const FolderInsightSummary: FC<FolderInsightSummaryProps> = ({
  insights,
}) => {
  return (
    <section className="border-secondary-900 bg-background-light rounded-xl border px-6 py-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-secondary-900 size-5" strokeWidth={2.25} />
          <h2 className="text-subtitle-02 text-secondary-900">
            주요 강점 및 개선점
          </h2>
        </div>
        <span className="text-label-04 bg-secondary-900 text-text-inverse rounded-full px-3 py-1">
          AI 분석 결과
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight) => (
          <article
            key={insight.label}
            className="rounded-xl bg-gray-100/70 px-4 py-4"
          >
            <p
              className={
                insight.tone === "positive"
                  ? "text-label-01 text-primary-900"
                  : "text-label-01 text-error-01"
              }
            >
              {insight.title}
            </p>
            <p className="text-body-01 text-text-secondary mt-2">
              {insight.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
