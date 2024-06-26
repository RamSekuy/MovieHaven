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
exports.RatingService = void 0;
const prisma_1 = require("../lib/prisma");
class RatingService {
    getAllRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.rating.findMany();
        });
    }
    getRatingByMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movie_Id } = req.params;
            return yield prisma_1.prisma.rating.findMany({
                where: { movieId: String(movie_Id) },
                include: { movie: true, user: true }
            });
        });
    }
    getRatingByUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_Id } = req.params;
            return yield prisma_1.prisma.rating.findMany({
                where: { userId: Number(user_Id) },
            });
        });
    }
    addRating(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, comment } = req.body;
            const rate = Number(req.body.rate);
            const userId = req.user.id;
            if (rate < 1 || rate > 5) {
                throw new Error("Rating harus berada dalam rentang 1 hingga 5.");
            }
            const userTransactions = yield prisma_1.prisma.transaction.findMany({
                where: {
                    isPaid: true,
                    userId: Number(userId),
                    ticket: {
                        some: {
                            movie: {
                                omdbId: String(movieId),
                            },
                        },
                    },
                },
            });
            if (userTransactions.length === 0) {
                throw new Error("Anda hanya dapat memberikan rating setelah melakukan transaksi untuk film ini.");
            }
            const data = {
                rate: rate,
                movie: { connect: { omdbId: String(movieId) } },
                user: { connect: { id: Number(userId) } },
                comment: String(comment),
            };
            return yield prisma_1.prisma.rating.create({ data });
        });
    }
    deleteRatingByMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId } = req.params;
            return yield prisma_1.prisma.rating.findMany({
                where: { movieId: String(movieId) },
            });
        });
    }
}
exports.RatingService = RatingService;
exports.default = new RatingService();
