"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const branch_controller_1 = __importDefault(require("../controller/branch.controller"));
const entity_router_1 = require("./entity.router");
class branchRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.get("/", branch_controller_1.default.getAllBranch.bind(branch_controller_1.default));
        this.router.get("/:branchId", branch_controller_1.default.getBranchById.bind(branch_controller_1.default));
        this.router.post("/b1", branch_controller_1.default.addBranch.bind(branch_controller_1.default));
        this.router.delete("/:idBranch", branch_controller_1.default.deleteBranch.bind(branch_controller_1.default));
        this.router.post("/b2", branch_controller_1.default.addStudio.bind(branch_controller_1.default));
        this.router.delete("/b2/:idStudio", branch_controller_1.default.deleteStudio.bind(branch_controller_1.default));
    }
}
exports.default = new branchRouter();
