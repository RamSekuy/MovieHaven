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
    const {
      studioId,
      time,
      movieId,
      price,
    }: { price: number; studioId: number; time: string; movieId: number } =
      req.body;

    const seats = await prisma.seat.findMany({ where: { studioId } });

    if (!seats?.length) throw new Error("input valid studio");
    const generatedTickets: Prisma.TicketCreateManyInput[] = seats.map(
      (e, i) => ({
        price,
        movieId,
        seatId: e.id,
        time: new Date(time),
      })
    );
    console.log(generatedTickets);

    await prisma.ticket.createMany({ data: generatedTickets });
  }
}

export default new TicketService();
