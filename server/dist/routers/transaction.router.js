"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const transaction_controller_1 = __importDefault(require("../controller/transaction.controller"));
const entity_router_1 = require("./entity.router");
const tokenAuth_1 = require("../middleware/tokenAuth");
class transactionRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.get("/", transaction_controller_1.default.getAllTransaction.bind(transaction_controller_1.default));
        this.router.get("/invoice/:invoiceNum", tokenAuth_1.tokenAuth, transaction_controller_1.default.getTransactionByInvoiceNum.bind(transaction_controller_1.default));
        this.router.get("/:idTransaction", tokenAuth_1.tokenAuth, transaction_controller_1.default.getTransactionById.bind(transaction_controller_1.default));
        this.router.get("/statis/ly", transaction_controller_1.default.getTransactionsByMonthAndYear.bind(transaction_controller_1.default));
        this.router.patch("/invoice/:idTransaction", tokenAuth_1.tokenAuth, transaction_controller_1.default.updateTransaction.bind(transaction_controller_1.default));
        this.router.post("/t1", tokenAuth_1.tokenAuth, transaction_controller_1.default.addTransaction.bind(transaction_controller_1.default));
        this.router.delete("/:idTransaction", transaction_controller_1.default.deleteTransaction.bind(transaction_controller_1.default));
    }
}
exports.default = new transactionRouter();
// {
//   "message": "\nInvalid `prisma.transaction.findUnique()`
//   invocation in\nC:\\Javascript_purwadhika\\03 backend\\00 Miniproject\\oke -
//   Copy\\MovieHaven-master\\server\\src\\service\\transaction.service.ts:25:37\n\n  22 \n
//    23 async getTransactionById(req: Request) {\n  24   const { idTransaction } = req.params;\n→ 25
//    return await prisma.transaction.findUnique({\n         where: {\n       +   id: Int\n         }\n
//   })\n\nArgument `id` is missing."
// }
