import { sign, decode, verify, SignOptions, SignCallback } from "jsonwebtoken";
import {
  EMAIL_VERIFY_KEY,
  FORGET_PASSWORD,
  SECRET_KEY,
} from "../config/config";

const key = {
  SECRET_KEY,
  EMAIL_VERIFY_KEY,
  FORGET_PASSWORD,
};

export const generateToken = (
  data: string | object | Buffer,
  option: SignOptions = {},
  selectKey: keyof typeof key = "SECRET_KEY"
): string => {
  try {
    return sign(data, key[selectKey], option);
  } catch (err) {
    throw err;
  }
};
