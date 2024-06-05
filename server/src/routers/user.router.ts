/** @format */
import { EntityRouter } from "./entity.router";
import userController from "../controller/user.controller";
import { tokenAuth } from "../middleware/tokenAuth";

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
    this.router.get("/validate",tokenAuth,userController.validate.bind(userController))
  }
}
export default new userRouter();
