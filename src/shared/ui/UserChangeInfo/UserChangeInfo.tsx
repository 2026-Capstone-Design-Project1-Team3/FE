import { type FC, useState, type ChangeEvent } from "react";

import { CheckButton } from "@/shared/ui/CheckButton/CheckButton";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const ID_REGEX = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/;
const NAME_REGEX = /^[가-힣]{2,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface UserPrevInfo {
  prevName?: string;
  prevId?: string;
  prevEmail?: string;
}

export interface UserChangeInfoProps extends UserPrevInfo {
  className?: string;
}

export const UserChangeInfo: FC<UserChangeInfoProps> = (props) => {
  const { prevName, prevId, prevEmail, className } = props;
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [idCheckStatus, setIdCheckStatus] = useState<
    "default" | "checking" | "checked"
  >("default");
  const isIdValid = ID_REGEX.test(userId);
  const isNameValid = NAME_REGEX.test(userName);
  const isEmailValid = EMAIL_REGEX.test(userEmail);
  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (idCheckStatus !== "default") {
      setIdCheckStatus("default");
    }
  };
  const handleCheckIdDuplication = () => {
    // 중복 확인 버튼 임시 동작 함수
    if (!isIdValid) return;

    setIdCheckStatus("checking");
    setTimeout(() => {
      setIdCheckStatus("checked");
      console.info("아이디 중복 확인 완료");
    }, 1500);
  };
  const getIdMessageInfo = () => {
    if (!userId) return { message: undefined, isOk: undefined };
    if (idCheckStatus === "checked")
      return { message: "사용 가능한 아이디입니다.", isOk: true };
    if (isIdValid)
      return { message: "유효한 형식의 아이디입니다.", isOk: true };
    return { message: "유효하지 않은 형식의 아이디입니다.", isOk: false };
  };
  const getNameMessageInfo = () => {
    if (!userName) return { message: undefined, isOk: undefined };
    if (isNameValid) return { message: undefined, isOk: true };
    return { message: "유효하지 않은 형식의 이름입니다.", isOk: false };
  };

  const getEmailMessageInfo = () => {
    if (!userEmail) return { message: undefined, isOk: undefined };
    if (isEmailValid) return { message: undefined, isOk: true };
    return {
      message: "유효한 형식이 아닙니다. @와 .을 사용해 주세요.",
      isOk: false,
    };
  };
  const idInfo = getIdMessageInfo();
  const nameInfo = getNameMessageInfo();
  const emailInfo = getEmailMessageInfo();

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
            placeholder={prevId}
            required={false}
            value={userId}
            onChange={handleUserIdChange}
            bottomMessage={idInfo.message}
            isOk={idInfo.isOk}
            rightElement={
              <CheckButton
                variant={idCheckStatus}
                onClick={handleCheckIdDuplication}
                disabled={!isIdValid || idCheckStatus === "checked"}
              />
            }
          />
        </div>
        <TextInput
          id="userEmail"
          type="email"
          label="이메일 주소"
          required={false}
          placeholder={prevEmail}
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          bottomMessage={emailInfo.message}
          isOk={emailInfo.isOk}
        ></TextInput>
      </form>
    </section>
  );
};
