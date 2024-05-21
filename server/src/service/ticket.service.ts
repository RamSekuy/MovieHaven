/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export class TicketService {
  async getAll(req: Request) {
    return await prisma.ticket.findMany();
  }

  async getByBranch(req: Request) {
    const { branchId } = req.params;
    return await prisma.ticket.findMany({
      include: {
        seat: {
          include: {
            studio: { select: { branch: { select: { location: true } } } },
          },
        },
      },
      where: {
        seat: { studio: { branchId: Number(branchId) } },
      },
    });
  }

  async addTicketsForStudio(req: Request) {
    //   const { branchId } = req.params;
    //   const { studioId, schedule, movieId } = req.body;
    //   const data: Prisma.TicketCreateManyInput = [
    //     { movieId, price: 10000, time: schedule, transactionId: {} },
    //   ];
    //   prisma.ticket.createMany({ data: { data } });
  }
}

export default new TicketService();
