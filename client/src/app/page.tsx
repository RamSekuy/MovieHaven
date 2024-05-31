"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "./_model/movie.model";
import SlidePoster from "./_components/sleedComponent/sleed";
import Image from "next/image";

const HomePage: React.FC = () => {
  const [movieData, set] = useState<[IMovie[], IMovie[]]>([[], []]);
  const [currentlyPlayingMovies, setCurrentlyPlayingMovies] = useState<IMovie[]>([]);
  const promotionImages = [
    "https://via.placeholder.com/800x400?text=Promo+1",
    "https://via.placeholder.com/800x400?text=Promo+2"
  ]; // URL gambar promosi

  async function fetchMovie() {
    const data = (await axios.get("http://localhost:7000/movie")).data
      .data as IMovie[];
    let comingSoonMovies: IMovie[] = [];
    let playingMovies: IMovie[] = [];
    data.forEach((e) => {
      if (e.status === "CommingSoon") comingSoonMovies.push(e);
      if (e.status === "CurrentlyPlaying") playingMovies.push(e);
    });

    console.log(comingSoonMovies);
    console.log(playingMovies);
    set([playingMovies, comingSoonMovies]);
    setCurrentlyPlayingMovies(playingMovies);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          {/* Slide Poster Section for Currently Playing Movies */}
          {currentlyPlayingMovies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Currently Playing</h2>
              <SlidePoster movies={currentlyPlayingMovies} promotions={promotionImages} />
            </div>
          )}

          {/* Now Showing Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>
            <div className="flex flex-wrap -mx-2">
              {movieData[0].map((movie) => (
                <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <a href={`http://localhost:3000/${movie.omdbId}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-0 pb-[150%]">
                        <Image
                          src={movie.poster}
                          alt={movie.title}
                          layout="fill"
                          objectFit="cover"
                          className="absolute top-0 left-0 w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <p className="text-gray-600">{movie.genre}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <div className="flex flex-wrap -mx-2">
              {movieData[1].map((movie) => (
                <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-0 pb-[150%]">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        layout="fill"
                        objectFit="cover"
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{movie.title}</h3>
                      <p className="text-gray-600">{movie.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
