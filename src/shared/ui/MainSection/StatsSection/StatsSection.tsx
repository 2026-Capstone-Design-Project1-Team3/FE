import { CalendarCheck, Target, Trophy } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import {
  getAverageScoreChartData,
  getDailyPracticeCountChartData,
  getHighScoreAchievementRate,
  getHighScoreAchievementRateDiff,
  getLatestRecordDate,
  getRangeAverageScore,
  getRangeAverageScoreDiff,
  getRangePracticeCount,
  getRangePracticeCountDiff,
  getThirtyDayRange,
  type StatsRecord,
} from "./statsCalc";

import { mockRecords } from "@/mocks/mainRecordData";
import { StatsCard } from "@/shared/ui/Card/StatsCard/StatsCard";

interface StateSectionProps {
  records?: StatsRecord[];
}

export const StatsSection = ({ records = mockRecords }: StateSectionProps) => {
  const range = getThirtyDayRange(getLatestRecordDate(records) ?? new Date());
  const practiceCountDiff = getRangePracticeCountDiff(records, range);
  const averageScoreDiff = getRangeAverageScoreDiff(records, range);
  const achievementRate = getHighScoreAchievementRate(records, range);
  const achievementRateDiff = getHighScoreAchievementRateDiff(records, range);

  const formatSignedValue = (value: number) =>
    `${value >= 0 ? "+" : ""}${value}`;

  return (
    <div className="flex flex-col gap-1">
      <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="30일 완료한 연습"
          Icon={CalendarCheck}
          score={getRangePracticeCount(records, range)}
          unit="회"
          gap={`${formatSignedValue(practiceCountDiff)}회`}
          className=""
          chart={
            <div className="mt-auto h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getDailyPracticeCountChartData(records, range)}
                  barCategoryGap={2}
                >
                  <Bar
                    dataKey="value"
                    fill="var(--color-primary-900)"
                    radius={[2, 2, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        />
        <StatsCard
          title="평균 성과 점수"
          Icon={Trophy}
          score={getRangeAverageScore(records, range)}
          unit="점"
          gap={`${formatSignedValue(averageScoreDiff)}점`}
          className=""
          chart={
            <div className="mt-auto h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getAverageScoreChartData(records, range)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-primary-900)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          }
        />
        <StatsCard
          title="80점 이상 달성률"
          Icon={Target}
          score={achievementRate}
          unit="%"
          gap={`${formatSignedValue(achievementRateDiff)}%p`}
          className=""
          chart={
            <div className="mt-auto flex h-20 w-full flex-col justify-end gap-3">
              <div
                className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
                role="progressbar"
                aria-label="80점 이상 달성률"
                aria-valuenow={achievementRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="bg-primary-900 h-full rounded-full"
                  style={{ width: `${achievementRate}%` }}
                />
              </div>
              <div className="text-caption-02 text-text-tertiary flex items-center justify-between">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          }
        />
      </section>
    </div>
  );
};
