import { deleteCookie, getCookie } from "cookies-next";
import { Dispatch } from "redux";
import { IAdmin, IUser } from "../_model/user.model";
import { jwtDecode } from "jwt-decode";
import { userDataAction } from "../_lib/redux/slices/userData.slice";

export const keepLogin = (dispatch: Dispatch) => {
  try {
    const token = getCookie("aauth");
    if (!token) throw new Error("token not found");

    const user = jwtDecode(token) as IUser | IAdmin;

    if (Object.hasOwn(user, "referalCode")) {
      dispatch(userDataAction.loginUser(user as IUser));
    } else if (Object.hasOwn(user, "isActive")) {
      dispatch(userDataAction.loginAdmin(user as IAdmin));
    }
    return {
      success: true,
      message: "success",
    };
  } catch (err: any) {
    console.log(err);
    dispatch(userDataAction.logout({}));
    return err.message;
  }
};
