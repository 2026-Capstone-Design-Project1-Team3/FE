import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectPracticeCard } from "./SelectPracticeCard";

const meta: Meta<typeof SelectPracticeCard> = {
  title: "UI/PrepareSection/SelectPracticeCard",
  component: SelectPracticeCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen p-10 bg-gray-50">
        <div className="w-full max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectPracticeCard>;

export const InterviewMode: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<"new" | "existing">("new");

    return (
      <div className="grid grid-cols-2 gap-20">
        <SelectPracticeCard
          variant="new"
          practiceType="interview"
          isSelected={selectedId === "new"}
          onClick={() => setSelectedId("new")}
        />
        <SelectPracticeCard
          variant="existing"
          practiceType="interview"
          isSelected={selectedId === "existing"}
          onClick={() => setSelectedId("existing")}
          folderName="2024년 상반기 신입 공채"
          onListClick={() => alert("면접 목록 보기 클릭됨!")}
        />
      </div>
    );
  },
};

export const PresentationMode: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<"new" | "existing">(
      "existing",
    );

    return (
      <div className="grid grid-cols-2 gap-20">
        <SelectPracticeCard
          variant="new"
          practiceType="presentation"
          isSelected={selectedId === "new"}
          onClick={() => setSelectedId("new")}
        />
        <SelectPracticeCard
          variant="existing"
          practiceType="presentation"
          isSelected={selectedId === "existing"}
          onClick={() => setSelectedId("existing")}
          folderName="신규 프로젝트 아키텍처 제안"
          onListClick={() => alert("발표 목록 보기 클릭됨!")}
        />
      </div>
    );
  },
};
