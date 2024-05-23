import { sign, decode, verify, SignOptions, SignCallback } from "jsonwebtoken";
import { SECRET_KEY } from "../config/config";

export const generateToken = (
  data: string | object | Buffer,
  option: SignOptions = {}
): string => {
  try {
    return sign(data, SECRET_KEY, option);
  } catch (err) {
    throw err;
  }
};
