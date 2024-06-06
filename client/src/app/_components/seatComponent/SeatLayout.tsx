"use client";
import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import mainAPI from "@/app/_lib/mainApi";
import ITicket from "@/app/_model/ticket.model";


type prop = {
  studioId: number;
  time: Date;
};
const SeatLayout: React.FC = ({ studioId, time }: prop) => {
  const [tickets, setTickets] = useState(<ITicket[]|null>(null))
  async function fetchTicket() {
    const data = await mainAPI.get(`ticket/${studioId}`, { params: { time } });
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    fetchTicket();
  }, [studioId, time]);

  const seatMap = tickets.reduce((acc: any, ticket: TTicket) => {
    const { row, number } = ticket.seat;
    if (!acc[row]) acc[row] = [];
    acc[row].push({ ...ticket, seatNumber: `${row}${number}` });
    return acc;
  }, {} as { [key: string]: Array<TTicket & { seatNumber: string }> });

  return (
    <div className="w-full p-4">
      <div className="w-full bg-black text-white text-center rounded-full">
        Screen
      </div>
      <div className="w-full">
        {Object.keys(seatMap)
          .reverse()
          .map((row) => (
            <div key={row} className="flex mb-4">
              {seatMap[row].map((ticket: TTicket & { seatNumber: string }) => (
                <Seat
                  key={ticket.seatId}
                  seatNumber={ticket.seatNumber}
                  isReserved={Boolean(ticket.transactionId)}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeatLayout;
