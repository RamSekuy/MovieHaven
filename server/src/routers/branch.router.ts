/** @format */

import branchController from "../controller/branch.controller";
import { EntityRouter } from "./entity.router";

class branchRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", branchController.getAllBranch.bind(branchController));
    this.router.get("/:branchId", branchController.getBranchById.bind(branchController));
    this.router.post("/b1", branchController.addBranch.bind(branchController));
    this.router.delete("/:idBranch", branchController.deleteBranch.bind(branchController));
    this.router.post("/b2", branchController.addStudio.bind(branchController));
    this.router.delete("/b2/:idStudio", branchController.deleteStudio.bind(branchController));

  }
}
export default new branchRouter();