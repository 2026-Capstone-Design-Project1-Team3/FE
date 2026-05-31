import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileUploadCard } from "./FileUploadCard";

const meta: Meta<typeof FileUploadCard> = {
  title: "UI/PrepareSection/FileUploadCard",
  component: FileUploadCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen p-10 bg-gray-100">
        <div className="w-full max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileUploadCard>;

export const Interactive: Story = {
  args: {
    title: "자기소개서",
    variant: "interactive",
  },
};

export const ReadonlyPresentation: Story = {
  args: {
    title: "발표 자료",
    variant: "readonly",
    fileName: "2026_Capstone_Design_Project_Team3.pdf",
    fileSize: 1048576 * 15.4,
  },
};

export const ReadonlyPortfolio: Story = {
  args: {
    title: "포트폴리오",
    variant: "readonly",
    fileName: "한나영_프론트엔드_포트폴리오_최종.pdf",
    fileSize: 1048576 * 3.2,
  },
};
