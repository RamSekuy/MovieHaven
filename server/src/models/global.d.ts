import { IStaffCookie, IUserCookie } from "./cookie.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserCookie;
      staff: IStaffCookie;
    }
  }
}

declare module "Express" {
  interface Request {
    body: { [key: string]: string };
  }
}
