import type { FC } from "react";

import { Settings, User } from "lucide-react";

export interface HeaderProps {
  logoText?: string;
  userImage?: string;
}
import { cn } from "@/utils/cn";

const headerMenuClass = "min-w-30 group";
const headerMenuHover = "hover:underline hover:text-info-01 cursor-pointer";

export const Header: FC<HeaderProps> = (props) => {
  const { logoText, userImage } = props;
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="text-head-03 flex cursor-pointer items-center">
        <a href="/">{logoText}</a>
      </div>
      <div className="text-body-01 flex justify-center divide-x divide-gray-300 pr-10 pl-30">
        <button className={cn(headerMenuClass, headerMenuHover)}>
          대시보드
        </button>

        <div className={cn(headerMenuClass, "group flex justify-center")}>
          <span className={cn(headerMenuHover, "group-hover:hidden")}>
            연습하기
          </span>
          <div className="hidden items-center gap-4 group-hover:flex">
            <button className={headerMenuHover}>면접</button>
            <button className={headerMenuHover}>발표</button>
          </div>
        </div>
        <button className={cn(headerMenuClass, headerMenuHover)}>
          성과분석
        </button>
        <button className={cn(headerMenuClass, headerMenuHover)}>
          연습기록
        </button>
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
