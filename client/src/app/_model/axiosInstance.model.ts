import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type TMainApiRespone = {
  message: string;
  data: any;
};

export type TRoute = {
  movie: "/movie" | `/movie/${string}`;
  user: "/user" | `/user/${string}`;
  staff: "/staff" | `/staff/${string}`;
  ticket: "/ticket" | `/ticket/${string}`;
  branch: "/branch" | `/branch/${string}`;
  transaction: "/transaction" | `/transaction/${string}`;
  rating: "/rating" | `/rating/${string}`;
};

export interface IMainApi extends AxiosInstance {
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
}
