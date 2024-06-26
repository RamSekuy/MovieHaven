"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const entity_router_1 = require("./entity.router");
const ticket_controller_1 = __importDefault(require("../controller/ticket.controller"));
class ticketRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.get("/", ticket_controller_1.default.getAll.bind(ticket_controller_1.default));
        this.router.get("/movie/:omdbId", ticket_controller_1.default.getByOmdbIdfillterBranchAndTime.bind(ticket_controller_1.default));
        this.router.get("/:studioId/", ticket_controller_1.default.getByStudio.bind(ticket_controller_1.default));
        this.router.post("/:studioId/v1", ticket_controller_1.default.addTicketsForStudio);
        this.router.patch("/v3", ticket_controller_1.default.updateTicket);
        this.router.delete("/v4", ticket_controller_1.default.deleteTicket);
    }
}
exports.default = new ticketRouter();
