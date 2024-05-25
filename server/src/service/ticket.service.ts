/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export class TicketService {
  async getAll(req: Request) {
    return await prisma.ticket.findMany();
  }

  async getByStudio(req: Request) {
    const studioId = Number(req.params.studioId);

    if (!studioId) throw new Error("Invalid studio ID");
    return await prisma.ticket.findMany({
      include: {
        seat: true,
      },
      where: {
        seat: { studioId },
      },
    });
  }

  async addTicketsForStudio(req: Request) {
    const { studioId, time, movieId, price } = req.body;

    const seats = await prisma.seat.findMany({
      where: { studioId: Number(studioId) },
    });

    if (!seats?.length) throw new Error("input valid studio");
    const generatedTickets: Prisma.TicketCreateManyInput[] = seats.map(
      (e, i) => ({
        price: Number(price),
        movieId: Number(movieId),
        seatId: e.id,
        time: new Date(time),
      })
    );
    console.log(generatedTickets);

    await prisma.ticket.createMany({ data: generatedTickets });
  }
}

export default new TicketService();
