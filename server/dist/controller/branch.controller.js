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
exports.BranchController = void 0;
const branch_service_1 = __importDefault(require("../service/branch.service"));
class BranchController {
    getAllBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.getAllBranch(req);
                res.send({
                    message: "fetch Branch",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getBranchById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.getBranchById(req);
                res.send({
                    message: "fetch Branch",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.addBranch(req);
                res.send({
                    message: "add Branch success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.deleteBranch(req);
                res.send({
                    message: "update Branch success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addStudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.addStudio(req);
                res.send({
                    message: "add Studio success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteStudio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield branch_service_1.default.deleteStudio(req);
                res.send({
                    message: "update Studio success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BranchController = BranchController;
exports.default = new BranchController();
