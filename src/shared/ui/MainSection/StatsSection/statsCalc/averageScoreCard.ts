import {
  addDays,
  formatDateKey,
  getPreviousThirtyDayRange,
  getRecordsInRange,
  getScoresInRange,
  THIRTY_DAYS,
  type ChartDataPoint,
  type DateRange,
  type StatsRecord,
} from "./shared";

export const getRangeAverageScore = (
  records: StatsRecord[],
  range: DateRange,
) => {
  const scores = getScoresInRange(records, range);

  if (!scores.length) {
    return 0;
  }

  return Math.round(
    scores.reduce((sum, score) => sum + score, 0) / scores.length,
  );
};

export const getRangeAverageScoreDiff = (
  records: StatsRecord[],
  range: DateRange,
) => {
  const currentAverage = getRangeAverageScore(records, range);
  const previousAverage = getRangeAverageScore(
    records,
    getPreviousThirtyDayRange(range),
  );

  return currentAverage - previousAverage;
};

export const getAverageScoreChartData = (
  records: StatsRecord[],
  range: DateRange,
): ChartDataPoint[] => {
  const scoreTotalByDay = new Map<string, { count: number; total: number }>();

  getRecordsInRange(records, range).forEach(({ date, record }) => {
    if (typeof record.finalScore !== "number") {
      return;
    }

    const key = formatDateKey(date);
    const current = scoreTotalByDay.get(key) ?? { count: 0, total: 0 };

    scoreTotalByDay.set(key, {
      count: current.count + 1,
      total: current.total + record.finalScore,
    });
  });

  return Array.from({ length: THIRTY_DAYS }, (_, index) => {
    const date = addDays(range.startDate, index);
    const scoreTotal = scoreTotalByDay.get(formatDateKey(date));

    if (!scoreTotal) {
      return null;
    }

    return {
      name: String(index + 1),
      value: Math.round(scoreTotal.total / scoreTotal.count),
    };
  }).filter((point): point is ChartDataPoint => point !== null);
};
