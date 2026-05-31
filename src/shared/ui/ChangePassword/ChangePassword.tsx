import { type ChangeEvent, type FC, useState } from "react";

import { Eye, EyeClosed } from "lucide-react";

import type { UpdateUserRequest } from "@/entities/user/model/types";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

type PasswordField = keyof Pick<
  UpdateUserRequest,
  "newPassWord" | "pastPassWord"
>;

type ChangePasswordValue = Record<PasswordField, string> & {
  newPassWordConfirm: string;
};

export interface ChangePasswordProps extends ChangePasswordValue {
  className?: string;
  disabled?: boolean;
  onChange: (value: ChangePasswordValue) => void;
}

interface PasswordInputTextProps {
  placeholder: string;
  bottomMessage?: string;
  isOk?: boolean;
  disabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,16}$/;

export const PasswordInputText: FC<PasswordInputTextProps> = ({
  placeholder,
  bottomMessage,
  disabled = false,
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
      disabled={disabled}
      bottomMessage={bottomMessage}
      isOk={isOk}
      rightElement={PasswordToggleButton}
      className="pr-11.5"
    />
  );
};

export const ChangePassword: FC<ChangePasswordProps> = ({
  className,
  disabled = false,
  newPassWord,
  newPassWordConfirm,
  onChange,
  pastPassWord,
}) => {
  const updatePasswordValue = (nextValue: Partial<ChangePasswordValue>) => {
    onChange({
      newPassWord,
      newPassWordConfirm,
      pastPassWord,
      ...nextValue,
    });
  };

  const isNewPwValid = PW_REGEX.test(newPassWord);
  const newPwMessage = !newPassWord
    ? undefined
    : isNewPwValid
      ? "유효한 형식의 비밀번호입니다."
      : "유효하지 않은 형식의 비밀번호입니다.";
  const isConfirmValid = newPassWord === newPassWordConfirm;
  const confirmMessage = !newPassWordConfirm
    ? undefined
    : isConfirmValid
      ? "비밀번호가 일치합니다."
      : "비밀번호가 일치하지 않습니다.";

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
          value={pastPassWord}
          onChange={(e) =>
            updatePasswordValue({ pastPassWord: e.target.value })
          }
          disabled={disabled}
        />
        <PasswordInputText
          id="new-password"
          placeholder="새 비밀번호"
          value={newPassWord}
          onChange={(e) => updatePasswordValue({ newPassWord: e.target.value })}
          bottomMessage={newPwMessage}
          disabled={disabled}
          isOk={newPwMessage ? isNewPwValid : undefined}
        />
        <PasswordInputText
          id="confirm-password"
          placeholder="새 비밀번호 확인"
          value={newPassWordConfirm}
          onChange={(e) =>
            updatePasswordValue({ newPassWordConfirm: e.target.value })
          }
          bottomMessage={confirmMessage}
          disabled={disabled}
          isOk={confirmMessage ? isConfirmValid : undefined}
        />
      </form>
    </section>
  );
};
