import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScriptEditor } from "./ScriptEditor";

const meta: Meta<typeof ScriptEditor> = {
  title: "UI/PrepareSection/ScriptEditor",
  component: ScriptEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScriptEditor>;

const MOCK_TEXT =
  "안녕하십니까, 오늘 저는 2024년 4분기 경영 전략에 대해 발표하게 된 홍길동입니다.\n\n이번 분기의 핵심 목표는 '지속 가능한 성장'과 '디지털 혁신'입니다. 먼저 상반기 성과를 되짚어보면, 우리는 전년 대비 15%의 매출 성장을 기록했습니다. 하지만 글로벌 공급망의 불안정성이라는 외부 요인으로 인해 영업이익률은 소폭 감소한 추세를 보였습니다.\n\n이에 따라 4분기에는 다음과 같은 세 가지 핵심 전략을 추진하고자 합니다.\n첫째, 인공지능 기술을 활용한 업무 효율화입니다. AI 멘토 시스템을 도입하여 직원들의 역량을 강화하고 반복적인 업무 시간을 30% 단축할 계획입니다.\n둘째, 고객 경험 데이터 분석을 통한 개인화 마케팅 강화입니다.\n마지막으로 ESG 경영의 일환으로 친환경 패키징 도입을 확대할 예정입니다.";

const EditorWrapper = () => {
  const [text, setText] = useState("");
  return (
    <div className="w-200">
      <ScriptEditor value={text} onChange={setText} status="default" />
    </div>
  );
};

export const Default: Story = {
  render: () => <EditorWrapper />,
};

export const LoadingMode: Story = {
  render: () => (
    <div className="w-200">
      <ScriptEditor value={MOCK_TEXT} status="loading" onChange={() => {}} />
    </div>
  ),
};

export const DisabledMode: Story = {
  render: () => (
    <div className="w-200">
      <ScriptEditor value={MOCK_TEXT} status="disabled" onChange={() => {}} />
    </div>
  ),
};
