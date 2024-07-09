import { CorsOptions } from "cors";
import "dotenv/config";
export const PORT = process.env.PORT || 8000;
export const SECRET_KEY = process.env.SECRET_KEY || "something";
export const EMAILPASSWORD = process.env.EMAILPASSWORD;
export const EMAIL = process.env.EMAIL;
export const EMAIL_VERIFY_KEY = process.env.EMAIL_VERIFY_KEY || "-";
export const FORGET_PASSWORD = process.env.FORGET_PASSWORD || "lupa bos";
export const VERIFY_URL = process.env.VERIFY_URL;
export const FORGOT_URL = process.env.FORGOT_URL;

export const corsOption: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
