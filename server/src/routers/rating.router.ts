/** @format */
import RatingController from "../controller/rating.controller";
import { EntityRouter } from "./entity.router";

class RatingRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get("/", RatingController.getAllRating.bind(RatingController));
    this.router.get("/movie/:movieId", RatingController.getRatingByMovie.bind(RatingController));
    this.router.get("/user/:userId", RatingController.getRatingByUser.bind(RatingController));
    this.router.post("/rt2", RatingController.addRating.bind(RatingController));
    this.router.delete("/movie/:movieId", RatingController.deleteRatingByMovie.bind(RatingController));

  }
}
export default new RatingRouter();

// {
//   "message": "\nInvalid `prisma.Rating.findUnique()` 
//   invocation in\nC:\\Javascript_purwadhika\\03 backend\\00 Miniproject\\oke - 
//   Copy\\MovieHaven-master\\server\\src\\service\\Rating.service.ts:25:37\n\n  22 \n 
//    23 async getRatingById(req: Request) {\n  24   const { idRating } = req.params;\n→ 25   
//    return await prisma.Rating.findUnique({\n         where: {\n       +   id: Int\n         }\n       
//   })\n\nArgument `id` is missing."
// }