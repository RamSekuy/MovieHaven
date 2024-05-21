/** @format */
import { Request } from "express";
import { prisma } from "../lib/prisma";
import { Movie, Prisma } from "@prisma/client";

export class MovieService {
  async getRegisteredMovie(req: Request) {
    return await prisma.movie.findMany({});
  }

  async addMovie(req: Request) {
    const { omdbId } = req.params;

    const res = await fetch(
      "https://www.omdbapi.com/?apikey=c623d88&i=" + omdbId
    );
    const movieData = (await res.json()) as any;
    const data: Prisma.MovieCreateInput = {
      omdbId: movieData.imdbID,
      title: movieData.Title,
      year: movieData.Year,
      age: movieData.Rated,
      released: new Date(movieData.Released),
      length: movieData.Runtime,
      genre: movieData.Genre,
      director: movieData.Director,
      actors: movieData.Actors,
      plot: movieData.Plot,
      language: movieData.Language,
      country: movieData.Country,
      poster: movieData.Poster,
    };

    await prisma.movie.create({
      data: data,
    });
  }

  async updateMovie(req: Request) {
    const { omdbId } = req.params;
    const data: Prisma.MovieUpdateInput = req.body;

    await prisma.movie.update({ where: { omdbId }, data });
  }

  async deleteMovie(req: Request) {
    const { omdbId } = req.params;

    await prisma.movie.delete({ where: { omdbId } });
  }
}

export default new MovieService();
