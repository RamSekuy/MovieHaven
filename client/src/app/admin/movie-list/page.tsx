"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type searchData = {
  title: string;
  year: string;
  omdbId: string;
  poster: string;
  status: string;
};

export default function AdminLogin() {
  const [data, setData] = useState<searchData[]>([]);
  const [input, setInput] = useState({ title: "", page: 1 });
  const [selectedMovie, setSelectedMovie] = useState<searchData | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  async function movieFetch(title: string, page: number) {
    const res = await fetch(`http://localhost:7000/movie/`);
    const result: { message: string; data: searchData[] } = await res.json();
    setData(result.data);
  }

  useEffect(() => {
    movieFetch("1", 1);
  }, []);

  const updateStatus = async () => {
    if (selectedMovie && newStatus) {
      const res = await fetch(
        `http://localhost:7000/movie/${selectedMovie.omdbId}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (res.ok) {
        setSelectedMovie(null);
        movieFetch(input.title, input.page);
      } else {
        alert("Failed to update status");
      }
    }
  };

  return (
    <main className="w-full justify-center items-center h-screen">
      <div>
        <input
          type="text"
          id="title"
          className="border-2 border-black"
          value={input.title}
          onChange={(e) => {
            setInput({ ...input, [e.target.id]: e.target.value });
          }}
        />
        <input
          type="number"
          id="page"
          className="border-2 border-black"
          value={input.page}
          onChange={(e) => {
            setInput({ ...input, [e.target.id]: e.target.value });
          }}
        />
        <button
          className="bg-green-600 hover:bg-green-300 p-2"
          onClick={() => movieFetch(input.title, input.page)}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {data.map((e, i) => (
          <div
            className="min-w-40 w-[250px] md:my-5 bg-white flex flex-col items-center rounded-xl m-auto group"
            key={i}
            onClick={() => setSelectedMovie(e)}
          >
            <div className="w-[200px] my-5 aspect-square object-top object-cover rounded-xl relative">
              <Image
                src={e.poster !== "N/A" ? e.poster : "/placeholder.jpg"}
                alt={e.title}
                fill
                className="rounded-lg"
              />
            </div>
            <hr className="border-grey-200 border-solid border-2 w-full" />
            <div className="w-full flex flex-col px-5">
              <h1 className="font-bold w-[160px]">{e.title}</h1>
              <h1 className="py-2">{e.year}</h1>
              <h1 className="py-2">{e.status}</h1>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl mb-4">
              Update Status for {selectedMovie.title}
            </h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border-2 border-black mb-4"
            >
              <option value="">Select Status</option>
              <option value="ComingSoon">Coming Soon</option>
              <option value="CurrentlyPlaying">Currently Playing</option>
              <option value="OutOfTheater">Out Of Theater</option>
            </select>
            <div className="flex justify-between">
              <button
                className="bg-green-600 hover:bg-green-300 p-2"
                onClick={updateStatus}
              >
                Send
              </button>
              <button
                className="bg-red-600 hover:bg-red-300 p-2"
                onClick={() => setSelectedMovie(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
