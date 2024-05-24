"use client";

<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> 0e3f1e53bf4726e4a1f9afa887b2f94d7afc6a21
import React, { useState } from "react";

interface SeatProps {
  seatNumber: string;
  isReserved: boolean;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isReserved = false }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!isReserved) {
      setSelected(!selected);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-12 h-12 m-2 flex rounded-md items-center justify-center border cursor-pointer ${
        isReserved
          ? "bg-gray-400 cursor-not-allowed"
          : selected
          ? "bg-green-500"
          : "bg-blue-500"
      }`}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
