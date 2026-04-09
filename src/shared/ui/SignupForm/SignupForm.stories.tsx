import type { Meta, StoryObj } from "@storybook/react-vite";

import { SignupForm } from "./SignupForm";

const meta: Meta<typeof SignupForm> = {
  title: "UI/SignupForm",
  component: SignupForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Step1: Story = {};

export const Step2: Story = {
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll("button");

    const nextButton = Array.from(buttons).find(
      // 버튼 동작시키기
      (btn) => btn.textContent?.includes("다음으로"),
    );

    if (nextButton) {
      nextButton.click();
    }
  },
};
