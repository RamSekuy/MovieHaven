"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMovie } from "@/app/_model/movie.model";


const NowShowingPage: React.FC = () => {
  const [nowShowingMovies, setNowShowingMovies] = useState<IMovie[]>([]);

  async function fetchNowShowingMovies() {
    try {
      const response = await axios.get("http://localhost:7000/movie");
      const data = response.data.data as IMovie[];
      const playingMovies = data.filter(movie => movie.status === "CurrentlyPlaying").reverse();
      setNowShowingMovies(playingMovies);
    } catch (error) {
      console.error("Error fetching now showing movies:", error);
    }
  }

  useEffect(() => {
    fetchNowShowingMovies();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto flex justify-center flex-col max-w-[800px] p-4">
          <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>
          <div className="flex flex-wrap justify-start mx-2">
            {nowShowingMovies.map(movie => (
              <div key={movie.id} className="w-full sm:w-1/2 md:w-1/3 xl:w-[250px]  p-2">
                <a href={`http://localhost:3000/${movie.omdbId}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                      <h3 className="text-md font-semibold h-10 mb-2">{movie.title}</h3>
                      <p className="text-gray-600">{movie.age}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NowShowingPage;