import { Request } from "express";
import { genSalt, hash } from "bcrypt";

export async function formatRequestBody(
  req: Request,
  hashPassword: boolean = false
) {
  const { email, password }: typeof req.body = req.body;
  if (email) {
    req.body.email = email.trim().toLowerCase();
  }

  //Encrypt
  if (hashPassword) {
    const salt = await genSalt(10);
    req.body.password = await hash(password, salt);
  }

  return req.body;
}
