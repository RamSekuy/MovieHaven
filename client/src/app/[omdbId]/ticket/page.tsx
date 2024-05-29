"use client"

import { useState } from 'react';
import BranchSelector from '@/app/_components/ticketComponent/BranchSelector';
import TimeSelector from '@/app/_components/ticketComponent/TimeSelector';
import SeatSelector from '@/app/_components/ticketComponent/SeatSelector';

const Home = () => {
  const [branch, setBranch] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  const handleSeatsSelect = (selectedSeats: string[], total: number) => {
    setSeats(selectedSeats);
    setTotal(total);
  };

  const handlePayment = () => {
    // Implementasi logika pembayaran di sini
    alert(`Pembayaran berhasil. Total: $${total}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Ticket Booking</h1>
      <BranchSelector onSelect={setBranch} />
      <TimeSelector onSelect={setTime} />
      <SeatSelector onSelect={handleSeatsSelect} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p>Branch: {branch}</p>
        <p>Time: {time}</p>
        <p>Seats: {seats.join(', ')}</p>
        <p>Total: ${total}</p>
        <button
          className="mt-4 p-2 bg-green-500 text-white rounded"
          onClick={handlePayment}
          disabled={!branch || !time || seats.length === 0}
        >
          Bayar
        </button>
      </div>
    </div>
  );
};

export default Home;
