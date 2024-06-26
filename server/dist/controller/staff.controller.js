"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const staff_service_1 = __importDefault(require("../service/staff.service"));
class StaffController {
    addStaff(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield staff_service_1.default.addStaff(req);
                res.status(201).send({
                    message: "success add Staff",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    staffLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield staff_service_1.default.staffLogin(req);
                res
                    .cookie("rauth", data.rauth, { maxAge: 3600 * 1000 })
                    .cookie("aauth", data.aauth, { maxAge: 60 * 20 * 1000 })
                    .send({
                    message: "success login Staff",
                    data: data.staffData,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.StaffController = StaffController;
exports.default = new StaffController();
