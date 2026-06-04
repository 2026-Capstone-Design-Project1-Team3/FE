import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gauge } from "lucide-react";

import { FolderStatisticCard } from "./FolderStatisticCard";

const meta = {
  title: "UI/FolderDetail/FolderStatisticCard",
  component: FolderStatisticCard,
  tags: ["autodocs"],
} satisfies Meta<typeof FolderStatisticCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "발화 속도",
    description: "말의 빠르기와 전달 흐름",
    score: 82,
    Icon: Gauge,
    color: "text-primary-800",
    bar: "bg-primary-800",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    description: "아직 분석된 기록이 없습니다.",
    score: 0,
  },
};

export const EdgeCase: Story = {
  args: {
    ...Default.args,
    title: "매우 긴 폴더 통계 항목 이름",
    description: "긴 설명이 들어와도 카드 안에서 안정적으로 표시됩니다.",
    score: 100,
  },
};
