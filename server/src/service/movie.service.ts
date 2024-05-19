/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";

export class MovieService {
  async getRegisteredMovie(req: Request) {
    return await prisma.movie.findMany({
      include: { categories: true },
    });
  }
}

export default new MovieService();
