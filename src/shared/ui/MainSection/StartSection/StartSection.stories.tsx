import type { Meta, StoryObj } from "@storybook/react-vite";

import { StartSection } from "./StartSection";

const meta: Meta<typeof StartSection> = {
  title: "UI/MainSection/StartSection",
  component: StartSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StartSection>;

export const Default: Story = {};
