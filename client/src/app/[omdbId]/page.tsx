"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

type MovieDetail = {
  title: string;
  year: string;
  omdbId: string;
  poster: string;
  status: string;
  plot: string;
  actors: string;
  genre: string;
  age: string;
  country: string;
  language: string;
};

export default function MovieDetailPage() {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const params = useParams();
  const id = params.omdbId;

  useEffect(() => {
    if (id) {
      fetchMovieDetail(id as string);
    }
  }, [id]);

  async function fetchMovieDetail(movieId: string) {
    const res = await fetch(`http://localhost:7000/movie/${movieId}`);
    const result: { message: string; data: MovieDetail } = await res.json();
    console.log(result);
    console.log(result.data);

    setMovie(result.data);
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full flex flex-col items-center h-auto p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <Image
              src={movie.poster}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p>
              <strong>Description:</strong> {movie.plot}
            </p>
            <p>
              <strong>Year:</strong> {movie.year}
            </p>
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
              <strong>Actors:</strong> {movie.actors}
            </p>

            <p>
              <strong>Age Rating:</strong> {movie.age}
            </p>
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
            <p>
              <strong>Language:</strong> {movie.language}
            </p>
            <p>
              <strong>Status:</strong> {movie.status}
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
