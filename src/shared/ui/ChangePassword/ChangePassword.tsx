import { type FC, type ChangeEvent, useState } from "react";

import { Eye, EyeClosed } from "lucide-react";

import { TextInput } from "@/shared/ui/TextInput/TextInput";

export interface ChangePasswordProps {
  className?: string;
}

export interface PasswordInputTextProps {
  placeholder: string;
  bottomMessage?: string;
  isOk?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,16}$/;

export const PasswordInputText: FC<PasswordInputTextProps> = ({
  placeholder,
  bottomMessage,
  isOk,
  value,
  onChange,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordToggleButton = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="text-text-deactivated p-2 transition-colors duration-200 hover:text-gray-600"
      aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
    >
      {showPassword ? (
        <Eye className="size-5" />
      ) : (
        <EyeClosed className="size-5" />
      )}
    </button>
  );

  return (
    <TextInput
      id={id}
      type={showPassword ? "text" : "password"}
      label=""
      placeholder={placeholder}
      required={false}
      value={value}
      onChange={onChange}
      bottomMessage={bottomMessage}
      isOk={isOk}
      rightElement={PasswordToggleButton}
      className="pr-11.5"
    />
  );
};

export const ChangePassword: FC<ChangePasswordProps> = ({ className }) => {
  const [pastPassword, setPastPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const isNewPwValid = PW_REGEX.test(newPassword);
  const isConfirmValid =
    newPassword === newPasswordConfirm && newPasswordConfirm.length > 0;

  const getNewPwMessage = () => {
    if (!newPassword) return { message: undefined, isOk: undefined };
    return isNewPwValid
      ? { message: "유효한 형식의 비밀번호입니다.", isOk: true }
      : { message: "유효하지 않은 형식의 비밀번호입니다.", isOk: false };
  };

  const getConfirmMessage = () => {
    if (!newPasswordConfirm) return { message: undefined, isOk: undefined };
    return isConfirmValid
      ? { message: "비밀번호가 일치합니다.", isOk: true }
      : { message: "비밀번호가 일치하지 않습니다.", isOk: false };
  };

  return (
    <section className={className}>
      <div className="pb-3">
        <h1 className="text-label-01 text-text-secondary">비밀번호 변경</h1>
        <h2 className="text-caption-02 text-error-01">
          *영문 & 숫자 & 특수문자 8~16자로 작성
        </h2>
      </div>
      <form
        className="flex flex-1 flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <PasswordInputText
          id="past-password"
          placeholder="현재 비밀번호"
          value={pastPassword}
          onChange={(e) => setPastPassword(e.target.value)}
        />
        <PasswordInputText
          id="new-password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          bottomMessage={getNewPwMessage().message}
          isOk={getNewPwMessage().isOk}
        />
        <PasswordInputText
          id="confirm-password"
          placeholder="새 비밀번호 확인"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          bottomMessage={getConfirmMessage().message}
          isOk={getConfirmMessage().isOk}
        />
      </form>
    </section>
  );
};
