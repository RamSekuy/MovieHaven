"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/** @format */
const config_1 = require("./config/config");
const express_1 = __importDefault(require("express"));
const ticket_router_1 = __importDefault(require("./routers/ticket.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const staff_router_1 = __importDefault(require("./routers/staff.router"));
const cors_1 = __importDefault(require("cors"));
const movie_router_1 = __importDefault(require("./routers/movie.router"));
const transaction_router_1 = __importDefault(require("./routers/transaction.router"));
const branch_router_1 = __importDefault(require("./routers/branch.router"));
const rating_router_1 = __importDefault(require("./routers/rating.router"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configure();
        this.routes();
        this.errorHandler();
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send("welcome to api with prisma API");
        });
        this.app.use("/ticket", ticket_router_1.default.getRouter());
        this.app.use("/user", user_router_1.default.getRouter());
        this.app.use("/staff", staff_router_1.default.getRouter());
        this.app.use("/movie", movie_router_1.default.getRouter());
        this.app.use("/transaction", transaction_router_1.default.getRouter());
        this.app.use("/branch", branch_router_1.default.getRouter());
        this.app.use("/rating", rating_router_1.default.getRouter());
    }
    errorHandler() {
        this.app.use((error, req, res, next) => {
            if (error instanceof Error)
                res.status(500).send({
                    message: error.message,
                });
        });
    }
    configure() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)(config_1.corsOption));
    }
    start() {
        this.app.listen(config_1.PORT, () => {
            console.log(`http://localhost:${config_1.PORT}`);
        });
    }
}
exports.App = App;
