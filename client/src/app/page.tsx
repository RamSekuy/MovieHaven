"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "./_model/movie.model";

const HomePage: React.FC = () => {
  const [movieData, set] = useState<[IMovie[], IMovie[]]>([[], []]);
  async function fetchMovie() {
    const data = (await axios.get("http://localhost:7000/movie")).data
      .data as IMovie[];
    let comingSoonMovies: IMovie[] = [];
    let currentlyPlayingMovies: IMovie[] = [];
    data.forEach((e) => {
      if (e.status == "CommingSoon") comingSoonMovies.push(e);
      if (e.status == "CurrentlyPlaying") currentlyPlayingMovies.push(e);
    });

    console.log(comingSoonMovies);
    console.log(currentlyPlayingMovies);
    set([currentlyPlayingMovies, comingSoonMovies]);
  }

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto p-4">
          {/* Now Showing Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>
            <div className="flex flex-wrap -mx-2">
              {movieData[0].map((movie) => (
                <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                  <a href={`http://localhost:3000/${movie.omdbId}`}>
                    <div className="bg-red rounded-lg shadow-md overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-auto"
                      />
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
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-auto"
                    />
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
