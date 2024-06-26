"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const entity_router_1 = require("./entity.router");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const tokenAuth_1 = require("../middleware/tokenAuth");
const verifyEmail_1 = require("../middleware/verifyEmail");
const verifyForgot_1 = require("../middleware/verifyForgot");
class userRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.post("/v1", user_controller_1.default.register.bind(user_controller_1.default));
        this.router.post("/v2", user_controller_1.default.login.bind(user_controller_1.default));
        this.router.get("/referal/:referalCode", tokenAuth_1.tokenAuth, user_controller_1.default.referralUser.bind(user_controller_1.default));
        this.router.get("/validate", tokenAuth_1.tokenAuth, user_controller_1.default.validate.bind(user_controller_1.default));
        this.router.post("/verify", verifyEmail_1.verifyEmail, user_controller_1.default.verifyEmail.bind(user_controller_1.default));
        this.router.post("/forgot", user_controller_1.default.forgot.bind(user_controller_1.default));
        this.router.patch("/forgot/v1", verifyForgot_1.verifyForgot, user_controller_1.default.recoveryPassword.bind(user_controller_1.default));
    }
}
exports.default = new userRouter();
