"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const entity_router_1 = require("./entity.router");
const movie_controller_1 = __importDefault(require("../controller/movie.controller"));
class MovieRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.get("/", movie_controller_1.default.getAllMovie.bind(movie_controller_1.default));
        this.router.get("/:omdbId", movie_controller_1.default.getMovieById.bind(movie_controller_1.default));
        this.router.post("/:omdbId", movie_controller_1.default.addMovie.bind(movie_controller_1.default));
        this.router.patch("/:omdbId", movie_controller_1.default.updateMovie.bind(movie_controller_1.default));
        this.router.delete("/:omdbId", movie_controller_1.default.deleteMovie.bind(movie_controller_1.default));
    }
}
exports.default = new MovieRouter();
