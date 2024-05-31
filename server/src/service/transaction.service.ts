/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, Transaction, TypeTransaction } from "@prisma/client";

class TransactionService {
  async getAllTransaction(req: Request): Promise<Transaction[]> {
    const { id } = req.query;
    let condition: Prisma.TransactionFindManyArgs = {};
    if (id) {
      condition = { where: { id: Number(id) } };
    }
    return await prisma.transaction.findMany(condition);
  }

  async getTransactionById(req: Request): Promise<Transaction | null> {
    const { id } = req.params;
    return await prisma.transaction.findUnique({ where: { id: Number(id) } });
  }

  async addTransaction(req: Request): Promise<Transaction> {
    const { date, invoiceNum, type, staffId, userId } = req.body;

    if (!Object.values(TypeTransaction).includes(type as TypeTransaction)) {
      throw new Error('Invalid type for transaction');
    }

    if (type === 'offline' && !staffId) {
      throw new Error('staffId must be provided for offline transactions');
    }

    if (type === 'online' && !userId) {
      throw new Error('userId must be provided for online transactions');
    }

    const data: Prisma.TransactionCreateInput = {
      date: new Date(date),
      invoiceNum,
      type: type as TypeTransaction,  
      Staff: type === 'offline' ? { connect: { id: Number(staffId) } } : undefined,
      User: type === 'online' ? { connect: { id: Number(userId) } } : undefined,
    };

    return await prisma.transaction.create({
      data,
    });
  }

  async deleteTransaction(req: Request): Promise<void> {
    const { id } = req.params;
    await prisma.transaction.delete({ where: { id: Number(id) } });
  }
}

export default new TransactionService();
