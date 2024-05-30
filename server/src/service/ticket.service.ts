/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export class TicketService {
  async getAll(req: Request) {
    return await prisma.ticket.findMany();
  }

  async getByOmdbIdfillterBranchAndTime(req: Request) {
    const { omdbId } = req.params;
    const { time, branch } = req.query;
    // Fetch the data from the database
    return await prisma.studio.findMany({
      distinct: ["branchId"],
      include: {
        branch: { select: { location: true } },
        seats: {
          include: {
            ticket: {
              select: { time: true },
              distinct: ["time"],
              where: {
                movieId: String(omdbId),
                ...(time ? { time: String(time) } : {}),
              },
            },
          },
        },
      },
      where: { branch: { location: { contains: time ? String(branch) : "" } } },
    });
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
    const studioId = Number(req.params.studioId);
    const { time, omdbId, price } = req.body;
    const seats = await prisma.seat.findMany({
      where: { studioId: Number(studioId) },
    });
    if (!seats?.length) throw new Error("input valid studio");
    const data: Prisma.TicketCreateManyInput[] = seats.map((e) => ({
      price: Number(price),
      time: new Date(time),
      seatId: e.id,
      movieId: String(omdbId),
    }));
    await prisma.ticket.createMany({ data });
  }
}

export default new TicketService();
