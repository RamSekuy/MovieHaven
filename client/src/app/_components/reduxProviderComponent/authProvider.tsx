"use client";
import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { keepLogin } from "@/app/_middleware/auth.middleware";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/app/_lib/redux/hooks";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const verify = () => keepLogin(dispatch);
  const userData = useAppSelector((s) => s.userData);
  useEffect(() => {
    verify();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return <>{children}</>;
}
