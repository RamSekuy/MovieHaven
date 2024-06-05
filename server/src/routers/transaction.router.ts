/** @format */
import transactionController from "../controller/transaction.controller";
import { EntityRouter } from "./entity.router";

class transactionRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", transactionController.getAllTransaction.bind(transactionController));
    this.router.get("/:id", transactionController.getTransactionById.bind(transactionController));
    this.router.post("/t1", transactionController.addTransaction.bind(transactionController));
    this.router.delete("/:id", transactionController.deleteTransaction.bind(transactionController));

  }
}
export default new transactionRouter();
