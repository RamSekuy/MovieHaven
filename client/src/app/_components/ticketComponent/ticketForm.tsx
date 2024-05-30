"use client";
import { useState } from "react";
import SeatSelector from "@/app/_components/ticketComponent/SeatSelector";
import BranchSelector from "@/app/_components/ticketComponent/BranchSelector";
import TimeSelector from "@/app/_components/ticketComponent/TimeSelector";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { ChangeEvent } from "react";
import { ITicket } from "@/app/_model/ticket.model";
import { TBranchTicket } from "@/app/_model/branchTicket.model";

interface Props {
  branches: TBranchTicket[];
}

export default function TicketForm({ branches }: Props) {
  const [input, setInput] = useState<{ [key: string]: any }>({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const [modal,setModal] = useState<boolean>(false)
  const [seats, setSeats] = useState();
  return (
    <>
      {branches.map((e, i) => (
        <div className=" w-full p-3 flex justify-start md:justify-between flex-wrap">
          <div className="w-full">
            <h1>{e.branch.location}</h1>
          </div>
          <div className="w-full gap-2 flex">
            {e.seats[0].ticket.map((te, ti) => {
              const time = new Date(te.time);
              return (
                <button>{time.getHours() + ":" + time.getMinutes()}</button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
