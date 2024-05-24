import { IStaffCookie, IUserCookie } from "./cookie.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserCookie;
      staff: IStaffCookie;
    }
  }
}
<<<<<<< HEAD

=======
>>>>>>> 0e3f1e53bf4726e4a1f9afa887b2f94d7afc6a21
