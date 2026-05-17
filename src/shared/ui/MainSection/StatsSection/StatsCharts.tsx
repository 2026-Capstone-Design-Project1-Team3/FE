import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  value: number;
}

interface DailyPracticeCountChartProps {
  data: ChartDataPoint[];
}

interface AverageScoreChartProps {
  data: ChartDataPoint[];
}

export const DailyPracticeCountChart = ({
  data,
}: DailyPracticeCountChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <BarChart data={data} barCategoryGap={2}>
        <Bar
          dataKey="value"
          fill="var(--color-primary-900)"
          radius={[2, 2, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const AverageScoreChart = ({ data }: AverageScoreChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-primary-900)"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
