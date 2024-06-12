// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MAIN_API } from "../_config/config";
// import { cookies } from "next/headers";

import axios, { AxiosPromise } from "axios";
import { cookies } from "next/headers";

// export type TMainApiRespone = {
//   message: string;
//   data: any;
// };

// export type TRoute = {
//   movie: "/movie" | `/movie/${string}`;
//   user: "/user" | `/user/${string}`;
//   staff: "/staff" | `/staff/${string}`;
//   ticket: "/ticket" | `/ticket/${string}`;
//   branch: "/branch" | `/branch/${string}`;
//   transaction: "/transaction" | `/transaction/${string}`;
//   rating: "/rating" | `/rating/${string}`;
// };

// interface IMainApi extends AxiosInstance {
//   get<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
//     url: TRoute[keyof TRoute],
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
//   delete<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
//     url: TRoute[keyof TRoute],
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
//   post<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
//     url: TRoute[keyof TRoute],
//     data?: D,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
//   put<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
//     url: TRoute[keyof TRoute],
//     data?: D,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
//   patch<T = TMainApiRespone, R = AxiosResponse<T>, D = any>(
//     url: TRoute[keyof TRoute],
//     data?: D,
//     config?: AxiosRequestConfig<D>
//   ): Promise<R>;
// }

// class MainAPI {
//   private api_url;
//   constructor(api_url: `http://${string}`) {
//     this.api_url = api_url;
//   }

//   get SSRApi() {
//     const token = cookies().get("aauth")?.value;
//     return axios.create({
//       baseURL: this.api_url,
//       withCredentials: true,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }) as IMainApi;
//   }
// }

// export const SSRApi = new MainAPI(MAIN_API).SSRApi;

export default function SSRApi() {
  const token = cookies().get("aauth")?.value;
  return axios.create({
    baseURL: MAIN_API,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
