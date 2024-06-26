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
exports.TicketService = void 0;
const prisma_1 = require("../lib/prisma");
class TicketService {
    getAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId, time, branchId, studioId } = req.query;
            const data = yield prisma_1.prisma.ticket.findMany({
                where: Object.assign(Object.assign(Object.assign(Object.assign({}, (omdbId ? { movieId: String(omdbId) } : {})), (time ? { time: String(time) } : {})), (studioId ? { seat: { studioId: Number(studioId) } } : {})), (branchId
                    ? { seat: { studio: { branchId: Number(branchId) } } }
                    : {})),
            });
            return data;
        });
    }
    getByOmdbIdfillterBranchAndTime(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId } = req.params;
            const { time, branch } = req.query;
            // Fetch the data from the database
            const data = yield prisma_1.prisma.studio.findMany({
                distinct: ["id"],
                include: {
                    branch: true,
                    seats: {
                        take: 1,
                        include: {
                            ticket: {
                                distinct: ["time"],
                                where: Object.assign({ movieId: String(omdbId) }, (time ? { time: String(time) } : {})),
                            },
                        },
                    },
                },
                where: { branch: { location: { contains: time ? String(branch) : "" } } },
            });
            return data;
        });
    }
    getByStudio(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const studioId = Number(req.params.studioId);
            if (!studioId)
                throw new Error("Invalid studio ID");
            return yield prisma_1.prisma.ticket.findMany({
                include: {
                    seat: true,
                },
                where: {
                    seat: { studioId },
                    time: { equals: String(req.query.time) },
                },
            });
        });
    }
    addTicketsForStudio(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const studioId = Number(req.params.studioId);
            const { time, omdbId, price } = req.body;
            const seats = yield prisma_1.prisma.seat.findMany({
                where: { studioId: Number(studioId) },
            });
            if (!(seats === null || seats === void 0 ? void 0 : seats.length))
                throw new Error("input valid studio");
            const data = seats.map((e) => ({
                price: Number(price),
                time: time,
                seatId: e.id,
                movieId: String(omdbId),
            }));
            yield prisma_1.prisma.ticket.createMany({ data });
        });
    }
    updateTicket(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.body.newTickets;
            const newTickets = a;
            return yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const updatedTickets = newTickets.map((ticket) => __awaiter(this, void 0, void 0, function* () {
                    return prisma.ticket.update({
                        where: { id: ticket.id },
                        data: Object.assign({}, ticket),
                    });
                }));
                return Promise.all(updatedTickets);
            }));
        });
    }
    deleteTicket(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.body.targetTickets;
            const targetTickets = a;
            return yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const updatedTickets = targetTickets.map((ticket) => __awaiter(this, void 0, void 0, function* () {
                    return prisma.ticket.delete({
                        where: { id: ticket.id },
                    });
                }));
                return Promise.all(updatedTickets);
            }));
        });
    }
}
exports.TicketService = TicketService;
exports.default = new TicketService();
