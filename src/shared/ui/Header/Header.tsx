import type { FC } from "react";

import {
  User,
  LayoutDashboard,
  ChartSpline,
  SquareArrowUp,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

export interface HeaderProps {
  logoText?: string;
  className?: string;
}

interface HeaderMenuProps {
  Icon: LucideIcon;
  Text?: string;
  onClick?: () => void;
}

export const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  const { Icon, Text, onClick } = props;

  return (
    <div
      onClick={onClick}
      className="hover:text-info-01 border-info-01 text-body-01 flex cursor-pointer items-center gap-4 p-3 hover:border-b"
    >
      <Icon size={24} />
      <button className="hidden cursor-pointer whitespace-nowrap md:block">
        {Text}
      </button>
    </div>
  );
};

export const Header: FC<HeaderProps> = (props) => {
  const { logoText, className } = props;
  const navigate = useNavigate();
  const handleGoToMyPage = () => {
    navigate("/mypage");
  };
  const handleGoToMainPage = () => {
    navigate("/");
  };
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-15 py-4",
        className,
      )}
    >
      <div className="flex items-center gap-10">
        <h1 className="text-head-03 text-primary-800 flex cursor-pointer">
          <a href="/">{logoText}</a>
        </h1>
        <div className="flex justify-center">
          <HeaderMenu
            Icon={LayoutDashboard}
            Text="대시보드"
            onClick={handleGoToMainPage}
          />
          <HeaderMenu Icon={SquareArrowUp} Text="발표 연습" />
          <HeaderMenu Icon={Mic} Text="면접 연습" />
          <HeaderMenu Icon={ChartSpline} Text="연습 기록" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={handleGoToMyPage}
          className="border-primary-900 text-primary-900 hover:bg-primary-900 ml-1 cursor-pointer rounded-full border-2 p-2 transition-colors hover:text-white"
        >
          <User size={24} />
        </button>
      </div>
    </header>
  );
};
