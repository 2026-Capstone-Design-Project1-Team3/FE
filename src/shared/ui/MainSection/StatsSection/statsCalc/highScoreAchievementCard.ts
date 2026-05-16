import {
  getPreviousThirtyDayRange,
  getScoresInRange,
  type ChartDataPoint,
  type DateRange,
  type StatsRecord,
} from "./shared";

const HIGH_SCORE_THRESHOLD = 80;

export const getHighScoreAchievementRate = (
  records: StatsRecord[],
  range: DateRange,
) => {
  const scores = getScoresInRange(records, range);

  if (!scores.length) {
    return 0;
  }

  const highScoreCount = scores.filter(
    (score) => score >= HIGH_SCORE_THRESHOLD,
  ).length;

  return Math.round((highScoreCount / scores.length) * 100);
};

export const getHighScoreAchievementRateDiff = (
  records: StatsRecord[],
  range: DateRange,
) => {
  const currentRate = getHighScoreAchievementRate(records, range);
  const previousRate = getHighScoreAchievementRate(
    records,
    getPreviousThirtyDayRange(range),
  );

  return currentRate - previousRate;
};

export const getHighScoreAchievementChartData = (
  records: StatsRecord[],
  range: DateRange,
): ChartDataPoint[] => {
  return [
    {
      name: "달성률",
      value: getHighScoreAchievementRate(records, range),
    },
  ];
};
