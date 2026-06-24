# 2026 경북대학교 종합설계프로젝트1 001분반 3팀<br/>: AI 기반 모의 면접/발표 도우미 웹 서비스

<p align="center">
  <img width="4186" height="2586" alt="Device - Macbook Pro-3" src="https://github.com/user-attachments/assets/3d0f2ee6-e033-4884-9a44-902023a16b22" />

</p>

> **발표와 면접을 실전처럼 연습하고, AI를 통해 발화 속도·시선·제스처까지 피드백받을 수 있는 훈련 서비스**
>
> 발표 불안과 면접 부담을 줄이기 위한 AI 기반 모의 발표/면접 도우미 웹 서비스

<br />

## 🔗 프로젝트 링크

* **배포 주소**: https://2026-capstone-design-project1-team3.vercel.app/

---

## 📑 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택](#-기술-스택)
4. [기술적 도전 및 논의](#-기술적-도전-및-논의)
5. [팀원 소개](#-팀원-소개)

---

## 📝 프로젝트 소개

### 왜 이 서비스를 만들었나요?

발표와 면접은 많은 사람들에게 큰 부담으로 다가옵니다.

발표에서는 내용을 잊어버릴까 봐 불안해하거나, 여러 사람 앞에서 긴장해 자신의 역량을 충분히 보여주지 못하는 경우가 많습니다.
면접에서도 답변 내용뿐만 아니라 말의 속도, 시선 처리, 자세, 제스처와 같은 비언어적 요소가 중요한 평가 요소로 작용합니다.

하지만 기존의 LLM 기반 면접/발표 보조 서비스는 주로 사용자의 답변 텍스트를 평가하는 데 집중되어 있어, 실제 발표와 면접에서 중요한 비언어적 요소를 함께 피드백하기에는 한계가 있었습니다.

> [!NOTE]
> 본 프로젝트는 발표와 면접을 하나의 환경에서 연습하고, **발화 속도·시선·제스처 등 비언어적 요소까지 함께 분석하는 AI 기반 훈련 서비스**를 목표로 합니다.

* **프로젝트 유형**: 종합설계프로젝트1
* **개발 기간**: 2026년 1학기 (2026.03_2026.05)

---

## ✨ 주요 기능

### 1️⃣ 발표와 면접을 하나의 서비스에서 연습할 수 있어요

> 발표 연습과 면접 연습을 별도로 나누지 않고, 하나의 웹 서비스 안에서 통합적으로 진행할 수 있어요.

| 연습 유형 | 설명                                  |
| ----- | ----------------------------------- |
| 발표 연습 | PPT 기반으로 발표 대본을 생성하고 실전처럼 연습할 수 있어요 |
| 면접 연습 | 포트폴리오와 자기소개서를 기반으로 맞춤형 질문을 생성해요     |

<p align="center">
  <img width="4186" height="2586" alt="d" src="https://github.com/user-attachments/assets/39c47968-a992-4c32-8cc4-2cd06e1a280d" />


</p>

---

### 2️⃣ AI가 발표 대본과 면접 질문을 생성해요

> 사용자가 입력한 자료를 바탕으로 발표 대본을 만들거나, 면접 상황에 맞는 질문을 생성할 수 있어요.

* 발표 자료 기반 AI 발표 대본 생성
* 기존 발표 대본 첨삭
* 포트폴리오 및 자기소개서 기반 면접 질문 생성
* 답변에 따른 AI 피드백 제공

<p align="center">
   <img width="4186" height="2586" alt="Device - Macbook Pro-2" src="https://github.com/user-attachments/assets/5141eb4e-9303-4df9-b21d-47330c60deb9" />
</p>

---

### 3️⃣ 실시간으로 발화 속도를 확인할 수 있어요

> 연습 중 사용자의 음성을 분석해 말이 너무 빠르거나 느리지 않은지 확인할 수 있어요.

* 20초 단위 실시간 발화 속도 분석
* Faster-Whisper 기반 음성 분석
* 발표/면접 중 발화 속도 피드백 제공

<p align="center">
 <img width="4186" height="2586" alt="Device - Macbook Pro-1" src="https://github.com/user-attachments/assets/47dac2e1-a5a0-494a-bfe8-928aa321e0dd" />

</p>

---

### 4️⃣ 시선과 제스처까지 분석해요

> 답변 내용뿐만 아니라 실제 발표와 면접에서 중요한 비언어적 요소까지 함께 분석해요.

| 분석 항목  | 설명                     |
| ------ | ---------------------- |
| 발화 속도  | 말의 빠르기와 안정성을 분석해요      |
| 시선 처리  | 카메라 응시 여부를 분석해요        |
| 제스처    | 몸의 흔들림과 불필요한 손동작을 분석해요 |
| 발화 유창성 | 답변 흐름과 말하기 안정성을 평가해요   |

---

### 5️⃣ 연습 결과를 리포트로 확인할 수 있어요

> 연습이 끝나면 AI가 분석한 결과를 기반으로 리포트를 제공해요.

* 비언어적 표현 분석
* 발화 유창성 분석
* 시선 처리 분석
* 발화 속도 분석
* AI 총평 제공
* 장점 및 개선점 제공

<p align="center">
  <img width="4186" height="2586" alt="Device - Macbook Pro-3" src="https://github.com/user-attachments/assets/3d0f2ee6-e033-4884-9a44-902023a16b22" />
</p>

---

### 6️⃣ 연습 기록과 통계를 확인할 수 있어요

> 사용자는 이전 연습 기록을 확인하고, 자신의 평균적인 발표/면접 습관을 파악할 수 있어요.

* 전체 연습 기록 조회
* 발표/면접별 기록 확인
* 최근 연습 결과 통계 제공
* 개별 연습 결과 리포트 재확인

<p align="center">
  <img width="4186" height="2586" alt="Device - Macbook Pro" src="https://github.com/user-attachments/assets/4a173914-b2e2-467d-bb26-24df4efbd827" />

</p>

---

## 🛠 기술 스택

<table>
  <tr>
    <th>Category</th>
    <th>Stack</th>
  </tr>

  <tr>
    <td>Frontend</td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white">
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white">
      <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white">
      <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white">
      <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white">
      <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white">
    </td>
  </tr>

  <tr>
    <td>Backend</td>
    <td>
      <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white">
      <img src="https://img.shields.io/badge/REST_API-000000?style=flat&logo=fastapi&logoColor=white">
      <img src="https://img.shields.io/badge/SSE-FF6C37?style=flat&logo=server&logoColor=white">
      <img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white">
      <img src="https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white">
      <img src="https://img.shields.io/badge/AWS_SDK-232F3E?style=flat&logo=amazonaws&logoColor=white">
    </td>
  </tr>

  <tr>
    <td>AI Server</td>
    <td>
      <img src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white">
      <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white">
      <img src="https://img.shields.io/badge/Faster--Whisper-000000?style=flat&logo=openai&logoColor=white">
      <img src="https://img.shields.io/badge/MediaPipe-0097A7?style=flat&logo=google&logoColor=white">
      <img src="https://img.shields.io/badge/librosa-FF6F00?style=flat&logoColor=white">
      <img src="https://img.shields.io/badge/sentence--transformers-4285F4?style=flat&logo=huggingface&logoColor=white">
      <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white">
    </td>
  </tr>

  <tr>
    <td>Infra</td>
    <td>
      <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&logo=amazonec2&logoColor=white">
      <img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&logo=amazons3&logoColor=white">
      <img src="https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&logo=amazonrds&logoColor=white">
      <img src="https://img.shields.io/badge/CloudFront-FF9900?style=flat&logo=amazonaws&logoColor=white">
    </td>
  </tr>

</table>

---

## 🚀 기술적 도전 및 논의

### 1. 발표와 면접을 하나의 흐름으로 통합

* 발표 연습과 면접 연습을 별도 기능으로 분리하지 않고, 하나의 서비스 흐름 안에서 사용할 수 있도록 구성
* 발표는 PPT 기반 대본 생성, 면접은 포트폴리오/자기소개서 기반 질문 생성 방식으로 차별화
* 사용자는 목적에 따라 발표 또는 면접을 선택하고, 연습부터 결과 리포트까지 동일한 경험 흐름으로 이용 가능

---

### 2. REST API와 WebSocket을 함께 사용하는 구조 설계

* 안정성이 중요한 데이터 요청은 REST API로 처리
* 실시간 피드백이 필요한 영상/음성 데이터는 WebSocket으로 처리
* 발표/면접 연습 중에는 실시간 발화 속도 피드백을 제공하고, 연습 이후에는 AI 서버에서 심층 분석을 수행하도록 분리

---

### 3. 비언어적 요소 분석 기능 구현

* Faster-Whisper를 활용해 사용자의 발화 속도 분석
* MediaPipe를 활용해 시선과 제스처 분석
* librosa의 피치/에너지/Jitter 지표를 활용해 음성 떨림 및 유창성을 분석
* 텍스트 답변 평가에만 머무르지 않고, 실제 발표/면접 상황에서 중요한 말하기 습관과 비언어적 표현을 함께 피드백

---

## 👥 팀원 소개
| **FRONTEND** | **FRONTEND** | **BACKEND** | **AI** |
| :---: | :---: | :---: | :---: |
| <img src="https://avatars.githubusercontent.com/u/210795642?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/83810621?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/176283083?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/88077984?v=4" width="200"> |
| [한나영](https://github.com/nyoeng) | [유지오](https://github.com/yu-jio) | [노현경](https://github.com/getOffWork102) | [진유민](https://github.com/min212) |
| 플랫폼SW & 데이터과학전공 24학번 | 플랫폼SW & 데이터과학전공 21학번 | 글로벌SW전공 23학번 | 인공지능컴퓨팅전공 24학번 |
| 사용자 친화 UI/UX 디자인<br/>AI Websocket & 백엔드 통신<br/>Vercel 웹 배포<br/>fetch 기반 API 공통 구조 구축<br/>로그인/회원가입 & 면접/발표 준비 & 녹화 & 결과 화면 구현 및 API 연동 | 마이페이지 구현 및 API 연동<br/>발표/면접 기록 구현 및 API 연동<br/>결과 시각화 화면 API 연동<br/>발표/면접 연습 통계 화면 API 연동 | Spring Boot 서버 구축<br/>REST API 설계 및 구현<br/>AWS EC2/S3/RDS 인프라 구축<br/>SSE & Webhook 기반 하이브리드 통신 아키텍처 구현<br/>LLM 프롬프팅 (대본 생성/첨삭, 총평, 요약, 꼬리질문) |  Faster-Whisper / librosa 기반 음성 분석 모델 구현<br/>MediaPipe 기반 시선/제스처 분석 모델 구현<br/>sentence-transformers 대본 유사도 분석 모델 구현<br/>AI 서버(FastAPI + WebSocket) 구축<br/>EC2 배포 및 메모리 최적화 |
