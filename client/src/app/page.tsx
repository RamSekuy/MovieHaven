"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "./_model/movie.model";
import Image from "next/image";
import SlidePoster from "./_components/sleedComponent/sleed";
import NowShowingPage from "./_components/listFilmComponent/nowShowing";
import ComingSoonPage from "./_components/listFilmComponent/upComing";

const HomePage: React.FC = () => {
  const [movieData, setMovieData] = useState<[IMovie[], IMovie[]]>([[], []]);
  const [currentlyPlayingMovies, setCurrentlyPlayingMovies] = useState<
    IMovie[]
  >([]);
  const promotionImages = [
    "https://via.placeholder.com/800x400?text=Promo+1",
    "https://via.placeholder.com/800x400?text=Promo+2",
  ]; // URL gambar promosi

  async function fetchMovie() {
    try {
      const response = await axios.get("http://localhost:7000/movie");
      const data = response.data.data as IMovie[];

      let comingSoonMovies: IMovie[] = [];
      let playingMovies: IMovie[] = [];

      data.forEach((e) => {
        if (e.status === "CommingSoon") comingSoonMovies.push(e);
        if (e.status === "CurrentlyPlaying") playingMovies.push(e);
      });

      // Mengurutkan daftar film yang sedang diputar dengan film terbaru di indeks 0
      playingMovies.reverse();


      setMovieData([playingMovies, comingSoonMovies]);
      setCurrentlyPlayingMovies(playingMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container hover:shadow-[0_35px_60px_-15px_rgba(15,23,42)] transition-shadow duration-300 mx-auto flex justify-center flex-col max-w-[850px] p-4">
          {/* Slide Poster Section for Currently Playing Movies */}
          {currentlyPlayingMovies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 ">Currently Playing</h2>
              <SlidePoster
                movies={currentlyPlayingMovies}
                promotions={promotionImages}
              />
            </div>
          )}

          {/* Now Showing Section */}
          <NowShowingPage />

          {/* Coming Soon Section */}
          <ComingSoonPage/>

        </div>
      </main>
    </div>
  );
};

export default HomePage;
