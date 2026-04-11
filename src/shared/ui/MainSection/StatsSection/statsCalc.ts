export interface StatsRecord {
  gazeScore: number;
  speedScore: number;
  fluencyLevel: number;
}

const getFluencyLabel = (avg: number) => {
  if (avg >= 2.5) return "상";
  if (avg >= 2.0) return "중상";
  if (avg >= 1.5) return "중";
  if (avg >= 1.0) return "중하";
  return "하";
};

export const statsCalc = (dataList: StatsRecord[]) => {
  if (!dataList || dataList.length === 0) return null;

  const count = dataList.length;

  const aggregate = dataList.reduce(
    (acc, curr) => {
      acc.gazeScoreSum += curr.gazeScore;
      acc.speedScoreSum += curr.speedScore;
      acc.fluencyLevelSum += curr.fluencyLevel;
      return acc;
    },
    { gazeScoreSum: 0, speedScoreSum: 0, fluencyLevelSum: 0 },
  );

  const fluencyAvg = aggregate.fluencyLevelSum / count;

  return {
    gazeAvgScore: Math.round(aggregate.gazeScoreSum / count),
    speedAvgScore: Math.round(aggregate.speedScoreSum / count),
    fluencyAvgLabel: getFluencyLabel(fluencyAvg),
  };
};
