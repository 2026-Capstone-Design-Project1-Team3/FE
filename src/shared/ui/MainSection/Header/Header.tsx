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
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/utils/cn";

export interface HeaderProps {
  userImage?: string;
}

interface HeaderMenuProps {
  Icon: LucideIcon;
  Text?: string;
  isActive: boolean;
  onClick: () => void;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({
  Icon,
  Text,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "text-body-01 flex min-w-32 cursor-pointer items-center gap-4 p-3 transition-colors",
        isActive
          ? "text-info-01 font-semibold"
          : "text-gray-500 hover:text-info-01",
      )}
    >
      <Icon size={24} />
      <button className="cursor-pointer">{Text}</button>
    </div>
  );
};

export const Header: FC<HeaderProps> = (props) => {
  const { userImage } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeActive = location.pathname === "/";
  const isPresentationActive = location.pathname.startsWith("/presentation");
  const isInterviewActive = location.pathname.startsWith("/interview");
  const isReportActive = location.pathname.startsWith("/report");

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-15 py-4">
      <div className="flex items-center gap-10">
        <div className="text-head-03 flex cursor-pointer">
          <a href="/" className="text-primary-900">
            Silent Mentor
          </a>
        </div>
        <div className="flex justify-center">
          <HeaderMenu
            Icon={LayoutDashboard}
            Text="대시보드"
            isActive={isHomeActive}
            onClick={() => navigate("/")}
          />
          <HeaderMenu
            Icon={SquareArrowUp}
            Text="발표 연습"
            isActive={isPresentationActive}
            onClick={() => navigate("/presentation/prepare")}
          />
          <HeaderMenu
            Icon={Mic}
            Text="면접 연습"
            isActive={isInterviewActive}
            onClick={() => navigate("/interview/prepare")}
          />
          <HeaderMenu
            Icon={ChartSpline}
            Text="리포트"
            isActive={isReportActive}
            onClick={() => navigate("/report")}
          />
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
