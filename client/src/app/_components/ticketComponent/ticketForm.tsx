"use client";
import { useState } from "react";
import SeatSelector from "@/app/_components/ticketComponent/SeatSelector";
import BranchSelector from "@/app/_components/ticketComponent/BranchSelector";
import TimeSelector from "@/app/_components/ticketComponent/TimeSelector";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { ChangeEvent } from "react";
import { ITicket } from "@/app/_model/ticket.model";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import TicketCard from "@/app/_components/ticketComponent/ticketCard";
import mainAPI from "@/app/_lib/mainApi";
import Modal from "@/app/_components/ticketComponent/Modal"

interface Props {
  branches: TBranchTicket[];
}

export default function TicketSelect({ branches }: Props) {
  const [input, setInput] = useState<{ [key: string]: any }>({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const [modal, setModal] = useState<{ isActive: boolean; data: any }>({
    isActive: false,
    data: undefined,
  });
  const [seats, setSeats] = useState();
  return (
    <>
      {/* TicketList */}
      {branches.map((e, i) => (
        <TicketCard
          modalState={[modal, setModal]}
          key={i}
          location={e.branch.location}
          tickets={e.seats[0].ticket}
        />
      ))}

      {/* SelectSeat Modal */}
      <Modal isOpen={modal.isActive} onClose={()=>{setModal({...modal,isActive:false})}}>
        <input type="text" />
      </Modal>
    </>
  );
}
