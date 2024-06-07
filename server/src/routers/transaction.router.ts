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
    this.router.get("/invoice/:invoiceNum", transactionController.getTransactionByInvoiceNum.bind(transactionController));
    this.router.get("/:idTransaction", transactionController.getTransactionById.bind(transactionController));

    this.router.post("/t1", transactionController.addTransaction.bind(transactionController));
    this.router.delete("/:idTransaction", transactionController.deleteTransaction.bind(transactionController));

  }
}
export default new transactionRouter();

// {
//   "message": "\nInvalid `prisma.transaction.findUnique()` 
//   invocation in\nC:\\Javascript_purwadhika\\03 backend\\00 Miniproject\\oke - 
//   Copy\\MovieHaven-master\\server\\src\\service\\transaction.service.ts:25:37\n\n  22 \n 
//    23 async getTransactionById(req: Request) {\n  24   const { idTransaction } = req.params;\n→ 25   
//    return await prisma.transaction.findUnique({\n         where: {\n       +   id: Int\n         }\n       
//   })\n\nArgument `id` is missing."
// }