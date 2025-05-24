import https from "https";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export function rawServerOnly<T = any>(
  url: string,
  method: string = "GET",
  config: AxiosRequestConfig = {},
): Promise<AxiosResponse<T>> {
  return axios.request<T>({
    url,
    method,
    withCredentials: true,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // ✅ Allow mkcert in dev
    ...config,
  });
}
