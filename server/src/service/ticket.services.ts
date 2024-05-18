/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";

export class TicketService {
  public model = prisma.ticket;
  async getAll(req: Request) {
    return await this.model.findMany();
  }
}

export default new TicketService();
