"use client";

import React, { useEffect, useState } from "react";
import Seat from "./Seat"; // Adjust the import path as needed

type TSeat = {
  studioId: number;
  row: string;
  number: number;
};

interface TTicket {
  price: number;
  movieId: number;
  seatId: number;
  time: Date;
  seat: TSeat;
  transactionId?: number;
}

const SeatLayout: React.FC = () => {
  const [tickets, setTickets] = useState<TTicket[]>([]);
  async function fetchTicket() {
    const res = await fetch("http://localhost:7000/ticket/1/");
    const data = await res.json();
    setTickets(data.data);
  }
  useEffect(() => {
    fetchTicket();
  }, []);

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
