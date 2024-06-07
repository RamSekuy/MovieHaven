"use client";
import { useState } from "react";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import { ChangeEvent } from "react";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import TicketCard from "@/app/_components/ticketComponent/ticketCard";
import mainAPI from "@/app/_lib/mainApi";
import Modal from "@/app/_components/ticketComponent/Modal";
import SeatSelector from "./SeatSelector";
import { useAppSelector, useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";
import { useRouter } from "next/navigation";

interface Props {
  studios: TBranchTicket[];
}

export default function TicketSelect({ studios }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const selectTicket = useAppSelector((state) => state.selectTicket);

  return (
    <>
      {/* TicketList */}
      {studios.map((e, i) => (
        <TicketCard
          studioId={e.id}
          key={i}
          location={e.branch.location}
          tickets={e.seats[0].ticket}
        />
      ))}

      {/* SelectSeat Modal */}
      {!selectTicket.time && !selectTicket.studioId ? null : (
        <Modal
          isOpen={selectTicket.studioId && selectTicket.time ? true : false}
          onClose={() => {
            dispatch(setSelectTicket(null));
          }}
        >
          <SeatSelector />
          <div className="flex flex-col justify-end text-end item-center">
            <h1>
              Total:{" "}
              {selectTicket.tickets
                .reduce((p, n) => p + n.price, 0)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
            </h1>
            <BackEndForm
              action="/transaction/t1"
              method="post"
              data={{
                type: "online",
                userId: 1,
                pointsUsed: input.usePoint,
                ticketIds: selectTicket.tickets,
              }}
              onSuccess={(res) => {
                router.push(`/checkOut/${res.data.data.invoiceNum}`);
              }}
            >
              <label htmlFor="usePoint">usePoint</label>
              <input
                id="usePoint"
                name="usePoint"
                type="checkbox"
                onChange={inputHandler}
              />
              <input type="submit" value="Checkout" />
            </BackEndForm>
          </div>
        </Modal>
      )}
    </>
  );
}
