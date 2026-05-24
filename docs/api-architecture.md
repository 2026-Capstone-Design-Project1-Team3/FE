# 프로젝트 공통 API 구조 가이드

## 1) 목적

- 팀원이 병렬로 작업해도 API 호출 방식, 에러 처리, 인증 토큰 관리, 캐싱 정책이 섞이지 않도록 기준점을 통일합니다.
- 화면(UI) 구현 코드와 API 통신 코드를 완벽히 분리해서 유지보수 비용을 낮춥니다.
- 백엔드 명세 변경 시 수정 범위를 최소화합니다.

## 1-1) 왜 공통 구조를 사용하는가?

단순히 "코드를 예쁘게" 만들기 위함이 아니라, 실제 장애와 협업 비용을 줄이기 위함입니다.

1. 요청/응답 규칙, 토큰 삽입을 한 곳에서 통일할 수 있습니다.
2. 서버 스펙 변경 시 수정 범위를 `entities` 폴더 중심으로 제한할 수 있습니다.
3. React Query 캐시 키 규칙을 통일해 데이터 불일치 문제를 줄일 수 있습니다.
4. UI 담당자가 API 세부 구현(헤더, 파싱)을 몰라도 화면 조립에 집중할 수 있습니다.
5. 코드 리뷰 기준이 명확해집니다. (예: "컴포넌트에서 fetch 직접 호출 금지")

## 1-2) 공통 구조를 사용하지 않았을 때 겪는 에러 예시

### 케이스 A: 환경별 URL 하드코딩으로 인한 호출 실패

```ts
// 페이지 내부에서 직접 호출
await fetch("http://localhost:8080/user/me");
```

- 로컬에서는 동작하지만, 배포 환경에서는 CORS/네트워크 오류 발생.
- 팀원마다 URL 작성 방식이 달라 dev/prod 환경에서 오작동.

### 케이스 B: 인증 토큰 누락으로 인한 401 반복

```ts
await fetch("/folder"); // 헤더 누락
```

- JWT 기반 인증인데 `Authorization: Bearer ...` 헤더 세팅 누락.
- 로그인 상태인데도 "인증 필요" 오류가 반복 발생.

### 케이스 C: 백엔드 텍스트/JSON 혼용 응답 파싱 에러

```ts
const response = await fetch("/user/login");
const data = await response.json(); // 백엔드가 "로그인 성공" 텍스트를 주면 여기서 크래시
```

- JSON 파싱 오류로 인해 런타임 크래시 발생.

### 케이스 D: Query Key 규칙 불일치로 캐시 꼬임

```ts
// 팀원 A
useQuery({ queryKey: ["folders", "list"], ... });
// 팀원 B
useQuery({ queryKey: ["folder", { page: 1 }], ... });
```

- invalidate 시 일부 데이터만 갱신됨.
- "폴더 생성했는데 목록에 안 보임" 같은 이슈 발생.

---

## 2) 폴더 구조

```text
src/
  shared/
    api/
      client.ts            # fetch 래퍼(토큰 자동삽입, 텍스트/JSON 파싱, 에러 변환)
      endpoints.ts         # endpoint 상수/함수
      http-error.ts        # 공통 HTTP 에러 타입
      query-client.ts      # React Query 전역 설정
      query-keys.ts        # Query Key 팩토리
      response.ts          # 에러 응답 타입 가드
  entities/                # 도메인별 API 단일 호출 함수 및 타입 정의
    user/
    folder/
    analysis/
    file/
  features/                # UI 컴포넌트에서 직접 가져다 쓰는 React Query 훅
    user/
    folder/
```

---

## 3) 응답/에러 규칙

### 성공 응답

- 백엔드 응답이 JSON 객체이든 순수 텍스트이든 `apiClient`가 알아서 판단하여 파싱합니다.
- 컴포넌트나 훅에서는 파싱 로직을 신경 쓸 필요 없이 바로 데이터를 사용하면 됩니다.

### 에러 응답

- `apiClient`는 실패 시 응답을 `ApiHttpError` 객체로 감싸서 throw 합니다.
- 만약 `401 Unauthorized` 에러가 발생하면, `apiClient` 내부에서 자동으로 로컬 스토리지의 토큰을 삭제합니다.

---

## 4) React Query 기준

- 전역 기본값 (`shared/api/query-client.ts`):
  - `refetchOnWindowFocus: false` (창 다시 봤다고 무의미한 API 재호출 방지)
  - `staleTime: 30s`
  - `queries.retry`: 400, 401, 403, 404 에러는 재시도하지 않음.
  - `mutations.retry: 0`
- Query Key는 무조건 `shared/api/query-keys.ts`에서만 가져와서 사용합니다.

---

## 5) API 사용 흐름 예시 (폴더 목록 조회)

게시글 목록 조회를 예로 들면, 아래 순서로 흐릅니다.

1. endpoint는 `shared/api/endpoints.ts`에서 관리
2. 실제 통신 함수는 `entities/folder/api/getFolders.ts`에서 수행
3. 화면용 로직은 `features/folder/model/useFolderListQuery.ts`에서 감쌈
4. 페이지 컴포넌트는 훅만 사용해 UI 렌더링

### Step 1: Entities API (통신 담당)

```ts
// src/entities/folder/api/getFolders.ts
import type {
  FolderListQuery,
  FolderListResponse,
} from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getFolders = (params?: FolderListQuery) => {
  return apiClient.get<FolderListResponse>(API_ENDPOINTS.folder.base, {
    params,
  });
};
```

### Step 2: Features Hook (화면과 연결)

```ts
// src/features/folder/model/useFolderListQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "@/entities/folder/api/getFolders";
import type { FolderListQuery } from "@/entities/folder/model/types";
import { queryKeys } from "@/shared/api/query-keys";

interface UseFolderListQueryOptions extends FolderListQuery {
  enabled?: boolean;
}

export const useFolderListQuery = (options: UseFolderListQueryOptions = {}) => {
  const { enabled = true, ...params } = options;
  return useQuery({
    enabled,
    queryFn: () => getFolders(params),
    queryKey: queryKeys.folder.list(params),
  });
};
```

### Step 3: Page 사용

```tsx
// src/pages/MainPage.tsx
import { useFolderListQuery } from "@/features/folder/model/useFolderListQuery";

const MainPage = () => {
  const { data, isLoading, error } = useFolderListQuery({ limit: 10, page: 1 });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return <div>{/* data 렌더링 */}</div>;
};
```

---

## 6) 환경 변수

- `.env` 또는 `.env.local` 파일에 백엔드 주소를 기입합니다.
  - `VITE_API_BASE_URL=https://api.yourbackend.com`
- 값이 비어 있으면 같은 origin 기준 상대 경로로 호출합니다.

## 7) 팀 공통 작업 규칙

- API 호출 시 컴포넌트에서 직접 `fetch`나 `apiClient`를 사용하지 않습니다. 반드시 `features/*/model`의 훅을 만들어서 사용합니다.
- 서버 API 명세가 추가/변경될 경우 수정 순서:
  1. `entities/*/model/types.ts` (타입 변경)
  2. `shared/api/endpoints.ts` 및 `query-keys.ts` (주소/키 변경)
  3. `entities/*/api/*` (통신 함수 변경)
  4. `features/*/model/*` (훅 변경)
  5. 화면 컴포넌트 수정
