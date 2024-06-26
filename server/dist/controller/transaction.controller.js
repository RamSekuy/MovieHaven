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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = __importDefault(require("../service/transaction.service"));
const accessCheck_1 = require("../utils/accessCheck");
class TransactionController {
    getAllTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.getAllTransaction(req);
                res.send({
                    message: "fetch transaction",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTransactionById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.getTransactionById(req);
                !(data === null || data === void 0 ? void 0 : data.userId)
                    ? null
                    : !(0, accessCheck_1.accessCheck)(res, req.user.id, data.userId)
                        ? null
                        : res.send({
                            message: "fetch transaction",
                            data,
                        });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTransactionByInvoiceNum(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.getTransactionByInvoiceNum(req);
                res.send({
                    message: "fetch transaction",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getTransactionsByMonthAndYear(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.getTransactionsByMonthAndYear(req);
                res.send({
                    message: "get total transaction by month success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.addTransaction(req);
                res.send({
                    message: "add transaction success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (yield transaction_service_1.default.updateTransaction(req));
                data.userId ? (0, accessCheck_1.accessCheck)(res, req.user.id, data.userId) : null;
                res.send({
                    message: "transaction is paid",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield transaction_service_1.default.deleteTransaction(req);
                res.send({
                    message: "update transaction success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TransactionController = TransactionController;
exports.default = new TransactionController();
