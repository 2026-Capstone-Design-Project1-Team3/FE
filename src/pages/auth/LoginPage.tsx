import { Mic } from "lucide-react";

import Background from "@/assets/background.png";
import { LoginForm } from "@/shared/ui/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <main className="flex min-h-screen w-full">
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden pl-20 pr-16 lg:flex">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Background})` }}
        />
        <div className="absolute inset-0 bg-primary-800/78 " />
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 pb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Mic className="h-6 w-6 text-primary-800" strokeWidth={2.5} />
            </div>
            <p className="text-[24px] font-semibold">
              AI 기반 면접 & 발표 도우미
            </p>
          </div>
          <h1 className="text-[60px] font-regular pb-8">
            전문적인 AI 가이드와 함께
            <br />
            나만의 존재감을 완성하세요.
          </h1>
          <p className="text-[20px] font-regular">
            단순한 반복 연습을 넘어, 데이터에 기반한 체계적인 분석을 경험해
            보세요.
            <br />
            답변 내용과 어조 등 언어적인 요소는 물론, 비언어적 습관까지
            <br />
            AI가 정교하게 분석하여 맞춤형 피드백을 제공합니다.
            <br />
            나의 강점과 취약점을 한눈에 파악할 수 있는 직관적인 통계 리포트로
            <br />매 세션마다 확실하게 발전하는 당신의 성장 과정을 직접 확인해
            보세요.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-gray-50 p-4 lg:w-1/2">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
