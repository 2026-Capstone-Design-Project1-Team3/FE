# API 파일별 역할 정리

이 문서는 프로젝트에 구축된 API 레이어 파일들이 **무엇을 하는지**, **왜 필요한지**를 빠르게 파악하기 위한 가이드입니다.

---

## 1) `shared/api` (공통 기반)

| 파일              | 역할 및 작성 이유                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `client.ts`       | `fetch` 공통 래퍼. JWT 토큰 자동 헤더 주입, 응답 포맷(Text/JSON) 자동 파싱, 401 에러 시 스토리지 초기화 로직이 포함되어 있습니다. |
| `endpoints.ts`    | API 경로 상수 및 동적 파라미터 함수(`detail(id)` 등) 관리. 문자열 하드코딩을 방지합니다.                                          |
| `http-error.ts`   | 공통 HTTP 에러 클래스(`ApiHttpError`). 에러 정보를 규격화하여 프론트에서 안전하게 처리하도록 돕습니다.                            |
| `response.ts`     | 에러 응답 타입 가드 제공. 백엔드 에러 포맷을 안전하게 검사합니다.                                                                 |
| `query-client.ts` | React Query 전역 설정. 재시도(Retry) 조건과 캐싱 타임 정책을 공통화합니다.                                                        |
| `query-keys.ts`   | 도메인별 쿼리 키 팩토리. 캐시 무효화 및 키 중복 생성 실수를 방지합니다.                                                           |

---

## 2) `entities` (API 스펙 타입 + 단일 호출 함수)

### `user` 도메인

| 주요 파일             | 역할                                                                 |
| --------------------- | -------------------------------------------------------------------- |
| `model/types.ts`      | 회원가입, 로그인, 정보 수정 등의 Request/Response 타입 정의          |
| `api/login.ts`        | `POST /user/login` 호출 (토큰은 client.ts가 알아서 저장함)           |
| `api/getMyProfile.ts` | `GET /user/me` 호출 (내 정보 조회)                                   |
| `api/setEye.ts`       | `POST /user/eye` 호출 (비밀 헤더 `X-Internal-Secret` 주입 로직 포함) |

### `folder` 도메인

| 주요 파일             | 역할                                                       |
| --------------------- | ---------------------------------------------------------- |
| `model/types.ts`      | 폴더 목록 조회 파라미터(`type` 변경), 생성, 삭제 타입 정의 |
| `api/getFolders.ts`   | `GET /folder` 호출 (목록 조회)                             |
| `api/createFolder.ts` | `POST /folder` 호출 (폴더 생성)                            |

### `analysis` 도메인

| 주요 파일                  | 역할                                                          |
| -------------------------- | ------------------------------------------------------------- |
| `model/types.ts`           | 카드뉴스 쿼리 파라미터(`type` 변경), 분석 상세/통계 타입 정의 |
| `api/getAnalysisDetail.ts` | `GET /analysis/{analysisId}` 호출                             |
| `api/getCardNews.ts`       | `GET /analysis/cardNews` 호출                                 |

### `file` 도메인

| 주요 파일                | 역할                                      |
| ------------------------ | ----------------------------------------- |
| `model/types.ts`         | 파일 업로드 URL 응답 타입 정의            |
| `api/getPresignedUrl.ts` | `GET /files/presignedUrl/{fileName}` 호출 |

---

## 3) `features` (도메인 동작 조합 훅)

UI 컴포넌트에서 직접 가져다 쓰는 React Query 훅들이 위치합니다.

- **조회성 데이터:** `useQuery`를 활용해 파라미터와 데이터를 관리. (예: `useFolderListQuery`)
- **생성/수정/삭제:** `useMutation`을 활용하며, 성공(`onSuccess`) 시 관련된 캐시 키를 무효화(`invalidateQueries`)하여 화면을 갱신. (예: `useLoginMutation`, `useCreateFolderMutation`)
