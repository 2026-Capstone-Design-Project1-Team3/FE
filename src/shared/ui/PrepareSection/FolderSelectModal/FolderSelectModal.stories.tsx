import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { FolderSelectModal, type FolderData } from "./FolderSelectModal";

import { Button } from "@/shared/ui/Button/Button";

const meta: Meta<typeof FolderSelectModal> = {
  title: "UI/Modal/FolderSelectModal",
  component: FolderSelectModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FolderSelectModal>;

const MOCK_FOLDERS: FolderData[] = [
  { id: "1", title: "기술 면접 대비", date: "2024.05.12", videoCount: 14 },
  { id: "2", title: "제품 발표 준비", date: "2024.05.08", videoCount: 8 },
  { id: "3", title: "대외 협력 PT", date: "2024.04.25", videoCount: 5 },
  { id: "4", title: "자기소개 리허설", date: "2024.04.10", videoCount: 22 },
];

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>폴더 선택 모달 열기</Button>

      <div className="mt-4 text-center text-body-01">
        현재 선택된 폴더 ID: {selectedFolderId || "없음"}
      </div>

      <FolderSelectModal
        isOpen={isOpen}
        folders={MOCK_FOLDERS}
        selectedFolderId={selectedFolderId}
        onClose={() => setIsOpen(false)}
        onSelectFolder={(id) => setSelectedFolderId(id)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};
