/** @format */
import { EntityRouter } from "./entity.router";
import userController from "../controller/user.controller";

class userRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post("/v1", userController.register.bind(userController));
    this.router.get("/v2", userController.login.bind(userController));
    this.router.get(
      "/referal/:referalCode",
      userController.referralUser.bind(userController)
    );
  }
}
export default new userRouter();
