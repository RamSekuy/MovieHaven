import { MAIN_API } from "@/app/_config/config";
import { IMainApi } from "@/app/_model/axiosInstance.model";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function csrMainApi() {
  const token = getCookie("aauth") || "0";
  return axios.create({
    baseURL: MAIN_API,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  }) as IMainApi;
}
