import type { FC } from "react";

import type {
  UpdateUserRequest,
  UserProfile,
} from "@/entities/user/model/types";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const NAME_REGEX = /^[가-힣]{2,10}$/;

type UserChangeInfoValue = Required<Pick<UpdateUserRequest, "email" | "name">>;

export interface UserChangeInfoProps
  extends Pick<UserProfile, "loginId">, UserChangeInfoValue {
  className?: string;
  disabled?: boolean;
  onChange: (value: UserChangeInfoValue) => void;
}

export const UserChangeInfo: FC<UserChangeInfoProps> = ({
  loginId,
  className,
  disabled = false,
  email,
  name,
  onChange,
}) => {
  const isNameValid = NAME_REGEX.test(name);
  const nameMessage =
    name && !isNameValid ? "유효하지 않은 형식의 이름입니다." : undefined;

  return (
    <section className={className}>
      <h1 className="text-head-03 pb-5">기본 정보</h1>
      <form className="flex flex-1 flex-col gap-6">
        <div className="flex gap-5">
          <TextInput
            id="userName"
            label="이름"
            placeholder="이름"
            required={false}
            value={name}
            onChange={(e) => onChange({ email, name: e.target.value })}
            bottomMessage={nameMessage}
            disabled={disabled}
            isOk={name ? isNameValid : undefined}
          />
          <TextInput
            id="userId"
            label="아이디"
            required={false}
            value={loginId ?? ""}
            disabled
          />
        </div>
        <TextInput
          id="userEmail"
          type="email"
          label="이메일 주소"
          required={false}
          value={email}
          disabled
        />
      </form>
    </section>
  );
};
