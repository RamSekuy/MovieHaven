import React, { FormEvent, ReactNode } from "react";
import mainAPI from "@/app/_lib/mainApi";

interface BackEndFormProps {
  action: string;
  method: string;
  children: ReactNode;
  className?: string;
  onSuccess: (res: any) => void;
  onFail?: (error: any) => void;
}

const BackEndForm: React.FC<BackEndFormProps> = ({
  action,
  method,
  children,
  className,
  onSuccess,
  onFail,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const res = await mainAPI({
        method: method,
        url: action,
        data: data,
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
