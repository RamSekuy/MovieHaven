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
const prisma_1 = require("../lib/prisma");
const formatRequestBody_1 = require("../utils/formatRequestBody");
const jwt_1 = require("../lib/jwt");
class StaffSevice {
    addStaff(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, address, password } = yield (0, formatRequestBody_1.formatRequestBody)(req, true);
            const data = { name, email, address, password };
            yield prisma_1.prisma.staff.create({ data });
        });
    }
    getAllStaff() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    staffLogin(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, formatRequestBody_1.formatRequestBody)(req);
            // const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // const endOfDay = new Date(currentDate);
            // endOfDay.setHours(23, 59, 59, 999);
            const data = yield prisma_1.prisma.staff.findUnique({
                where: {
                    email: body.email,
                    // staffSchedules: {
                    //   some: {
                    //     date: {
                    //       gte: currentDate,
                    //       lte: endOfDay,
                    //     },
                    //     branch: { password: { equals: body.branchPassword } },
                    //   },
                    // },
                },
                // include: {
                //   staffSchedules: {
                //     include: { branch: true },
                //   },
                // },
            });
            if (data == null) {
                throw new Error("Invalid data login");
            }
            const result = { id: data.id, type: "admin" };
            const result2 = Object.assign(Object.assign({}, data), { password: undefined });
            const aauth = (0, jwt_1.generateToken)(result2, { expiresIn: "1h" });
            return {
                rauth: (0, jwt_1.generateToken)(result, { expiresIn: "1h" }),
                aauth,
                staffData: result2,
            };
        });
    }
}
exports.StaffSevice = StaffSevice;
exports.default = new StaffSevice();
