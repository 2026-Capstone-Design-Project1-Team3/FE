import { type ChangeEvent, type FormEvent, useState } from "react";

import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/shared/ui/Button/Button";
import { CheckButton } from "@/shared/ui/CheckButton/CheckButton";
import { SignupStepBadge } from "@/shared/ui/SignupStepBadge/SignupStepBadge";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const ID_REGEX = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,16}$/;
const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,16}$/;
const NAME_REGEX = /^[가-힣]{2,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupForm = () => {
  const [step, setStep] = useState<1 | 2>(1);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [idCheckStatus, setIdCheckStatus] = useState<
    "default" | "checking" | "checked"
  >("default");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const isIdValid = ID_REGEX.test(userId);
  const isPwValid = PW_REGEX.test(password);
  const isPwConfirmValid =
    password === passwordConfirm && passwordConfirm.length > 0;
  const isNameValid = NAME_REGEX.test(userName);
  const isEmailValid = EMAIL_REGEX.test(userEmail);

  const isStep1Valid =
    isIdValid && idCheckStatus === "checked" && isPwValid && isPwConfirmValid;
  const isStep2Valid = isNameValid && isEmailValid;

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
    if (idCheckStatus !== "default") {
      setIdCheckStatus("default");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info("회원가입 완료!", { userId, password, userName, userEmail });
    toast.success("회원가입이 완료되었습니다.");
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

  const handleGoToLogin = () => {
    console.info("로그인하러 가기");
    toast("로그인하러 가기");
  };

  const getIdMessageInfo = () => {
    if (!userId) return { message: undefined, isOk: undefined };
    if (idCheckStatus === "checked")
      return { message: "사용 가능한 아이디입니다.", isOk: true };
    if (isIdValid)
      return { message: "유효한 형식의 아이디입니다.", isOk: true };
    return { message: "유효하지 않은 형식의 아이디입니다.", isOk: false };
  };

  const getPwMessageInfo = () => {
    if (!password) return { message: undefined, isOk: undefined };
    if (isPwValid)
      return { message: "유효한 형식의 비밀번호입니다.", isOk: true };
    return { message: "유효하지 않은 형식의 비밀번호입니다.", isOk: false };
  };

  const getPwConfirmMessageInfo = () => {
    if (!passwordConfirm) return { message: undefined, isOk: undefined };
    if (isPwConfirmValid) return { message: undefined, isOk: true };
    return { message: "비밀번호가 일치하지 않습니다.", isOk: false };
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
  const pwInfo = getPwMessageInfo();
  const pwConfirmInfo = getPwConfirmMessageInfo();
  const nameInfo = getNameMessageInfo();
  const emailInfo = getEmailMessageInfo();

  return (
    <section className="min-h-154 w-104 p-8 mx-auto bg-white border shadow-sm border-border-deactivated rounded-2xl flex flex-col gap-8">
      <header className="relative flex flex-col items-center text-center gap-2">
        <div className="relative flex items-center justify-center w-full">
          {step === 2 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-label="go1step"
            >
              <ChevronLeft className="size-7" />
            </button>
          )}
          <h2 className="text-head-03 text-gray-900">회원가입</h2>
        </div>
        <p className="text-text-secondary text-label-02 pt-2">
          새로운 계정을 만들어 연습을 시작하세요
        </p>

        <div className="flex items-center gap-3 mt-2">
          <SignupStepBadge step="1" active={step === 1} />
          <div className="h-px w-6 bg-border-deactivated" />
          <SignupStepBadge step="2" active={step === 2} />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
        {step === 1 ? (
          <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <TextInput
              id="userId"
              label="아이디"
              placeholder="영소문자 & 숫자 8~16자로 작성"
              required
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
              className="pr-24"
            />
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="비밀번호"
              placeholder="영문 & 숫자 & 특수문자 8~16자로 작성"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bottomMessage={pwInfo.message}
              isOk={pwInfo.isOk}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-2 text-text-deactivated hover:text-gray-600 transition-colors duration-200"
                  aria-label={showPassword ? "showPW" : "hidePW"}
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              }
              className="pr-11.5"
            />
            <TextInput
              id="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              label="비밀번호 확인"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              bottomMessage={pwConfirmInfo.message}
              isOk={pwConfirmInfo.isOk}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  className="p-2 text-text-deactivated hover:text-gray-600 transition-colors duration-200"
                  aria-label={showPasswordConfirm ? "showPW" : "hidePW"}
                >
                  {showPasswordConfirm ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              }
              className="pr-11.5"
            />
            <div className="mt-auto flex flex-col gap-6">
              <Button onClick={handleNext} disabled={!isStep1Valid}>
                다음으로
              </Button>
              <div className="flex justify-center items-center gap-1.5 text-label-04 text-text-secondary">
                <span>이미 계정이 있으신가요?</span>
                <button
                  type="button"
                  onClick={handleGoToLogin}
                  className="text-primary-900 hover:underline"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <TextInput
              id="userName"
              label="이름"
              placeholder="한글 2~10자로 작성"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              bottomMessage={nameInfo.message}
              isOk={nameInfo.isOk}
            />
            <TextInput
              id="userEmail"
              type="email"
              label="이메일"
              placeholder="example@email.com"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              bottomMessage={emailInfo.message}
              isOk={emailInfo.isOk}
            />
            <div className="mt-auto flex flex-col gap-6">
              <Button type="submit" disabled={!isStep2Valid}>
                가입 완료하기
              </Button>
              <div className="flex justify-center items-center gap-1.5 text-label-04 text-text-secondary">
                <span>이미 계정이 있으신가요?</span>
                <button
                  type="button"
                  onClick={handleGoToLogin}
                  className="text-primary-900 hover:underline font-medium transition-colors duration-200"
                >
                  로그인하러 가기
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};
