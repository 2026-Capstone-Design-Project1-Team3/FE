import { useState } from "react";

import { LogOut, UserMinus } from "lucide-react";

import { ChangePassword } from "@/shared/ui/ChangePassword/ChangePassword";
import { EyeCalibration } from "@/shared/ui/EyeCalibration/EyeCalibration";
import { Modal } from "@/shared/ui/Modal/Modal";
import { UserChangeInfo } from "@/shared/ui/UserChangeInfo/UserChangeInfo";
import { UserHeader } from "@/shared/ui/UserHeader/UserHeader";

export interface UserPatch {
  name?: string;
  email: string;
  pastPassWord: string;
  newPassWord: string;
}

type ModalType = "save" | "logout" | "delete" | null;

const MyPage = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  const handleSave = () => {
    closeModal();
  };

  const handleLogout = () => {
    closeModal();
  };

  const handleDeleteAccount = () => {
    closeModal();
  };

  return (
    <main>
      <div className="p-8 py-10">
        <section className="pb-10">
          <h1 className="text-head-01">마이페이지</h1>
          <p className="text-body-01">
            계정 정보 관리 및 캘리브레이션 설정을 최신 상태로 유지하세요.
          </p>
        </section>
        <div className="flex flex-col gap-6 lg:flex-row">
          <section className="flex-4 overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <UserHeader className="p-8" />
            <hr className="border-gray-300" />
            <div className="px-8">
              <UserChangeInfo className="py-8" />
              <hr className="border-gray-300" />
              <ChangePassword className="pt-8" />
            </div>
            <div className="flex items-center justify-end gap-4 p-10">
              <button className="border-primary-800 text-primary-800 hover:bg-primary-800 cursor-pointer rounded-xl border-2 px-7 py-2 hover:text-white">
                초기화
              </button>
              <button
                onClick={() => setActiveModal("save")}
                className="bg-primary-800 border-primary-800 hover:bg-primary-700 hover:border-primary-800/80 cursor-pointer rounded-xl border-2 px-7 py-2 text-white"
              >
                정보 저장하기
              </button>
            </div>
          </section>
          <section className="flex-3">
            <EyeCalibration className="rounded-xl border border-gray-300 bg-white p-8" />
          </section>
        </div>
        <div className="flex gap-4 pt-5">
          <button
            onClick={() => setActiveModal("logout")}
            className="flex cursor-pointer gap-1 rounded-xl border-2 border-gray-600 px-6 py-2 text-gray-600 hover:bg-gray-600 hover:text-white"
          >
            <LogOut size={24} />
            로그아웃
          </button>
          <button
            onClick={() => setActiveModal("delete")}
            className="border-error-01/80 text-error-01/80 hover:bg-error-01/80 flex cursor-pointer gap-1 rounded-xl border-2 px-6 py-2 hover:text-white"
          >
            <UserMinus size={24} />
            회원 탈퇴
          </button>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "save"}
        variant="single"
        title="정보 수정 완료"
        description="계정 정보가 성공적으로 업데이트되었습니다."
        confirmText="확인"
        onClose={closeModal}
        onConfirm={handleSave}
      />

      <Modal
        isOpen={activeModal === "logout"}
        variant="double"
        title="로그아웃"
        description={
          "정말 로그아웃 하시겠습니까?\n로그아웃 시 메인 화면으로 이동합니다."
        }
        cancelText="취소"
        confirmText="로그아웃"
        onClose={closeModal}
        onConfirm={handleLogout}
      />

      <Modal
        isOpen={activeModal === "delete"}
        variant="double"
        title="회원 탈퇴"
        description={
          "정말 탈퇴하시겠습니까?\n탈퇴 시 모든 연습 기록과 데이터가\n영구적으로 삭제됩니다."
        }
        cancelText="돌아가기"
        confirmText="탈퇴하기"
        onClose={closeModal}
        onConfirm={handleDeleteAccount}
      />
    </main>
  );
};

export default MyPage;
