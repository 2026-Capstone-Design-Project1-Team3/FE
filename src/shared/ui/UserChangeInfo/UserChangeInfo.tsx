import { type FC, useState } from "react";

import { TextInput } from "@/shared/ui/TextInput/TextInput";

const NAME_REGEX = /^[가-힣]{2,10}$/;

export interface UserPrevInfo {
  prevName?: string;
  userId?: string;
  userEmail?: string;
}

export interface UserChangeInfoProps extends UserPrevInfo {
  className?: string;
}

export const UserChangeInfo: FC<UserChangeInfoProps> = (props) => {
  const { prevName, userId, userEmail, className } = props;
  const [userName, setUserName] = useState("");

  const isNameValid = NAME_REGEX.test(userName);

  const getNameMessageInfo = () => {
    if (!userName) return { message: undefined, isOk: undefined };
    if (isNameValid) return { message: undefined, isOk: true };
    return { message: "유효하지 않은 형식의 이름입니다.", isOk: false };
  };

  const nameInfo = getNameMessageInfo();

  return (
    <section className={className}>
      <h1 className="text-head-03 pb-5">기본 정보</h1>
      <form className="flex flex-1 flex-col gap-6">
        <div className="flex gap-5">
          <TextInput
            id="userName"
            label="이름"
            placeholder={prevName}
            required={false}
            onChange={(e) => setUserName(e.target.value)}
            bottomMessage={nameInfo.message}
            isOk={nameInfo.isOk}
          />
          <TextInput
            id="userId"
            label="아이디"
            required={false}
            value={userId}
            disabled
          />
        </div>
        <TextInput
          id="userEmail"
          type="email"
          label="이메일 주소"
          required={false}
          value={userEmail}
          disabled
        ></TextInput>
      </form>
    </section>
  );
};
