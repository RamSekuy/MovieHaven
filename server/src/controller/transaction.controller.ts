import { NextFunction, Request, Response } from "express";
import transactionService from "../service/transaction.service";

export class TransactionController {
  async getAllTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getAllTransaction(req);
      res.send({
        message: "fetch transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getTransactionById(req);
      res.send({
        message: "fetch transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTransactionByInvoiceNum(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.getTransactionByInvoiceNum(req);
      res.send({
        message: "fetch transaction",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.addTransaction(req);
      res.send({
        message: "add transaction success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.updateTransaction(req);
      res.send({
        message: "add transaction success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await transactionService.deleteTransaction(req);
      res.send({
        message: "update transaction success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
