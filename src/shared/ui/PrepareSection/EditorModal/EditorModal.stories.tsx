import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { EditorModal } from "./EditorModal";

import { Button } from "@/shared/ui/Button/Button";

const meta: Meta<typeof EditorModal> = {
  title: "UI/PrepareSection/EditorModal",
  component: EditorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EditorModal>;

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [original] = useState(
    "안녕하세요. 오늘 발표를 맡게 된 마케팅팀 팀장입니다.\n\n저희 팀은 지난 분기 동안 여러 가지 캠페인을 진행했는데요. 생각보다 성과가 괜찮게 나왔습니다. 특히 SNS 쪽에서 반응이 뜨거웠고, 이를 통해서 신규 고객 유입이 작년 대비 약 20% 정도 늘어났어요.\n\n사실 처음에는 좀 걱정도 많았는데, 팀원들이 다 같이 열심히 해주어서 좋은 결과를 낼 수 있었던 것 같습니다. 이번 성과를 바탕으로 내년 분기에는 더 큰 목표를 세워보려고 합니다.\n안녕하세요. 오늘 발표를 맡게 된 마케팅팀 팀장입니다.\n\n저희 팀은 지난 분기 동안 여러 가지 캠페인을 진행했는데요. 생각보다 성과가 괜찮게 나왔습니다. 특히 SNS 쪽에서 반응이 뜨거웠고, 이를 통해서 신규 고객 유입이 작년 대비 약 20% 정도 늘어났어요.\n\n사실 처음에는 좀 걱정도 많았는데, 팀원들이 다 같이 열심히 해주어서 좋은 결과를 낼 수 있었던 것 같습니다. 이번 성과를 바탕으로 내년 분기에는 더 큰 목표를 세워보려고 합니다.",
  );
  const [enhanced] = useState(
    "안녕하십니까. 마케팅팀의 성과 분석 및 향후 전략 발표를 맡은 팀장 OOO입니다.\n\n지난 분기, 저희 팀은 다각화된 캠페인 전략을 통해 유의미한 성장을 이끌어냈습니다. 특히 디지털 채널 중심의 집중 마케팅이 주효했으며, 그 결과 신규 고객 유입률이 전년 동기 대비 20% 성장하는 성과를 거두었습니다.\n\n프로젝트 초기 단계의 불확실성에도 불구하고, 팀원들의 헌신적인 협업 덕분에 기대 이상의 정량적 지표를 확보할 수 있었습니다. 이러한 성공 경험은 단순한 수치를 넘어 차기 분기 공격적인 목표 설정을 위한 강력한 동력이 될 것입니다.",
  );

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>AI 첨삭 에디터 열기</Button>
      <EditorModal
        isOpen={isOpen}
        originalScript={original}
        enhancedScript={enhanced}
        onClose={() => setIsOpen(false)}
        onSave={(updated) => {
          console.info("저장된 대본:", updated);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};
