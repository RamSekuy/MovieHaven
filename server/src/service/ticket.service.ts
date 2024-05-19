/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";

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
}

export default new TicketService();
