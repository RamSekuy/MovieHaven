"use client";
import { useEffect, useState } from "react";
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
import BuyTicketButton from "./buyTicketButton";
import { ITicket } from "@/app/_model/ticket.model";

interface Props {
  studios: TBranchTicket[] | ITicket[];
}

export default function TicketSelect({ studios }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [input, setInput] = useState<{ [key: string]: any }>({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const selectTicket = useAppSelector((state) => state.selectTicket);
  useEffect(() => {
    console.log(studios);
  }, [studios]);

  return (
    <>
      {/* TicketList */}
      {studios.map((e1, i) => {
        const e = e1 as TBranchTicket;
        return (
          <TicketCard
            studioId={e.id}
            key={i}
            branch={e.branch}
            studioName={e.studioName}
            tickets={e.seats[0].ticket}
          />
        );
      })}

      {/* SelectSeat Modal */}
      {!selectTicket.time && !selectTicket.studioId ? null : (
        <Modal
          isOpen={selectTicket.studioId && selectTicket.time ? true : false}
          onClose={() => {
            dispatch(setSelectTicket(null));
          }}
        >
          <SeatSelector />
          <div className="flex flex-col items-end space-y-4 p-4">
            <h1 className="text-xl font-semibold">
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
                dispatch(setSelectTicket(undefined));
              }}
            >
              <div className="flex items-center space-x-2">
                <label htmlFor="usePoint">usePoint</label>
                <input
                  id="usePoint"
                  name="usePoint"
                  type="checkbox"
                  onChange={inputHandler}
                />
              </div>
              <input
                onClick={(e) => {
                  selectTicket.tickets.length ? null : e.preventDefault();
                }}
                type="submit"
                value="Checkout"
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
              />
            </BackEndForm>
          </div>
        </Modal>
      )}
    </>
  );
}
