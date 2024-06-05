/** @format */
import { EntityRouter } from "./entity.router";
import staffController from "../controller/staff.controller";

class staffRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post("/s1", staffController.addStaff.bind(staffController));
    this.router.post("/s2", staffController.staffLogin.bind(staffController));
  }
}
export default new staffRouter();
