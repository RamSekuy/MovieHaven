<<<<<<< HEAD
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface IMovie {
  id: number;
  status: string;
  omdbId: string;
  title: string;
  year: string;
  age: string;
  released: Date;
  length: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  poster: string;
}
=======
import Link from "next/link";
>>>>>>> 0e3f1e53bf4726e4a1f9afa887b2f94d7afc6a21

const HomePage: React.FC = () => {
  const [moviesNowShowing, set] = useState<IMovie[]>([]);
  async function fetchMovie() {
    const data = (await axios.get("http://localhost:7000/movie")).data.data;
    console.log(data);

    set(data as IMovie[]);
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
              {moviesNowShowing.map((movie) =>
                movie.status == "CurrentlyPlaying" ? (
                  <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
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
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <div className="flex flex-wrap -mx-2">
              {moviesNowShowing.map((movie) =>
                movie.status == "CommingSoon" ? (
                  <div key={movie.id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.poster}
                        className="w-full h-auto"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{movie.title}</h3>
                        <p className="text-gray-600">{movie.genre}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
