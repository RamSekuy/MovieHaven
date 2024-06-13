import { IMainApi } from "@/app/_model/axiosInstance.model";
import { MAIN_API } from "../../_config/config";

import axios, { AxiosPromise } from "axios";
import { cookies } from "next/headers";

export default function ssrMainApi() {
  const token = cookies().get("aauth")?.value || "0";
  return axios.create({
    baseURL: MAIN_API,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  }) as IMainApi;
}
