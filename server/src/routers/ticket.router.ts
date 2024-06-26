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
      "/movie/:omdbId",
      ticketController.getByOmdbIdfillterBranchAndTime.bind(ticketController)
    );

    this.router.get(
      "/:studioId/",
      ticketController.getByStudio.bind(ticketController)
    );

    this.router.post("/:studioId/v1", ticketController.addTicketsForStudio);

    this.router.patch("/v3", ticketController.updateTicket);
    this.router.delete("/v4", ticketController.deleteTicket);
  }
}
export default new ticketRouter();
