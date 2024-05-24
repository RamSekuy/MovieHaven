import { CorsOptions } from "cors";
import "dotenv/config";
export const PORT = process.env.PORT || 7000;
export const SECRET_KEY = process.env.SECRET_KEY || "";

export const corsOption: CorsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
