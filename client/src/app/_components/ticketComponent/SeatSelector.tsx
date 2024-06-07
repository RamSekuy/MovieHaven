import mainAPI from "@/app/_lib/mainApi";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";

const p = [
  {
    id: 1,
    movieId: "tt6587046",
    seatId: 1,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 1, studioId: 1, row: "A", number: 1 },
    transactionId: null,
  },
  {
    id: 2,
    movieId: "tt6587046",
    seatId: 2,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 2, studioId: 1, row: "A", number: 2 },
    transactionId: null,
  },
  {
    id: 3,
    movieId: "tt6587046",
    seatId: 3,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 3, studioId: 1, row: "A", number: 3 },
    transactionId: null,
  },
  {
    id: 4,
    movieId: "tt6587046",
    seatId: 4,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 4, studioId: 1, row: "A", number: 4 },
    transactionId: null,
  },
  {
    id: 5,
    movieId: "tt6587046",
    seatId: 5,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 5, studioId: 1, row: "A", number: 5 },
    transactionId: null,
  },
  {
    id: 6,
    movieId: "tt6587046",
    seatId: 6,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 6, studioId: 1, row: "A", number: 6 },
    transactionId: null,
  },
  {
    id: 7,
    movieId: "tt6587046",
    seatId: 7,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seat: { id: 7, studioId: 1, row: "A", number: 7 },
    transactionId: null,
  },
];

const SeatSelector = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<typeof p>([]);
  const selectTicket = useAppSelector((state) => state.selectTicket);
  const { studioId, time } = selectTicket;
  const dispatch = useAppDispatch();
  const ticketPrice = 25000; // Harga tiket per seat
  const fetchSeats = async () => {
    const res = await mainAPI.get(`/ticket/${studioId}`, { params: { time } });
    setSeats(res.data.data);
  };
  useEffect(() => {
    fetchSeats();
  }, [studioId, time]);

  useEffect(() => {
    const total = selectedSeats.length * ticketPrice;
  }, [selectedSeats]);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Select Seats</h2>
      <div className="flex flex-col w-full">
        {getUniqueRows(seats).map((a, aidx) => (
          <>
            <div className="w-full flex flex-nowrap" key={aidx}>
              {seats.map((e, i) => {
                const booked = e.transactionId;
                const selected =
                  selectTicket.tickets.findIndex((te) => te.id == e.id) + 1;
                return (
                  e.seat.row == a && (
                    <button
                      disabled={Boolean(booked)}
                      key={e.id}
                      onClick={(event) => {
                        const selectedTickets = selected
                          ? selectTicket.tickets.filter((te) => te.id !== e.id)
                          : [...selectTicket.tickets, e];
                        dispatch(
                          setSelectTicket({
                            ...selectTicket,
                            tickets: selectedTickets,
                          })
                        );
                      }}
                      className={`p-2 border rounded w-[50px] ${
                        booked
                          ? "bg-gray-500"
                          : selected
                          ? "bg-red-600"
                          : "bg-green-400"
                      }`}
                    >
                      {e.seat.row + String(e.seat.number)}
                    </button>
                  )
                );
              })}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;

{
  /* <button
            key={seat}
            className={`p-2 border rounded`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </button> */
}

function getUniqueRows(data: typeof p) {
  const uniqueRows = new Set();

  data.forEach((item) => {
    uniqueRows.add(item.seat.row);
  });

  return Array.from(uniqueRows);
}
