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

interface IModal {bool:boolean,omdbId:string}

export default function AdminLogin() {
  const [data, setData] = useState<searchData[]>([]);
  const [input, setInput] = useState({ title: "", page: 1 });
  const [modal,setmodal] = useState<IModal>({bool: false, omdbId:""})

  async function movieFetch(title: string, page: number) {
    const result = await mainAPI.get(`http://localhost:7000/movie/`);
    setData(result.data.data);
  }

  function update (res: AxiosResponse<{data:any, message:string}, any>){}

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
              
              setbool(true)
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
      <Modal modal={modal} onSuccess={update}/>
    </main>
  );
}


function Modal({modal,onSuccess}:{modal:IModal,onSuccess:(res:AxiosResponse)=>{}}) {
  return (
    <div className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.5] ${modal.bool? "":"hidden"}`}>
      <BackEndForm onSuccess={onSuccess} method="patch" action={`/movie/${modal.omdbId}`}></BackEndForm>
    </div>
  )
}

