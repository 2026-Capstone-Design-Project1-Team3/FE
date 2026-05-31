import {
  addDays,
  formatDateKey,
  getPreviousThirtyDayRange,
  getRecordsInRange,
  THIRTY_DAYS,
  type ChartDataPoint,
  type DateRange,
  type StatsRecord,
} from "./shared";

export const getRangePracticeCount = (
  records: StatsRecord[],
  range: DateRange,
) => getRecordsInRange(records, range).length;

export const getRangePracticeCountDiff = (
  records: StatsRecord[],
  range: DateRange,
) => {
  const currentCount = getRangePracticeCount(records, range);
  const previousCount = getRangePracticeCount(
    records,
    getPreviousThirtyDayRange(range),
  );

  return currentCount - previousCount;
};

export const getDailyPracticeCountChartData = (
  records: StatsRecord[],
  range: DateRange,
): ChartDataPoint[] => {
  const practiceCountByDay = new Map<string, number>();

  getRecordsInRange(records, range).forEach(({ date }) => {
    const key = formatDateKey(date);
    practiceCountByDay.set(key, (practiceCountByDay.get(key) ?? 0) + 1);
  });

  return Array.from({ length: THIRTY_DAYS }, (_, index) => {
    const date = addDays(range.startDate, index);

    return {
      name: String(index + 1),
      value: practiceCountByDay.get(formatDateKey(date)) ?? 0,
    };
  });
};
