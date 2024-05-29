import { FC, useState, useEffect } from 'react';

interface SeatSelectorProps {
  onSelect: (seats: string[], total: number) => void;
}

const SeatSelector: FC<SeatSelectorProps> = ({ onSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const seats = Array.from({ length: 30 }, (_, i) => `Seat ${i + 1}`);
  const ticketPrice = 100; // Harga tiket per seat

  const handleSeatClick = (seat: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  useEffect(() => {
    const total = selectedSeats.length * ticketPrice;
    onSelect(selectedSeats, total);
  }, [selectedSeats, onSelect]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Select Seats</h2>
      <div className="grid grid-cols-6 gap-2 mt-2">
        {seats.map((seat) => (
          <button
            key={seat}
            className={`p-2 border rounded ${selectedSeats.includes(seat) ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
