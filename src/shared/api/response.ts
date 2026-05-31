export interface ApiInvalidField {
  field: string;
  reason: string;
  rejectedValue?: string;
}

export interface ApiErrorResponse {
  message?: string;
  status?: number;
  errorCode?: string;
  invalidFields?: ApiInvalidField[];
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

export const isApiErrorResponse = (
  value: unknown,
): value is ApiErrorResponse => {
  if (!isObject(value)) {
    return false;
  }
  return typeof value.status === "number" || typeof value.message === "string";
};
