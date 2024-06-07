import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { MAIN_API } from "../_config/config";

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
}

class MainAPI {
  private api_url;
  constructor(api_url: `http://${string}`) {
    this.api_url = api_url;
  }
  get mainAPI() {
    const token = getCookie("access_token") || "0";
    return axios.create({
      baseURL: this.api_url,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + token,
      },
    }) as IMainApi;
  }
}

export default new MainAPI(MAIN_API).mainAPI;
