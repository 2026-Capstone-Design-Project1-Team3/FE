import { useState } from "react";

import { LogOut, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { UpdateUserRequest } from "@/entities/user/model/types";
import { useDeleteUserMutation } from "@/features/user/model/useDeleteUserMutation";
import { useLogoutMutation } from "@/features/user/model/useLogoutMutation";
import { useMyProfileQuery } from "@/features/user/model/useMyProfileQuery";
import { useUpdateUserMutation } from "@/features/user/model/useUpdateUserMutation";
import { useUserEyeQuery } from "@/features/user/model/useUserEyeQuery";
import { isApiHttpError } from "@/shared/api/http-error";
import { ChangePassword } from "@/shared/ui/ChangePassword/ChangePassword";
import { EyeCalibration } from "@/shared/ui/EyeCalibration/EyeCalibration";
import { Modal } from "@/shared/ui/Modal/Modal";
import { UserChangeInfo } from "@/shared/ui/UserChangeInfo/UserChangeInfo";
import { UserHeader } from "@/shared/ui/UserHeader/UserHeader";

const initialForm: UpdateUserRequest = {
  newPassWord: null,
  pastPassWord: null,
};

const noticeModals = {
  save: {
    title: "정보 수정 완료",
    description: "계정 정보가 성공적으로 업데이트되었습니다.",
  },
  passwordMismatch: {
    title: "비밀번호 불일치",
    description: "현재 비밀번호가 일치하지 않습니다.",
  },
  samePassword: {
    title: "비밀번호 변경 불가",
    description: "새 비밀번호는 현재 비밀번호와 다르게 입력해주세요.",
  },
} as const;

type ModalType = keyof typeof noticeModals | "logout" | "delete" | null;

const MyPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [form, setForm] = useState<UpdateUserRequest>(initialForm);
  const [newPassWordConfirm, setNewPassWordConfirm] = useState("");

  const { data: profile } = useMyProfileQuery();
  const { data: eye } = useUserEyeQuery();
  const { isPending: isUpdating, mutate: updateUser } = useUpdateUserMutation();
  const { mutate: logout } = useLogoutMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const noticeModal =
    activeModal && activeModal in noticeModals
      ? noticeModals[activeModal as keyof typeof noticeModals]
      : null;

  const currentEmail = profile?.email ?? "";
  const currentName = form.name ?? profile?.name ?? "";

  const closeModal = () => setActiveModal(null);
  const goToLogin = () => {
    closeModal();
    navigate("/login");
  };
  const clearPasswordFields = () => {
    setForm((prev) => ({ ...prev, ...initialForm }));
    setNewPassWordConfirm("");
  };
  const resetForm = () => {
    setForm({ ...initialForm, name: profile?.name ?? "" });
    setNewPassWordConfirm("");
  };

  const handleSave = () => {
    const passwordValues = [
      form.pastPassWord,
      form.newPassWord,
      newPassWordConfirm,
    ];
    const wantsPasswordChange = passwordValues.some((value) => value?.trim());

    if (!currentName.trim() || !currentEmail.trim()) return;
    if (wantsPasswordChange && !passwordValues.every((value) => value?.trim()))
      return;
    if (wantsPasswordChange && form.newPassWord !== newPassWordConfirm) return;
    if (wantsPasswordChange && form.pastPassWord === form.newPassWord) {
      setActiveModal("samePassword");
      return;
    }

    updateUser(
      {
        email: currentEmail,
        name: currentName,
        newPassWord: wantsPasswordChange ? form.newPassWord : null,
        pastPassWord: wantsPasswordChange ? form.pastPassWord : null,
      },
      {
        onError: (error) => {
          if (isApiHttpError(error) && error.status === 400) {
            setActiveModal("passwordMismatch");
          }
        },
        onSuccess: () => {
          clearPasswordFields();
          setActiveModal("save");
        },
      },
    );
  };

  const handleLogout = () => logout(undefined, { onSuccess: goToLogin });
  const handleDeleteAccount = () =>
    deleteUser(undefined, { onSuccess: goToLogin });

  return (
    <main className="flex justify-center">
      <div className="p-8 py-10">
        <section className="pb-10">
          <h1 className="text-head-01">마이페이지</h1>
          <p className="text-body-01">
            계정 정보 관리 및 캘리브레이션 설정을 최신 상태로 유지하세요.
          </p>
        </section>
        <div className="max-w-300 flex flex-col gap-6 lg:flex-row">
          <section className="flex-4 overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <UserHeader
              className="p-8"
              email={profile?.email}
              name={profile?.name}
            />
            <hr className="border-gray-300" />
            <div className="px-8">
              <UserChangeInfo
                className="py-8"
                email={currentEmail}
                loginId={profile?.loginId}
                name={currentName}
                onChange={({ name }) => setForm((prev) => ({ ...prev, name }))}
              />
              <hr className="border-gray-300" />
              <ChangePassword
                className="pt-8"
                newPassWord={form.newPassWord ?? ""}
                newPassWordConfirm={newPassWordConfirm}
                pastPassWord={form.pastPassWord ?? ""}
                onChange={({
                  newPassWord,
                  newPassWordConfirm,
                  pastPassWord,
                }) => {
                  setForm((prev) => ({ ...prev, newPassWord, pastPassWord }));
                  setNewPassWordConfirm(newPassWordConfirm);
                }}
              />
            </div>
            <div className="flex items-center justify-end gap-4 p-10">
              <button
                onClick={resetForm}
                disabled={isUpdating}
                className="border-primary-800 text-primary-800 hover:bg-primary-50 cursor-pointer rounded-xl border-2 px-7 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                초기화
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-primary-800 border-primary-800 hover:bg-primary-700 hover:border-primary-800/80 cursor-pointer rounded-xl border-2 px-7 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? "저장 중" : "정보 저장하기"}
              </button>
            </div>
          </section>
          <section className="flex-3">
            <EyeCalibration
              className="rounded-xl border border-gray-300 bg-white p-8"
              complete={Boolean(eye)}
            />
          </section>
        </div>
        <div className="flex gap-4 pt-5">
          <button
            onClick={() => setActiveModal("logout")}
            className="flex cursor-pointer gap-2 rounded-xl border-2 bg-white border-gray-400 px-6 py-2 text-gray-600 hover:bg-gray-600 hover:text-white"
          >
            <LogOut size={24} />
            로그아웃
          </button>
          <button
            onClick={() => setActiveModal("delete")}
            className="border-error-01/50 bg-white text-error-01/80 hover:bg-error-01/80 flex cursor-pointer gap-2 rounded-xl border-2 px-6 py-2 hover:text-white"
          >
            <UserMinus size={24} />
            회원 탈퇴
          </button>
        </div>
      </div>

      {noticeModal && (
        <Modal
          isOpen
          variant="single"
          title={noticeModal.title}
          description={noticeModal.description}
          confirmText="확인"
          onClose={closeModal}
          onConfirm={closeModal}
        />
      )}

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
