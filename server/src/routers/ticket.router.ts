/** @format */
import { EntityRouter } from "./entity.router";
import ticketController from "../controller/ticket.controller";

class ticketRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", ticketController.getAll.bind(ticketController));
    this.router.get(
      "/:brandId",
      ticketController.getByBranch.bind(ticketController)
    );
  }
}
export default new ticketRouter();
