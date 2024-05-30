/** @format */

import { NextFunction, Request, Response } from "express";
import ticketService from "../service/ticket.service";

export class TicketController {
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

  async getTickets(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const data = await ticketService.getTickets(req);
    //     res.send({
    //       message: "The ticket has been purchased ",
    //       data,
    //     });
    //   } catch (error) {
    //     next(error);
    //   }
  }

  async getByOmdbIdfillterBranchAndTime(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ticketService.getByOmdbIdfillterBranchAndTime(req);
      res.send({
        message: "fetch ticket",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByStudio(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ticketService.getByStudio(req);
      res.send({
        message: "The ticket has been purchased ",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async addTicketsForStudio(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ticketService.addTicketsForStudio(req);
      res.status(201).send({
        message: "kata kata mutiara",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TicketController();
