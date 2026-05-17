import type { Meta, StoryObj } from "@storybook/react-vite";
import { TrendingUp, Calendar, ChartColumn } from "lucide-react";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";

import { StatsCard } from "./StatsCard";

const practiceCountData = [
  { value: 18 },
  { value: 22 },
  { value: 21 },
  { value: 27 },
  { value: 24 },
  { value: 6 },
  { value: 58 },
  { value: 25 },
];

const improvementData = [
  { value: 12 },
  { value: 22 },
  { value: 18 },
  { value: 34 },
  { value: 40 },
  { value: 52 },
];

const meta: Meta<typeof StatsCard> = {
  title: "UI/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  argTypes: {
    score: {
      control: { type: "number" },
    },
    unit: {
      control: { type: "text" },
      description: "수치의 단위입니다 (%, 점, 명 등).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 bg-background-dark p-2">
      <StatsCard
        title="총 연습 횟수"
        Icon={TrendingUp}
        score={128}
        gap="+12%"
        className="h-52 max-w-none"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={practiceCountData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary-900)"
                strokeWidth={5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        }
      />
      <StatsCard
        title="향상도"
        Icon={ChartColumn}
        score={32}
        unit="%"
        gap="Top 3"
        className="[&_p]:text-primary-800 h-52 max-w-none"
        chart={
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={improvementData} barCategoryGap={4}>
              <Bar
                dataKey="value"
                fill="var(--color-primary-900)"
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        }
      />
      <StatsCard
        title="성장률"
        Icon={Calendar}
        score={4}
        unit="일"
        gap="전월 대비"
        className="h-52 max-w-none [&_p]:text-text-tertiary"
        chart={
          <div className="mt-auto h-2 rounded-full bg-primary-100">
            <div className="h-full w-4/5 rounded-full bg-primary-900" />
          </div>
        }
      />
    </div>
  ),
};
