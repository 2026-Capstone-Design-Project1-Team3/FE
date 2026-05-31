import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster } from "react-hot-toast";
import { MemoryRouter } from "react-router-dom";

import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "UI/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Toaster position="top-center" />
        <div className="p-10 bg-gray-50 min-h-screen flex items-center justify-center">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
