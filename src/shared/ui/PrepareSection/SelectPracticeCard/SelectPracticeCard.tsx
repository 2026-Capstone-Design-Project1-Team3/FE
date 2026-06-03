import React from "react";

import { CirclePlus, History, List } from "lucide-react";

type SelectPracticeProps = {
  isSelected: boolean;
  practiceType: "interview" | "presentation";
  onClick: () => void;
};

type NewPracticeProps = SelectPracticeProps & {
  variant: "new";
};

type ExistingPracticeProps = SelectPracticeProps & {
  variant: "existing";
  folderName?: string;
  onListClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type SelectPracticeCardProps = NewPracticeProps | ExistingPracticeProps;

const NewPracticeContent = ({
  practiceType,
  isSelected,
}: {
  practiceType: "interview" | "presentation";
  isSelected: boolean;
}) => {
  const typeText = practiceType === "interview" ? "면접" : "발표";

  const descriptionText =
    practiceType === "interview"
      ? "지원하고자 하는 회사와 직무를 설정하여 실전 같은 면접 준비를 시작해 보세요."
      : "발표 주제와 대본을 입력하여 새로운 발표 연습을 시작해 보세요.";

  const iconBgClass = isSelected ? "bg-primary-100" : "bg-gray-100";

  return (
    <>
      <div
        className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full transition-colors ${iconBgClass}`}
      >
        <CirclePlus />
      </div>
      <h3 className="mb-4 text-head-03">새로운 {typeText} 준비</h3>
      <p className="text-body-02 text-center">{descriptionText}</p>
    </>
  );
};

const ExistingPracticeContent = ({
  practiceType,
  isSelected,
  folderName,
  onListClick,
}: ExistingPracticeProps) => {
  const typeText = practiceType === "interview" ? "면접" : "발표";

  const iconBgClass = isSelected ? "bg-primary-100" : "bg-gray-100";

  return (
    <>
      <div
        className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full transition-colors ${iconBgClass}`}
      >
        <History />
      </div>
      <h3 className="mb-4 text-head-03">기존 {typeText} 이어하기</h3>
      <p className="mb-4 text-body-02 text-center">
        이전에 설정했던 환경에서 이어서 연습합니다.
      </p>

      {folderName && (
        <div className="mb-4 text-subtitle-04 text-gray-700">{folderName}</div>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onListClick(e);
        }}
        className="flex items-center justify-center gap-2 px-4 py-1.5 text-caption-01 border border-primary-500 rounded-md text-primary-800 hover:bg-primary-100/20 bg-white transition-colors"
      >
        <List className="w-4 h-4" />
        <span className="pt-0.5">목록 보기</span>
      </button>
    </>
  );
};

export const SelectPracticeCard = (props: SelectPracticeCardProps) => {
  const { variant, isSelected, onClick } = props;

  const baseCardClass =
    "flex flex-col w-full items-center justify-center p-8 border-2 rounded-xl cursor-pointer transition-all h-72 bg-background-light";
  const selectedClass = isSelected
    ? "border-primary-900 text-primary-900 hover:bg-[#F9FDFF] bg-white"
    : "border-border-deactivated text-text-tertiary hover:border-gray-300 hover:bg-background-dark";

  return (
    <div
      className={`${baseCardClass} ${selectedClass}`.trim()}
      onClick={onClick}
    >
      {variant === "new" ? (
        <NewPracticeContent
          practiceType={props.practiceType}
          isSelected={isSelected}
        />
      ) : (
        <ExistingPracticeContent {...props} />
      )}
    </div>
  );
};
