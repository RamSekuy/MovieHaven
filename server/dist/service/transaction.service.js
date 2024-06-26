"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const client_1 = require("@prisma/client");
const userExpire_1 = require("../utils/userExpire");
class TransactionService {
    getAllTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, isPaid } = req.query;
            let condition = {};
            if (id) {
                condition.where = { id: Number(id) };
            }
            if (isPaid !== undefined) {
                condition.where = Object.assign(Object.assign({}, condition.where), { isPaid: isPaid === "true" });
            }
            return yield prisma_1.prisma.transaction.findMany(condition);
        });
    }
    getTransactionById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTransaction } = req.params;
            return yield prisma_1.prisma.transaction.findUnique({
                where: { id: Number(idTransaction) },
            });
        });
    }
    getTransactionByInvoiceNum(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { invoiceNum } = req.params;
            return yield prisma_1.prisma.transaction.findUnique({
                where: { invoiceNum: invoiceNum },
            });
        });
    }
    getTransactionsByMonthAndYear(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { month, year } = req.query;
            if (!month || !year) {
                throw new Error("Month and year are required");
            }
            const transactions = yield prisma_1.prisma.$queryRaw `
    SELECT ticket.movieId, movie.title, COUNT(ticket.id) AS sold, sum(ticket.price) as total
    FROM Transaction
    INNER JOIN ticket ON ticket.transactionId = transaction.id
    INNER JOIN movie ON ticket.movieId = movie.omdbId
    WHERE MONTH(transaction.date) = ${month} AND YEAR(transaction.date) = ${year}
    GROUP BY ticket.movieId
    order by sold desc;
    `;
            return transactions.map((t) => (Object.assign(Object.assign({}, t), { sold: Number(t.sold) })));
        });
    }
    addTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, staffId, pointsUsed } = req.body;
            const userId = req.user.id;
            if (!Array.isArray(req.body.ticketIds))
                throw new Error("Invalid tickets");
            const ticketIds = req.body.ticketIds;
            let user = yield (0, userExpire_1.userExpire)(Number(userId));
            if (!pointsUsed) {
                user = undefined;
            }
            if (!Object.values(client_1.TypeTransaction).includes(type)) {
                throw new Error("Invalid type for transaction");
            }
            if (type === "offline" && !staffId) {
                throw new Error("staffId must be provided for offline transactions");
            }
            if (type === "online" && !userId) {
                throw new Error("userId must be provided for online transactions");
            }
            const ticketConnections = (ticketIds === null || ticketIds === void 0 ? void 0 : ticketIds.map((ticketId) => ({ id: ticketId.id }))) || [];
            const id = Number(userId) | Number(staffId);
            const data = {
                invoiceNum: `INV-${new Date().toISOString() + id}`,
                type: type,
                total: ticketIds.reduce((p, n) => p + n.price, 0),
                ticket: { connect: ticketConnections },
                Staff: type === "offline" ? { connect: { id: Number(staffId) } } : undefined,
                User: type === "online" ? { connect: { id: Number(userId) } } : undefined,
                pointsUsed: (user === null || user === void 0 ? void 0 : user.points) ? user.points : 0,
            };
            let result;
            yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                result = yield prisma.transaction.create({ data });
                user
                    ? yield prisma.user.update({
                        where: { id: Number(userId) },
                        data: Object.assign(Object.assign({}, user), { points: user.points }),
                    })
                    : null;
            }));
            return result;
        });
    }
    updateTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTransaction } = req.params;
            const { isPaid } = req.body;
            return yield prisma_1.prisma.transaction.update({
                where: { id: Number(idTransaction) },
                data: { isPaid: Boolean(isPaid) },
            });
        });
    }
    deleteTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTransaction } = req.params;
            yield prisma_1.prisma.transaction.delete({ where: { id: Number(idTransaction) } });
        });
    }
}
exports.default = new TransactionService();
