/** @format */
import { EntityRouter } from "./entity.router";
import userController from "../controller/user.controller";
import { tokenAuth } from "../middleware/tokenAuth";
import { verifyEmail } from "../middleware/verifyEmail";
import { verifyForgot } from "../middleware/verifyForgot";

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post("/v1", userController.register.bind(userController));
    this.router.post("/v2", userController.login.bind(userController));
    this.router.get(
      "/referal/:referalCode",
      tokenAuth,
      userController.referralUser.bind(userController)
    );
    this.router.get(
      "/validate",
      tokenAuth,
      userController.validate.bind(userController)
    );
    this.router.post(
      "/verify",
      verifyEmail,
      userController.verifyEmail.bind(userController)
    );

    this.router.post("/forgot", userController.forgot.bind(userController));
    this.router.patch(
      "/forgot/v1",
      verifyForgot,
      userController.recoveryPassword.bind(userController)
    );
  }
}
export default new userRouter();
