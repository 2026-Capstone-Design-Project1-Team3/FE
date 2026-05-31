import { type ChangeEvent, type FormEvent, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/features/user/model/useLoginMutation";
import { isApiHttpError } from "@/shared/api/http-error";
import { queryKeys } from "@/shared/api/query-keys";
import { Button } from "@/shared/ui/Button/Button";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

export const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLoginMutation();

  const isFormValid = userId.trim() !== "" && password.trim() !== "";

  const handleUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    login(
      { loginId: userId, passWord: password },
      {
        onSuccess: () => {
          toast.success("로그인에 성공하였습니다.");
          queryClient.invalidateQueries({
            queryKey: queryKeys.user.me(),
          });
          navigate("/");
        },
        onError: (error: unknown) => {
          let errorMessage = "로그인에 실패했습니다.";

          if (isApiHttpError(error) && error.message) {
            if (error.message.includes("틀렸다")) {
              errorMessage = "아이디 또는 비밀번호가 일치하지 않습니다.";
            } else {
              errorMessage = error.message;
            }
          }

          toast.error(errorMessage);
        },
      },
    );
  };
  const handleGoToSignup = () => {
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
            <Button type="submit" disabled={!isFormValid || isPending}>
              {isPending ? "로그인 중" : "로그인"}
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
