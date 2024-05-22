"use client";

import React, { useState } from "react";
import Seat from "./Seat";

const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 5;
const rows2 = ["A", "B", "C", "D", "E"];
const seatsPerRow2 = 5;

const SeatLayout: React.FC = () => {
  const reservedSeats = [
    "A1",
    "B2",
    "C3",
    "D4",
    "E5",
    "E6",
    "D7",
    "C8",
    "B9",
    "A10",
  ]; // Example reserved seats
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full items-center h-12 mb-2">
        <div className="bg-gray-500 w-full  text-center  text-white px-4 py-2 rounded-md">
          Screen
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-center  space-x-2">
        <div>
          {rows.map((row) => (
            <div key={row} className="flex mb-2 items-center">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = `${row}${i + 1}`;
                return (
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    isReserved={reservedSeats.includes(seatNumber)}
                    onClick={handleSeatClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className=" flex w-20% h-full text-gray-600 items-center justify-center rotate-90">
          <span>Access</span>
        </div>
        <div>
          {rows2.map((row) => (
            <div key={row} className="flex mb-2 items-center">
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNumber = `${row}${i + 6}`;
                return (
                  <Seat
                    key={seatNumber}
                    seatNumber={seatNumber}
                    isReserved={reservedSeats.includes(seatNumber)}
                    onClick={handleSeatClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
