import type { Meta, StoryObj } from "@storybook/react-vite";

import { SelectScriptCard } from "./SelectScriptCard";

const meta: Meta<typeof SelectScriptCard> = {
  title: "UI/PrepareSection/SelectScriptCard",
  component: SelectScriptCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen p-10 bg-gray-50">
        <div className="w-full max-w-4xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectScriptCard>;

export const Default: Story = {
  render: () => <SelectScriptCard />,
};
