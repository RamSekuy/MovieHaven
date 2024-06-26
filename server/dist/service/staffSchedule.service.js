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
exports.StaffSevice = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../lib/prisma");
class StaffSevice {
    getSchedule(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date } = req.body;
            if (date) {
                const searchDate = new Date(date);
                if (!searchDate)
                    throw new Error("invalid date");
                return yield prisma_1.prisma.staffSchedule.findMany({
                    where: { date: date },
                    include: { branch: true, staff: true },
                });
            }
            return yield prisma_1.prisma.staffSchedule.findMany({
                include: { branch: true, staff: true },
            });
        });
    }
    addStaffSchedule(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shift, date, branchId, staffId } = req.body;
            if (!Object.values(client_1.Shift).includes(shift))
                throw new Error("please input valid shift");
            const data = {
                date: new Date(date),
                shift,
                branch: { connect: { id: branchId } },
                staff: { connect: { id: staffId } },
            };
            yield prisma_1.prisma.staffSchedule.create({ data });
        });
    }
    editSchedule(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const data = req.body;
            return yield prisma_1.prisma.staffSchedule.update({ where: { id }, data });
        });
    }
    deleteSchedule(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            return yield prisma_1.prisma.staffSchedule.delete({ where: { id } });
        });
    }
}
exports.StaffSevice = StaffSevice;
