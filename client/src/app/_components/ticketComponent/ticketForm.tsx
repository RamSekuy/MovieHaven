"use client";
import { useState } from "react";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { ChangeEvent } from "react";
import { ITicket } from "@/app/_model/ticket.model";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import TicketCard from "@/app/_components/ticketComponent/ticketCard";
import mainAPI from "@/app/_lib/mainApi";
import Modal from "@/app/_components/ticketComponent/Modal";
import SeatSelector from "./SeatSelector";

interface Props {
  studios: TBranchTicket[];
}

export default function TicketSelect({ studios }: Props) {
  console.log(studios);
  const [input, setInput] = useState<{ [key: string]: any }>({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const [modal, setModal] = useState<
    { studioId: number; time: Date } | undefined
  >(undefined);
  const [seats, setSeats] = useState();
  return (
    <>
      {/* TicketList */}
      {studios.map((e, i) => (
        <TicketCard
          studioId={e.id}
          modalState={[modal, setModal]}
          key={i}
          location={e.branch.location}
          tickets={e.seats[0].ticket}
        />
      ))}

      {/* SelectSeat Modal */}
      {modal && (
        <Modal
          isOpen={Boolean(modal)}
          onClose={() => {
            setModal(undefined);
          }}
        >
          
          <SeatSelector studioId={modal.studioId} time={modal.time} />
        </Modal>
      )}
    </>
  );
}
