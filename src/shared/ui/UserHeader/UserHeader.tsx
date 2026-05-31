import type { FC } from "react";

import { User } from "lucide-react";

import type { UserProfile } from "@/entities/user/model/types";

interface UserHeaderProps extends Pick<UserProfile, "email" | "name"> {
  className?: string;
}

export const UserHeader: FC<UserHeaderProps> = (props) => {
  const { name, email, className } = props;
  return (
    <header className={className}>
      <div className="flex items-center gap-5">
        <User
          size={64}
          className="text-primary-900 min-w-16 rounded-full border-3 p-3"
        />
        <span className="p-1">
          <h1 className="text-head-03">{name || "사용자"}</h1>
          <p className="text-body-01 text-gray-600">
            {email || "UserName@example.com"}
          </p>
        </span>
      </div>
    </header>
  );
};
