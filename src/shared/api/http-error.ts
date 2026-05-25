interface ApiHttpErrorOptions {
  status: number;
  message: string;
  method: string;
  url: string;
  payload?: unknown;
}

export class ApiHttpError extends Error {
  readonly status: number;
  readonly method: string;
  readonly url: string;
  readonly payload?: unknown;

  constructor(options: ApiHttpErrorOptions) {
    super(options.message);
    this.name = "ApiHttpError";
    this.status = options.status;
    this.method = options.method;
    this.url = options.url;
    this.payload = options.payload;
  }
}

export const isApiHttpError = (error: unknown): error is ApiHttpError => {
  return error instanceof ApiHttpError;
};
