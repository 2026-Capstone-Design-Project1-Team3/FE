import { useEffect, type FC } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMyProfileQuery } from "@/features/user/model/useMyProfileQuery";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";

interface MainPageProps {
  username?: string;
}
const MainPage: FC<MainPageProps> = (props) => {
  const { username } = props;
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  // 토큰이 없으면 훅 호출 없이 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!token) {
      toast.error("권한이 없습니다. 로그인하세요.");
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const { data: profile, isLoading } = useMyProfileQuery({
    enabled: !!token,
  });

  if (!token || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2.5">
        <div className="w-3 h-3 bg-primary-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-primary-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-primary-700 rounded-full animate-bounce"></div>
      </div>
    );
  }
  return (
    <div>
      <main>
        <div className="mx-auto max-w-6xl p-8">
          <section className="flex flex-col py-10 gap-4">
            <h1 className="text-head-01">
              {profile?.name || username || "사용자"}님, 안녕하세요!
            </h1>
            <h6 className="text-body-01">
              당신의 면접과 발표 역량을 한 단계 더 높여줄 AI 멘토가 준비되어
              있습니다.
            </h6>
          </section>
          <StartSection className="py-10" />
          <h1 className="text-head-03 pt-8">최근 연습</h1>
          <RecordSection className="py-10" />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
