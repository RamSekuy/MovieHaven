/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, Ticket, Transaction, TypeTransaction } from "@prisma/client";
import { userExpire } from "../utils/userExpire";
import { TransactionCountStats } from "../models/transactionStats";

class TransactionService {
  async getAllTransaction(req: Request) {
    const { id, isPaid } = req.query;
    let condition: Prisma.TransactionFindManyArgs = {};

    if (id) {
      condition.where = { id: Number(id) };
    }

    if (isPaid !== undefined) {
      condition.where = { ...condition.where, isPaid: isPaid === "true" };
    }

    return await prisma.transaction.findMany(condition);
  }

  async getTransactionById(req: Request) {
    const { idTransaction } = req.params;
    return await prisma.transaction.findUnique({
      where: { id: Number(idTransaction) },
    });
  }
  async getTransactionByInvoiceNum(req: Request) {
    const { invoiceNum } = req.params;
    return await prisma.transaction.findUnique({
      where: { invoiceNum: invoiceNum },
    });
  }

  async getTransactionsByMonthAndYear(req: Request) {
    const { month, year } = req.query;

    if (!month || !year) {
      throw new Error("Month and year are required");
    }
    const transactions = await prisma.$queryRaw<TransactionCountStats[]>`
    SELECT ticket.movieId, movie.title, COUNT(ticket.id) AS sold, sum(ticket.price) as total
    FROM Transaction
    INNER JOIN ticket ON ticket.transactionId = transaction.id
    INNER JOIN movie ON ticket.movieId = movie.omdbId
    WHERE MONTH(transaction.date) = ${month} AND YEAR(transaction.date) = ${year}
    GROUP BY ticket.movieId
    order by sold desc;
    `;
    return transactions.map((t) => ({ ...t, sold: Number(t.sold) }));
  }

  async addTransaction(req: Request) {
    const { type, staffId, pointsUsed } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(req.body.ticketIds)) throw new Error("Invalid tickets");
    const ticketIds = req.body.ticketIds as Ticket[];
    let user = await userExpire(Number(userId));
    if (!pointsUsed) {
      user = undefined;
    }

    if (!Object.values(TypeTransaction).includes(type as TypeTransaction)) {
      throw new Error("Invalid type for transaction");
    }

    if (type === "offline" && !staffId) {
      throw new Error("staffId must be provided for offline transactions");
    }

    if (type === "online" && !userId) {
      throw new Error("userId must be provided for online transactions");
    }

    const ticketConnections =
      ticketIds?.map((ticketId: Ticket) => ({ id: ticketId.id })) || [];

    const id = Number(userId) | Number(staffId);
    const data: Prisma.TransactionCreateInput = {
      invoiceNum: `INV-${new Date().toISOString() + id}`,
      type: type as TypeTransaction,
      total: ticketIds.reduce((p, n) => p + n.price, 0),
      ticket: { connect: ticketConnections },
      Staff:
        type === "offline" ? { connect: { id: Number(staffId) } } : undefined,
      User: type === "online" ? { connect: { id: Number(userId) } } : undefined,
      pointsUsed: user?.points ? user.points : 0,
    };
    let result;
    await prisma.$transaction(async (prisma) => {
      result = await prisma.transaction.create({ data });
      user
        ? await prisma.user.update({
            where: { id: Number(userId) },
            data: { ...user, points: user.points },
          })
        : null;
    });
    return result;
  }

  async updateTransaction(req: Request) {
    const { idTransaction } = req.params;
    const { isPaid } = req.body;

    return await prisma.transaction.update({
      where: { id: Number(idTransaction) },
      data: { isPaid: Boolean(isPaid) },
    });
  }

  async deleteTransaction(req: Request) {
    const { idTransaction } = req.params;
    await prisma.transaction.delete({ where: { id: Number(idTransaction) } });
  }
}

export default new TransactionService();
