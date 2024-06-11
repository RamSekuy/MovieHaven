import { NextFunction, Request, Response } from "express";
import ratingService from "../service/rating.service";


export class RatingController {
  async getAllRating(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ratingService.getAllRating(req);
      res.send({
        message: "fetch All Rating",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRatingByMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ratingService.getRatingByMovie(req);
      res.send({
        message: "fetch by movie Rating",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRatingByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ratingService.getRatingByUser(req);
      res.send({
        message: "fetch by user Rating",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addRating(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ratingService.addRating(req);
      res.send({
        message: "add Rating success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }



  async deleteRatingByMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ratingService.deleteRatingByMovie(req);
      res.send({
        message: "update Rating success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RatingController();
