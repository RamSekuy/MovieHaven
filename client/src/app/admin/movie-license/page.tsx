"use client";
import { useState } from "react";
import Image from "next/image";

type searchData = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function AdminLogin() {
  const [data, setData] = useState<searchData[]>([]);
  const [input, setInput] = useState({ title: "", page: 1 });

  async function omdbFetch(title: string, page: number) {
    console.log(title, page);

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=c623d88&s=${title}&page=${page}&type=movie`
    );
    const result: { Search: searchData[] } = await res.json();
    if (result.Search) setData(result.Search);
  }

  return (
    <main className="w-full justify-center items-center h-screen">
      <div className="flex justify-center flex-col sm:flex-row gap-2 m-auto flex-wrap px-2">
        <div className="w-full flex flex-col">
          <input
            placeholder="movie title"
            type="text"
            id="title"
            className="border-2 border-black px-2"
            value={input.title}
            onChange={(e) => {
              setInput({ ...input, [e.target.id]: e.target.value });
            }}
            onKeyDown={(e)=>{e.key!=="Enter"?null:omdbFetch(input.title, input.page)}}
          />
          <div className="flex w-full gap-x-4 p-2 item-center justify-center text-center">
            <button
              className="p-2 border-2 border-black"
              onClick={(e) => {
                const data = { ...input };
                --data.page;
                setInput({ ...data });
              }}
            >
              Prev
            </button>
            <div className="text-center flex item-center justify-center py-2">
              {input.page}
            </div>
            <button
              className="p-2 border-2 border-black"
              onClick={(e) => {
                const data = { ...input };
                ++data.page;
                setInput({ ...data });
              }}
            >
              Next
            </button>
          </div>
        </div>
        <button
          className="bg-green-600 hover:bg-green-300 p-2 w-max m-auto"
          onClick={() => omdbFetch(input.title, input.page)}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {data.map((e, i) => (
          <div
            className=" min-w-40 w-[250px] md:my-5 bg-white flex flex-col items-center rounded-xl m-auto group"
            key={i}
          >
            <div className="w-[200px]  my-5 aspect-square object-top object-cover rounded-xl relative">
              <Image
                src={e.Poster != "N/A" ? e.Poster : ""}
                alt={e.Title}
                fill
              ></Image>
              <button
                className="absolte top-0 left-0 translate-x-[100%] translate-y-[100%] bg-green-600 w-[25%] aspect-square rounded-full hidden group-hover:block hover:bg-green-300"
                onClick={async () => {
                  console.log(
                    await fetch("http://localhost:7000/movie/" + e.imdbID, {
                      method: "POST",
                    })
                  );
                }}
              >
                +
              </button>
            </div>
            <hr className="border-grey-200 border-solid border-2 w-full" />
            <div className=" w-full flex flex-col px-5">
              <h1 className="font-bold w-[160px] ">{e.Title}</h1>
              <h1 className="py-2">{e.Year}</h1>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
