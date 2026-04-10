import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logoText: {
      description: "좌측 로고에 표시될 텍스트입니다.",
      control: "text",
    },
    hasNewNotification: {
      description: "새로운 알림이 있을 때 레드 닷을 표시합니다.",
      control: "boolean",
    },
    onNotificationClick: { action: "notification clicked" },
    onSettingsClick: { action: "settings clicked" },
    onProfileClick: { action: "profile clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoText: "MY APP",
    hasNewNotification: true,
  },
};

export const NoNotifications: Story = {
  args: {
    ...Default.args,
    hasNewNotification: false,
  },
};

export const EdgeCase: Story = {
  args: {
    logoText: "MY AWESOME DASHBOARD SERVICE",
    hasNewNotification: true,
  },
};
