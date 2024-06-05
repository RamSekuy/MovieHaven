import React, { FormEvent, ReactNode } from "react";
import mainAPI from "@/app/_lib/mainApi";
import { TRoute } from "@/app/_lib/mainApi";

interface BackEndFormProps {
  action: TRoute[keyof TRoute];
  method: string;
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
      const res = await mainAPI({
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
