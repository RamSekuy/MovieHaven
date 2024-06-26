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
exports.RatingController = void 0;
const rating_service_1 = __importDefault(require("../service/rating.service"));
class RatingController {
    getAllRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rating_service_1.default.getAllRating(req);
                res.send({
                    message: "fetch All Rating",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getRatingByMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rating_service_1.default.getRatingByMovie(req);
                res.send({
                    message: "fetch by movie Rating",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getRatingByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rating_service_1.default.getRatingByUser(req);
                res.send({
                    message: "fetch by user Rating",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rating_service_1.default.addRating(req);
                res.send({
                    message: "add Rating success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteRatingByMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield rating_service_1.default.deleteRatingByMovie(req);
                res.send({
                    message: "update Rating success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.RatingController = RatingController;
exports.default = new RatingController();
