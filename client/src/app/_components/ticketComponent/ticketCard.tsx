"use client";
import { MouseEvent, useEffect } from "react";
import { ITicket } from "@/app/_model/ticket.model";
import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";

type Props = {
  tickets: ITicket[];
  location: string;
  studioId: number;
};

export default function TicketCard({ location, tickets, studioId }: Props) {
  const dispatch = useAppDispatch();
  const userLocale = navigator.language || "en-US";

  return (
    <div className=" w-full my-2 p-3 flex justify-start md:justify-between flex-wrap border-2 border-black bg-white">
      <div className="w-full sm:w-[50%] h-full">
        <h1 className="font-semibold">{location}</h1>
      </div>
      <div className="w-full sm:w-[50%] gap-2 flex justify-end flex-wrap">
        {tickets &&
          tickets.map((te, ti) => {
            const time = new Date(te.time).toISOString();
            return (
              <button
                key={te.id}
                title={`${time}`}
                onClick={(e) => {
                  dispatch(
                    setSelectTicket({ time, studioId, selectTicket:[]})
                  );
                }}
                className="p-1 sm:p-2 hover:bg-blue-200 text-white hover:text-black bg-blue-600 border-black border-2 rounded-md"
              >
                {new Date(time).toLocaleTimeString(userLocale, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            );
          })}
      </div>
    </div>
  );
}
