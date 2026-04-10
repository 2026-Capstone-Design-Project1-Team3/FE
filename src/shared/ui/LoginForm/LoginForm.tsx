import { type ChangeEvent, type FormEvent, useState } from "react";

import { Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = userId.trim() !== "" && password.trim() !== "";

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info("로그인 완료!", { userId, password });
    toast.success("로그인이 완료되었습니다.");
    navigate("/");
  };
  const handleGoToSignup = () => {
    console.info("회원가입하러 가기");
    toast("회원가입 페이지로 이동");
    navigate("/signup");
  };

  return (
    <section className="min-h-100 w-104 p-8 mx-auto bg-white border shadow-sm border-border-deactivated rounded-2xl flex flex-col gap-8">
      <header className="relative flex flex-col items-center text-center gap-2">
        <div className="relative flex items-center justify-center w-full">
          <h2 className="text-head-03 text-gray-900">로그인</h2>
        </div>
        <p className="text-text-secondary text-label-02 pt-2">
          로그인하고 발표/면접 연습을 시작하세요
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-right-4 duration-300">
          <TextInput
            id="userId"
            label="아이디"
            placeholder="아이디를 입력해주세요"
            required={false}
            value={userId}
            onChange={handleUserIdChange}
          />
          <TextInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            required={false}
            value={password}
            onChange={handlePasswordChange}
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
          <div className="mt-auto flex flex-col gap-6">
            <Button type="submit" disabled={!isFormValid}>
              로그인
            </Button>
            <div className="flex justify-center items-center gap-1.5 text-label-04 text-text-secondary">
              <span>아직 계정이 없으신가요?</span>
              <button
                type="button"
                onClick={handleGoToSignup}
                className="text-primary-900 hover:underline"
              >
                회원가입하러 가기
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
