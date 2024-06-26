"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const rating_controller_1 = __importDefault(require("../controller/rating.controller"));
const entity_router_1 = require("./entity.router");
const tokenAuth_1 = require("../middleware/tokenAuth");
class RatingRouter extends entity_router_1.EntityRouter {
    constructor() {
        super();
        this.initializedRoutes();
    }
    initializedRoutes() {
        this.router.get("/", rating_controller_1.default.getAllRating.bind(rating_controller_1.default));
        this.router.get("/movie/:movie_Id", rating_controller_1.default.getRatingByMovie.bind(rating_controller_1.default));
        this.router.get("/user/:userId", rating_controller_1.default.getRatingByUser.bind(rating_controller_1.default));
        this.router.post("/rt2", tokenAuth_1.tokenAuth, rating_controller_1.default.addRating.bind(rating_controller_1.default));
        this.router.delete("/movie/:movie_Id", rating_controller_1.default.deleteRatingByMovie.bind(rating_controller_1.default));
    }
}
exports.default = new RatingRouter();
// {
//   "message": "\nInvalid `prisma.Rating.findUnique()` 
//   invocation in\nC:\\Javascript_purwadhika\\03 backend\\00 Miniproject\\oke - 
//   Copy\\MovieHaven-master\\server\\src\\service\\Rating.service.ts:25:37\n\n  22 \n 
//    23 async getRatingById(req: Request) {\n  24   const { idRating } = req.params;\n→ 25   
//    return await prisma.Rating.findUnique({\n         where: {\n       +   id: Int\n         }\n       
//   })\n\nArgument `id` is missing."
// }
