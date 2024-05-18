/** @format */

import { NextFunction, Request, Response } from "express";
import ticketService from "../service/ticket.services";

export class TicketController {
  public get: any;
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ticketService.getAll(req);
      res.send({
        message: "fetch ticket",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
