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

    this.router.post(
      "/:omdbId",
      movieController.addMovie.bind(movieController)
    );

    this.router.patch(
      "/:omdbId",
      movieController.updateMovie.bind(movieController)
    );

    this.router.delete(
      "/:omdbId",
      movieController.deleteMovie.bind(movieController)
    );
  }
}
export default new MovieRouter();
