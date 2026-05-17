import type { Meta, StoryObj } from "@storybook/react-vite";

import { Pagination } from "./Pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary flex min-h-32 items-center justify-center p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
  },
};
