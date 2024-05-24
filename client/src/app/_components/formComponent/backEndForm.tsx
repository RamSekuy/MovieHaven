"use client";
import { FormEvent } from "react";
import mainAPI from "@/app/_lib/axios";
import { ReactNode } from "react";
import { AxiosResponse } from "axios";

interface IFormProps {
  method?: "get" | "post" | "delete" | "patch";
  action: string;
  children?: ReactNode;
  classname?: string;
  onSuccess: (res: AxiosResponse<{ data: any; message: string }>) => void;
  onFail?: (err: unknown) => void;
}

export default function BackEndForm({
  method = "get",
  classname = "",
  action,
  children,
  onSuccess,
  onFail = (err: unknown) => {
    console.log(err);
  },
}: IFormProps) {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //Make Request data input
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await mainAPI[method](
        action,
        method === "get" ? { params: data } : (data as {})
      );
      onSuccess(response);
    } catch (error) {
      onFail(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className={classname}>
      {children}
    </form>
  );
}
