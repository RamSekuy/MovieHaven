/** @format */
import { EntityRouter } from "./entity.router";
import movieController from "../controller/movie.controller";

class MovieRouter extends EntityRouter {
  constructor() {
    super();
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.get(
      "/",
      movieController.getRegisteredMovie.bind(movieController)
    );

    this.router.get("/");
  }
}
export default new MovieRouter();
