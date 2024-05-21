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

  async addMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await movieService.addMovie(req);
      res.send({
        message: "add movie success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await movieService.updateMovie(req);
      res.send({
        message: "update movie success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await movieService.deleteMovie(req);
      res.send({
        message: "update movie success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MovieController();
