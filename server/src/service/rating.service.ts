/** @format */
import { Request } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { log } from "console";

export class RatingService {
  async getAllRating(req: Request) {
    return await prisma.rating.findMany();
  }

  async getRatingByMovie(req: Request) {
    const { movie_Id } = req.params;

    return await prisma.rating.findMany({
      where: { movieId: String(movie_Id) },
    });
  }
  async getRatingByUser(req: Request) {
    const { user_Id } = req.params;

    return await prisma.rating.findMany({
      where: { userId: Number(user_Id) },
    });
  }

  async addRating(req: Request) {
    const { movieId, userId } = req.body;
    const rate = Number(req.body.rate);

    if (rate < 1 || rate > 5) {
      throw new Error("Rating harus berada dalam rentang 1 hingga 5.");
    }
    const userTransactions = await prisma.transaction.findMany({
      where: {
        userId: Number(userId),
        ticket: {
          some: {
            movie: {
              omdbId: String(movieId)
            }
          }
        }
      }
    });
    if (userTransactions.length === 0) {
      throw new Error("Anda hanya dapat memberikan rating setelah melakukan transaksi untuk film ini.");
    }
    const data: Prisma.RatingCreateInput = {
      rate: rate,
      movie: { connect: { omdbId: String(movieId) } },
      user: { connect: { id: Number(userId) } },
    };
    return await prisma.rating.create({ data });
  }

  async deleteRatingByMovie(req: Request) {
    const { movieId } = req.params;
    console.log(req.params);

    return await prisma.rating.findMany({
      where: { movieId: String(movieId) },
    });
  }
}

export default new RatingService();
