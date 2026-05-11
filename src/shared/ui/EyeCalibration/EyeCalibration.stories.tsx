import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";

import { EyeCalibration } from "./EyeCalibration";

const meta = {
  title: "UI/EyeCalibration",
  component: EyeCalibration,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="max-w-125">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "시선 캘리브레이션 상태를 표시하고 촬영 페이지로 이동하는 기능을 담당하는 컴포넌트입니다.",
      },
    },
  },
  args: {
    complete: false,
  },
} satisfies Meta<typeof EyeCalibration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    complete: false,
  },
};

export const Completed: Story = {
  args: {
    complete: true,
    completeAt: "2026/05/10 14:30",
  },
};
