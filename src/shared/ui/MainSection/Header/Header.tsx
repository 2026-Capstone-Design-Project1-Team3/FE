import React from "react";

import { Bell, Settings, User } from "lucide-react";

export interface HeaderProps {
  logoText?: string;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  hasNewNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logoText = "LOGO",
  onNotificationClick,
  onSettingsClick,
  onProfileClick,
  hasNewNotification = true,
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="text-xl font-bold cursor-pointer">
        <a href="/">{logoText}</a>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onNotificationClick}
          className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Notifications"
        >
          <Bell size={24} />
          {hasNewNotification && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error-01"></span>
            </span>
          )}
        </button>

        <button
          onClick={onSettingsClick}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>

        <button
          onClick={onProfileClick}
          className="p-2 ml-1 text-gray-600 hover:bg-gray-100 rounded-full transition-colors border border-gray-100"
          aria-label="My Page"
        >
          <User size={24} />
        </button>
      </div>
    </header>
  );
};
