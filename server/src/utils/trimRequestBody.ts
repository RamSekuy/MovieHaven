import { Request } from "express";
export function trimRequestBody(req: Request) {
  const { email }: { email: string } = req.body;
  if (email) {
    req.body.email = email.trim().toLowerCase();
  }
  return req.body;
}
