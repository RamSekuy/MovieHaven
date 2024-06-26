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
exports.BranchService = void 0;
const prisma_1 = require("../lib/prisma");
const generateSeats_1 = require("../utils/generateSeats");
class BranchService {
    getAllBranch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.branch.findMany();
        });
    }
    getBranchById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { branchId } = req.params;
            return yield prisma_1.prisma.branch.findUnique({
                include: { studios: { include: { seats: true } } },
                where: { id: Number(branchId) },
            });
        });
    }
    addBranch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { branchPassword, location } = req.body;
            const data = {
                location,
                password: branchPassword,
            };
            return yield prisma_1.prisma.branch.create({ data });
        });
    }
    deleteBranch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idBranch } = req.params;
            yield prisma_1.prisma.branch.delete({ where: { id: Number(idBranch) } });
        });
    }
    addStudio(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { studioName, branchId } = req.body;
            const data = {
                studioName,
                branch: { connect: { id: Number(branchId) } },
                seats: { createMany: { data: (0, generateSeats_1.generateSeats)() } },
            };
            return yield prisma_1.prisma.studio.create({ data });
        });
    }
    deleteStudio(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idStudio } = req.params;
            return yield prisma_1.prisma.studio.delete({ where: { id: Number(idStudio) } });
        });
    }
}
exports.BranchService = BranchService;
exports.default = new BranchService();
