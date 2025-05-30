import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

function createFetcher(defaultHeaders: Record<string, string> = {}): {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  put: <T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  delete: <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  raw: (
    url: string,
    method?: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>;
} {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    withCredentials: true,
    headers: defaultHeaders,
  });

  const handle = async <T>(config: AxiosRequestConfig): Promise<T> => {
    try {
      const res: AxiosResponse<T> = await instance.request(config);

      return res.data;
    } catch (err: any) {
      const response = err.response;

      throw {
        status: response?.status || 500,
        data: response?.data || {},
        message:
          response?.data?.error ||
          response?.data?.message ||
          err.message ||
          "Something went wrong",
      };
    }
  };

  return {
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
      handle<T>({ url, method: "GET", ...config }),

    post: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url, method: "POST", data, ...config }),

    put: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url, method: "PUT", data, ...config }),

    patch: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url, method: "PATCH", data, ...config }),

    delete: <T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url, method: "DELETE", data, ...config }),

    raw: (url: string, method = "POST", config?: AxiosRequestConfig) =>
      instance.request({ url, method, ...config }),
  };
}

// ✅ Default fetcher
export const goFetcher = Object.assign(createFetcher(), {
  withHeaders: (headers: Record<string, string>) => createFetcher(headers),
});

// ✅ Untuk response yang hanya perlu `data`
export async function safeCall<T extends { status: number; data: any }>(
  promise: Promise<T>,
): Promise<[T, null] | [null, any]> {
  try {
    const res = await promise;

    if (res.status >= 400) {
      throw {
        status: res.status,
        data: res.data,
        message: res.data?.error || "Request failed",
      };
    }

    return [res, null];
  } catch (err) {
    return [null, err];
  }
}

// ✅ Untuk full AxiosResponse (status, headers, dsb)
export async function safeRawCall<T = any>(
  promise: Promise<AxiosResponse<T>>,
): Promise<[AxiosResponse<T>, null] | [null, any]> {
  try {
    const res = await promise;

    return [res, null];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return [
        null,
        {
          status: err.response?.status,
          message:
            err.response?.data?.error ||
            err.response?.data?.message ||
            err.message,
          data: err.response?.data,
        },
      ];
    }

    return [null, { status: 500, message: "Unknown error", data: null }];
  }
}
