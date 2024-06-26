"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const entity_router_1 = require("./entity.router");
const staff_controller_1 = __importDefault(require("../controller/staff.controller"));
class staffRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.post("/s1", staff_controller_1.default.addStaff.bind(staff_controller_1.default));
        this.router.post("/s2", staff_controller_1.default.staffLogin.bind(staff_controller_1.default));
    }
}
exports.default = new staffRouter();
