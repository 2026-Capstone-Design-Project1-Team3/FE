import type { FC } from "react";

import {
  Settings,
  User,
  LayoutDashboard,
  ChartSpline,
  SquareArrowUp,
  Mic,
  type LucideIcon,
} from "lucide-react";

export interface HeaderProps {
  logoText?: string;
  logoClass?: string;
  userImage?: string;
}

interface HeaderMenuProps {
  Icon: LucideIcon;
  Text?: string;
}

export const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  const { Icon, Text } = props;

  return (
    <div className="hover:text-info-01 border-info-01 text-body-01 flex min-w-32 cursor-pointer items-center gap-4 p-3 hover:border-b">
      <Icon size={24} />
      <button className="cursor-pointer">{Text}</button>
    </div>
  );
};

export const Header: FC<HeaderProps> = (props) => {
  const { logoText, logoClass, userImage } = props;
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-15 py-4">
      <div className="flex items-center gap-10">
        <div className="text-head-03 flex cursor-pointer">
          <a href="/" className={logoClass}>
            {logoText}
          </a>
        </div>
        <div className="flex justify-center">
          <HeaderMenu Icon={LayoutDashboard} Text="대시보드" />
          <HeaderMenu Icon={SquareArrowUp} Text="발표 연습" />
          <HeaderMenu Icon={Mic} Text="면접 연습" />
          <HeaderMenu Icon={ChartSpline} Text="리포트" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="cursor-pointer text-gray-600 transition-transform hover:rotate-90">
          <Settings size={24} />
        </button>
        <button className="ml-1 cursor-pointer rounded-full border border-gray-600 p-2 text-gray-600 transition-colors hover:bg-gray-100">
          {userImage ? <img src={userImage} /> : <User size={24} />}
        </button>
      </div>
    </header>
  );
};
