import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type TMainApiRespone = {
  message: string;
  data: any;
};

export type TRoute = {
  movie: "/movie" | `/movie/${string}`;
  user: "/user" | `/user/${string}`;
  staff: "/staff" | `/staff/${string}`;
  ticket: "/ticket" | `/ticket/${string}`;
};

interface IMainApi extends AxiosInstance {
  get<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  delete<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  post<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  postForm<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  putForm<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patchForm<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
    url: TRoute[keyof TRoute],
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}

const mainAPI = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
}) as IMainApi;

export default mainAPI;
