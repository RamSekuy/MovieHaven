/** @format */

import { NextFunction, Request, Response } from "express";
import userService from "../service/user.service";

export class TicketController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.register(req);
      res.send({
        message: "success register",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.login(req);
      console.log(data);
      res.send({
        message: "success login",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async referralUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userService.referralUser(req);
      res.send({
        message: "fetch referal",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
