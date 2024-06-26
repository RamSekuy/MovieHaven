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
exports.MovieService = void 0;
const prisma_1 = require("../lib/prisma");
class MovieService {
    getAllMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, status } = req.query;
            const condition = {
                where: Object.assign(Object.assign({}, (title ? { title: { contains: title } } : {})), (status
                    ? { status: status }
                    : {})),
            };
            return yield prisma_1.prisma.movie.findMany(condition);
        });
    }
    getMovieById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId } = req.params;
            return yield prisma_1.prisma.movie.findUnique({ where: { omdbId } });
        });
    }
    addMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId } = req.params;
            const res = yield fetch("https://www.omdbapi.com/?apikey=c623d88&i=" + omdbId);
            const movieData = (yield res.json());
            const data = {
                omdbId: movieData.imdbID,
                title: movieData.Title,
                year: movieData.Year,
                age: movieData.Rated,
                released: new Date(movieData.Released),
                length: movieData.Runtime,
                genre: movieData.Genre,
                director: movieData.Director,
                actors: movieData.Actors,
                plot: movieData.Plot,
                language: movieData.Language,
                country: movieData.Country,
                poster: movieData.Poster,
            };
            yield prisma_1.prisma.movie.create({
                data: data,
            });
        });
    }
    updateMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId } = req.params;
            const data = req.body;
            return yield prisma_1.prisma.movie.update({ where: { omdbId }, data });
        });
    }
    deleteMovie(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { omdbId } = req.params;
            yield prisma_1.prisma.movie.delete({ where: { omdbId } });
        });
    }
}
exports.MovieService = MovieService;
exports.default = new MovieService();
