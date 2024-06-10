/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Prisma, Ticket } from "@prisma/client";

export class TicketService {
  async getAll(req: Request) {
    const { omdbId, time, branchId, studioId } = req.query;
    const data = await prisma.ticket.findMany({
      where: {
        ...(omdbId ? { movieId: String(omdbId) } : {}),
        ...(time ? { time: String(time) } : {}),
        ...(studioId ? { seat: { studioId: Number(studioId) } } : {}),
        ...(branchId
          ? { seat: { studio: { branchId: Number(branchId) } } }
          : {}),
      },
    });

    return data;
  }

  async getByOmdbIdfillterBranchAndTime(req: Request) {
    const { omdbId } = req.params;
    const { time, branch } = req.query;
    // Fetch the data from the database
    const data = await prisma.studio.findMany({
      distinct: ["branchId"],
      include: {
        branch: true,
        seats: {
          take: 1,
          include: {
            ticket: {
              select: { time: true, id: true },
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

    return data;
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
        time: { equals: String(req.query.time) },
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

  async updateTicket(req: Request) {
    const a = req.body.newTickets as unknown;
    const newTickets = a as Ticket[];
    return await prisma.$transaction(async (prisma) => {
      const updatedTickets = newTickets.map(async (ticket) => {
        return prisma.ticket.update({
          where: { id: ticket.id },
          data: { ...ticket },
        });
      });

      return Promise.all(updatedTickets);
    });
  }

  async deleteTicket(req: Request) {
    const a = req.body.targetTickets as unknown;
    const targetTickets = a as Ticket[];
    return await prisma.$transaction(async (prisma) => {
      const updatedTickets = targetTickets.map(async (ticket) => {
        return prisma.ticket.delete({
          where: { id: ticket.id },
        });
      });

      return Promise.all(updatedTickets);
    });
  }
}

export default new TicketService();
