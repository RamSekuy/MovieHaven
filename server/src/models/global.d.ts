import { IStaffCookie, IUserCookie } from "./cookie.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserCookie;
      staff: IStaffCookie;
    }
  }
}
