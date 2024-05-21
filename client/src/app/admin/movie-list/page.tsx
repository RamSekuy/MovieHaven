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

  async function movieFetch(title: string, page: number) {
    const res = await fetch(`http://localhost:7000/movie/`);
    const result: { message: string; data: searchData[] } = await res.json();
    setData(result.data);
  }

  useEffect(() => {
    movieFetch("1", 1);
  }, []);
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
            className=" min-w-40 w-[250px] md:my-5 bg-white flex flex-col items-center rounded-xl m-auto group"
            key={i}
            onClick={async () => {
              const status = prompt(
                "change status CurrentlyPlaying / OutOfTheather / CommingSoon"
              );
              if (status == "DELETE") {
                const res = await fetch(
                  "http://localhost:7000/movie/" + e.omdbId,
                  { method: "DELETE" }
                );
                alert(res);
              }
              const res = await fetch(
                "http://localhost:7000/movie/" + e.omdbId,
                {
                  headers: { "Content-Type": "application/json" },
                  method: "PATCH",
                  body: JSON.stringify({ status }),
                }
              );

              if (res) {
                movieFetch("1", 1);
              }
            }}
          >
            <div className="w-[200px]  my-5 aspect-square object-top object-cover rounded-xl relative">
              <Image
                src={e.poster != "N/A" ? e.poster : ""}
                alt={e.title}
                fill
              ></Image>
              <button className="absolte top-0 left-0 translate-x-[100%] translate-y-[100%] bg-green-600 w-[25%] aspect-square rounded-full hidden group-hover:block hover:bg-green-300">
                +
              </button>
            </div>
            <hr className="border-grey-200 border-solid border-2 w-full" />
            <div className=" w-full flex flex-col px-5">
              <h1 className="font-bold w-[160px] ">{e.title}</h1>
              <h1 className="py-2">{e.year}</h1>
              <h1 className="py-2">{e.status}</h1>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
