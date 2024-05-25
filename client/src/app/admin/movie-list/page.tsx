"use client";
import { useEffect, useState } from "react";
import { IMovie } from "@/app/_model/movie.model";
import mainAPI from "@/app/_lib/mainApi";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import MainMovieCard from "@/app/_components/cardComponents/mainMovieCard";

export default function AdminLogin() {
  const [data, setData] = useState<IMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<{
    movie: IMovie;
    number: number;
  } | null>(null);

  async function movieFetch() {
    const res = await mainAPI.get(`/movie`);
    setData(res.data.data);
  }

  useEffect(() => {
    movieFetch();
  }, []);

  return (
    <main className="w-full justify-center items-center h-screen">
      <BackEndForm
        action="/movie"
        method="get"
        onSuccess={(res) => {
          setData(res.data.data);
        }}
      >
        <input
          type="text"
          id="title"
          name="title"
          className="border-2 border-black"
        />
        <input
          className="bg-green-600 hover:bg-green-300 p-2"
          type="submit"
          placeholder="Submit"
        />
      </BackEndForm>

      <div className="flex flex-wrap">
        {data.map((movie, i) => (
          <MainMovieCard
            key={i}
            movie={movie}
            onClick={(e) => setSelectedMovie({ movie, number: i })}
          />
        ))}
      </div>

      {selectedMovie && (
        <BackEndForm
          action={`/movie/${selectedMovie.movie.omdbId}`}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          method="patch"
          onSuccess={(res) => {
            const newData = [...data];
            newData[selectedMovie.number] = {
              ...selectedMovie.movie,
              status: res.data.data.status,
            };
            setData(newData);
            setSelectedMovie(null);
          }}
          onFail={(e) => alert(e)}
        >
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl mb-4">
              Update Status for {selectedMovie.movie.title}
            </h2>
            <select className="border-2 border-black mb-4 w-full" name="status">
              <option value="ComingSoon">Coming Soon</option>
              <option value="CurrentlyPlaying">Currently Playing</option>
              <option value="OutOfTheater">Out Of Theater</option>
            </select>
            <div className="flex justify-between">
              <input
                type="submit"
                className="bg-green-600 hover:bg-green-300 p-2 rounded-full"
              />
              <div className="flex gap-2">
                <button
                  className="bg-red-600 hover:bg-red-300 p-2 rounded-full"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await mainAPI.delete(
                        `/movie/${selectedMovie.movie.omdbId}`
                      );
                      setData(data.filter((e, i) => i != selectedMovie.number));
                    } catch (error) {
                      alert(error);
                    }
                    setSelectedMovie(null);
                  }}
                >
                  delete
                </button>
                <button
                  className="bg-slate-400 hover:bg-slate-300 p-2 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedMovie(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </BackEndForm>
      )}
    </main>
  );
}
