"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import mainAPI from "@/app/_lib/axios";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { AxiosResponse } from "axios";

type searchData = {
  title: string;
  year: string;
  omdbId: string;
  poster: string;
  status: string;
};

interface IModal {
  bool: boolean;
  omdbId: string;
}

export default function AdminLogin() {
  const [data, setData] = useState<searchData[]>([]);
  const [modal, setmodal] = useState<IModal>({ bool: false, omdbId: "" });

  async function movieFetch() {
    const result = await mainAPI.get(`http://localhost:7000/movie/`);
    setData(result.data.data);
  }

  useEffect(() => {
    movieFetch();
  }, []);
  return (
    <main className="w-full justify-center items-center h-screen">
      <div>
        <input type="text" id="title" className="border-2 border-black" />
        <input type="number" id="page" className="border-2 border-black" />
        <button
          className="bg-green-600 hover:bg-green-300 p-2"
          onClick={() => movieFetch()}
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
              setmodal({ omdbId: e.omdbId, bool: true });
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
      <Modal
        modal={modal}
        onSuccess={(res) => {
          movieFetch();
        }}
      />
    </main>
  );
}

function Modal({
  modal,
  onSuccess,
}: {
  modal: IModal;
  onSuccess: (res: AxiosResponse) => void;
}) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5)] ${
        modal.bool ? "" : "hidden"
      }`}
    >
      <BackEndForm
        onSuccess={onSuccess}
        method="patch"
        action={`/movie/${modal.omdbId}`}
        classname="flex flex-col w-full justify-center items-center h-full"
      >
        <div className="p-4 bg-[#eaeaea]">
          <div className="flex justify-between gap-4 w-full">
            <label htmlFor="CurrentlyPlaying">CurrentlyPlaying</label>
            <input
              id="CurrentlyPlaying"
              type="radio"
              name="status"
              value="CurrentlyPlaying"
            />
          </div>
          <div className="flex justify-between gap-4 w-full">
            <label htmlFor="OutOfTheather">OutOfTheather</label>
            <input
              id="OutOfTheather"
              type="radio"
              name="status"
              value="OutOfTheather"
            />
          </div>
          <div className="flex justify-between gap-4 w-full">
            <label htmlFor="CommingSoon">CommingSoon</label>
            <input
              id="CommingSoon"
              type="radio"
              name="status"
              value="CommingSoon"
            />
          </div>
          <div className="w-full flex gap-2 my-2">
            <input
              type="submit"
              className="p-2 bg-green-400 m-auto rounded-full"
            />
            <button className="p-2 bg-red-500 m-auto rounded-full">
              delete
            </button>
            <button className="p-2 bg-slate-300 m-auto rounded-full">
              cancel
            </button>
          </div>
        </div>
      </BackEndForm>
    </div>
  );
}
