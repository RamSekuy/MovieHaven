/** @format */

import { NextFunction, Request, Response } from "express";
import movieService from "../service/movie.service";

export class MovieController {
  async getRegisteredMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await movieService.getRegisteredMovie(req);
      res.send({
        message: "fetch movie",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MovieController();
