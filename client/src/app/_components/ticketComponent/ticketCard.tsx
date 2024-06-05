import { MouseEvent } from "react";
import { ITicket } from "@/app/_model/ticket.model";
import { Dispatch, SetStateAction } from "react";

type Props = {
  tickets: ITicket[];
  location: string;
  modalState: [
    { isActive: boolean; data: any },
    Dispatch<SetStateAction<{ isActive: boolean; data: any }>>
  ];
};

export default function TicketCard({ location, tickets, modalState }: Props) {
  return (
    <div className=" w-full my-2 p-3 flex justify-start md:justify-between flex-wrap border-2 border-black bg-white">
      <div className="w-full sm:w-[50%] h-full">
        <h1 className="font-semibold">{location}</h1>
      </div>
      <div className="w-full sm:w-[50%] gap-2 flex justify-end flex-wrap">
        {tickets &&
          tickets.map((te, ti) => {
            const time = new Date(te.time);
            return (
              <button
                key={te.id}
                title={`${time}`}
                onClick={(e) => {
                  const time = new Date(e.currentTarget.title);
                  modalState[1]({ isActive: true, data: { time } });
                }}
                className="p-1 sm:p-2 hover:bg-blue-200 text-white hover:text-black bg-blue-600 border-black border-2 rounded-md"
              >
                {time.getHours() + ":" + time.getMinutes()}
              </button>
            );
          })}
      </div>
    </div>
  );
}
