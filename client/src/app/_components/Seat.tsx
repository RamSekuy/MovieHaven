"use client"

import React, { useState } from 'react';

interface SeatProps {
  seatNumber: string;
  isReserved: boolean;
  onClick: (seatNumber: string) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isReserved, onClick }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!isReserved) {
      setSelected(!selected);
      onClick(seatNumber);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-12 h-12 m-2 flex rounded-md items-center justify-center border cursor-pointer ${
        isReserved ? 'bg-gray-400 cursor-not-allowed' : selected ? 'bg-green-500' : 'bg-blue-500'
      }`}
    >
      {seatNumber}
    </div>
  );
};

export default Seat;
