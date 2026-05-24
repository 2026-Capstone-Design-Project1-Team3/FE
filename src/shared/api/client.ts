import { ApiHttpError } from "@/shared/api/http-error";
import { isApiErrorResponse } from "@/shared/api/response";

type HttpMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
type QueryPrimitive = boolean | number | string;
type QueryValue = null | QueryPrimitive | QueryPrimitive[] | undefined;
type QueryParams = Record<string, QueryValue>;
type NativeBodyInit = globalThis.BodyInit;
type NativeHeadersInit = globalThis.HeadersInit;
type NativeRequestInit = globalThis.RequestInit;

interface ApiRequestOptions extends Omit<
  NativeRequestInit,
  "body" | "headers" | "method"
> {
  body?: NativeBodyInit | null | object;
  headers?: NativeHeadersInit;
  method?: HttpMethod;
  params?: QueryParams;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").trim();

const isAbsoluteUrl = (path: string) => /^https?:\/\//.test(path);

const joinUrl = (base: string, path: string) => {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const buildUrl = (path: string, params?: QueryParams) => {
  const resolvedPath = isAbsoluteUrl(path) ? path : path;
  const baseResolvedPath =
    isAbsoluteUrl(resolvedPath) || API_BASE_URL.length === 0
      ? resolvedPath
      : joinUrl(API_BASE_URL, resolvedPath);

  const url = new URL(
    baseResolvedPath,
    typeof window !== "undefined" ? window.location.origin : "http://localhost",
  );

  if (params) {
    Object.entries(params).forEach(([key, rawValue]) => {
      if (rawValue === undefined || rawValue === null) return;
      if (Array.isArray(rawValue)) {
        rawValue.forEach((value) =>
          url.searchParams.append(key, String(value)),
        );
        return;
      }
      url.searchParams.set(key, String(rawValue));
    });
  }

  return isAbsoluteUrl(baseResolvedPath)
    ? url.toString()
    : `${url.pathname}${url.search}`;
};

const isJsonBody = (body: unknown): body is object => {
  if (body === null || body === undefined) return false;
  if (
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof ArrayBuffer ||
    body instanceof URLSearchParams ||
    typeof body === "string"
  ) {
    return false;
  }
  return typeof body === "object";
};

const parseResponsePayload = async (response: Response) => {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const request = async <TResponse = unknown>(
  path: string,
  options: ApiRequestOptions = {},
) => {
  const { body, headers, method = "GET", params, ...init } = options;

  const requestUrl = buildUrl(path, params);
  const normalizedHeaders = new Headers(headers);

  if (isJsonBody(body) && !normalizedHeaders.has("Content-Type")) {
    normalizedHeaders.set("Content-Type", "application/json");
  }

  // 요청 보낼 때: 로컬스토리지에 토큰이 있으면 헤더에 담아서 보냄
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    normalizedHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(requestUrl, {
    ...init,
    body:
      body === undefined
        ? undefined
        : body === null
          ? null
          : isJsonBody(body)
            ? JSON.stringify(body)
            : body,
    headers: normalizedHeaders,
    method,
  });

  // 응답 받을 때: 백엔드가 헤더에 새 토큰을 줬다면 낚아채서 로컬스토리지에 저장 (로그인 처리)
  const authHeader =
    response.headers.get("authorization") ||
    response.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const newToken = authHeader.replace("Bearer ", "");
    localStorage.setItem("accessToken", newToken);
  }

  const payload = await parseResponsePayload(response);

  // 에러 처리
  if (!response.ok) {
    // 만약 토큰 만료 등 인증 에러(401)가 나면 로컬스토리지 비우기
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      // 필요 시 여기서 window.location.href = '/login'; 처리 가능
    }

    let errorMessage = `${method} ${requestUrl} failed with status ${response.status}`;

    if (typeof payload === "string") {
      errorMessage = payload;
    } else if (isApiErrorResponse(payload) && payload.message) {
      errorMessage = payload.message;
    }

    throw new ApiHttpError({
      message: errorMessage,
      method,
      payload,
      status: response.status,
      url: requestUrl,
    });
  }

  return payload as TResponse;
};

export const apiClient = {
  delete: <TResponse = unknown>(
    path: string,
    options: ApiRequestOptions = {},
  ) => request<TResponse>(path, { ...options, method: "DELETE" }),
  get: <TResponse = unknown>(path: string, options: ApiRequestOptions = {}) =>
    request<TResponse>(path, { ...options, method: "GET" }),
  patch: <TResponse = unknown>(path: string, options: ApiRequestOptions = {}) =>
    request<TResponse>(path, { ...options, method: "PATCH" }),
  post: <TResponse = unknown>(path: string, options: ApiRequestOptions = {}) =>
    request<TResponse>(path, { ...options, method: "POST" }),
  put: <TResponse = unknown>(path: string, options: ApiRequestOptions = {}) =>
    request<TResponse>(path, { ...options, method: "PUT" }),
  request,
};
