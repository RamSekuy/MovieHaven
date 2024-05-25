"use client";
import { FormEvent } from "react";
import mainAPI, { TMainApiRespone, TRoute } from "@/app/_lib/mainApi";
import { ReactNode } from "react";
import { AxiosResponse } from "axios";

interface IFormProps {
  method?: "get" | "post" | "delete" | "patch";
  action: TRoute[keyof TRoute];
  children?: ReactNode;
  className?: string;
  onSuccess: (res: AxiosResponse<TMainApiRespone>) => void;
  onFail?: (err: unknown) => void;
}

export default function BackEndForm({
  method = "get",
  className = "",
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
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
