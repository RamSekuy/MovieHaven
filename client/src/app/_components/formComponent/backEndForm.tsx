import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { TRoute } from "@/app/_model/axiosInstance.model";
import React, { FormEvent, ReactNode } from "react";

interface BackEndFormProps {
  action: TRoute[keyof TRoute];
  method: "get" | "post" | "patch" | "delete";
  children: ReactNode;
  className?: string;
  onSuccess: (res: any) => void;
  onFail?: (error: any) => void;
  data: { [key: string]: any };
}

const BackEndForm: React.FC<BackEndFormProps> = ({
  action,
  method,
  children,
  className,
  onSuccess,
  onFail,
  data,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(data);
      const res = await csrMainApi()({
        method,
        url: action,
        data,
      });
      onSuccess(res);
    } catch (error) {
      if (onFail) {
        onFail(error);
      } else {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

export default BackEndForm;
