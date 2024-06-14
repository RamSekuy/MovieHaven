import { NextFunction, Request, Response } from "express";
import transactionService from "../service/transaction.service";
import { accessCheck } from "../utils/accessCheck";
import { Transaction } from "@prisma/client";

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
      !data?.userId
        ? null
        : !accessCheck(res, req.user.id, data.userId)
        ? null
        : res.send({
            message: "fetch transaction",
            data,
          });
    } catch (error) {
      next(error);
    }
  }
  async getTransactionByInvoiceNum(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

  async getTransactionsByMonthAndYear(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await transactionService.getTransactionsByMonthAndYear(req);
      res.send({
        message: "get total transaction by month success",
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
      const data = (await transactionService.updateTransaction(
        req
      )) as Transaction;
      data.userId ? accessCheck(res, req.user.id, data.userId) : null;
      res.send({
        message: "transaction is paid",
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
