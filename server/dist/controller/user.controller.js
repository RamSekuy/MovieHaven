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
exports.TicketController = void 0;
const user_service_1 = __importDefault(require("../service/user.service"));
class TicketController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.register(req);
                res.send({
                    message: "success register",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.login(req);
                res
                    .cookie("rauth", data.rauth, { maxAge: 3600 * 1000 })
                    .cookie("aauth", data.aauthToken, { maxAge: 60 * 20 * 1000 })
                    .send({
                    message: "success login",
                    data: data.userData,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    referralUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.referralUser(req);
                res.send({
                    message: "fetch referal",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.validate(req);
                res.send({
                    message: "validation success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.default.emailVerify(req);
            res.send({ message: "success verify" });
        });
    }
    forgot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.default.forgot(req);
            res.send({ message: "success forgot password" });
        });
    }
    recoveryPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.default.recoveryPassword(req);
            res.send({ message: "success recovery password" });
        });
    }
}
exports.TicketController = TicketController;
exports.default = new TicketController();
