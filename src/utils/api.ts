// lib/goFetcher.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function toUrl(url: string): string {
  return url.startsWith("http")
    ? url
    : `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${url}`;
}

function createFetcher(defaultHeaders: Record<string, string> = {}) {
  const instance = axios.create({
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

      const customError = {
        status: response?.status || 500,
        data: response?.data || {},
        message:
          response?.data?.error ||
          response?.data?.message ||
          err.message ||
          "Something went wrong",
      };

      throw customError;
    }
  };

  return {
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
      handle<T>({ url: toUrl(url), method: "GET", ...config }),

    post: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url: toUrl(url), method: "POST", data, ...config }),

    put: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url: toUrl(url), method: "PUT", data, ...config }),

    patch: <T = any, D = any>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url: toUrl(url), method: "PATCH", data, ...config }),

    delete: <T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig,
    ) => handle<T>({ url: toUrl(url), method: "DELETE", data, ...config }),

    raw: (url: string, method = "POST", config?: AxiosRequestConfig) => {
      return axios.request({
        url: toUrl(url),
        method,
        withCredentials: true,
        validateStatus: () => true, // ✅ Jangan lempar error apapun, biar kita handle sendiri
        ...config,
      });
    },
  };
}

// ✅ Main fetcher
export const goFetcher = Object.assign(createFetcher(), {
  withHeaders: (headers: Record<string, string>) => createFetcher(headers),
});
