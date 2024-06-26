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
exports.MovieController = void 0;
const movie_service_1 = __importDefault(require("../service/movie.service"));
class MovieController {
    getAllMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield movie_service_1.default.getAllMovie(req);
                res.send({
                    message: "fetch movie",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getMovieById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield movie_service_1.default.getMovieById(req);
                res.send({
                    message: "fetch movie",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    addMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield movie_service_1.default.addMovie(req);
                res.send({
                    message: "add movie success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield movie_service_1.default.updateMovie(req);
                res.send({
                    message: "update movie success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield movie_service_1.default.deleteMovie(req);
                res.send({
                    message: "update movie success",
                    data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.MovieController = MovieController;
exports.default = new MovieController();
