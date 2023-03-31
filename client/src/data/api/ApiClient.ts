import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";

export const formatUrl = (url: string, querystringParams?: any) => {
  const delim = url.indexOf("?") > -1 ? "&" : "?";
  var params = querystringParams
    ? qs.stringify(querystringParams, { indices: false })
    : null;
  return `${url}${params ? delim + params : ""}`;
};

export class ApiClient {
  private http: AxiosInstance;
  private config?: AxiosRequestConfig;

  constructor(rootUrl?: string) {
    this.http = axios.create({
      baseURL: rootUrl ? rootUrl : "http://localhost:8080/api",
      headers: {
        "Content-type": "application/json",
      },
    });
    this.config = {
      headers: {},
    };
  }

  public withResponseHandler({
    onResponse,
    onResponseError,
  }: {
    onResponse: (
      response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>;
    onResponseError: (error: any) => any;
  }) {
    this.http.interceptors.response.use(onResponse, onResponseError);
    return this;
  }

  public async get<T>(
    path: string,
    params: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const combinedConfig = { ...this.config, ...(options || {}) };
    return this.http
      .get(formatUrl(path, params), combinedConfig)
      .then((res) => res.data);
  }

  public async post<T, TT>(
    path: string,
    payload: T,
    options?: { queryParams?: any } & AxiosRequestConfig
  ): Promise<TT> {
    const { queryParams, ...config } = options || { queryParams: undefined };
    const combinedConfig = {
      ...this.config,
      ...config,
    };
    return this.http
      .post(formatUrl(path, queryParams || undefined), payload, combinedConfig)
      .then((res) => res.data);
  }

  public async put<T, TT>(
    path: string,
    payload: T,
    options?: { queryParams?: any } & AxiosRequestConfig
  ): Promise<TT> {
    const { queryParams, ...config } = options || { queryParams: undefined };
    const combinedConfig = {
      ...this.config,
      ...config,
    };
    return this.http
      .put(formatUrl(path, queryParams || undefined), payload, combinedConfig)
      .then((res) => res.data);
  }
}
