import Modal from "@/app/_components/ticketComponent/Modal";
import mainAPI from "@/app/_lib/mainApi";
import { Metadata } from "next";
import { formatToRupiah } from "@/app/_utils/formatToRupiah";
import TicketSelect from "@/app/_components/ticketComponent/ticketForm";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: {
    omdbId: string;
  };
}): Promise<Metadata> => {
  const result = (await mainAPI("/movie/" + params.omdbId)).data.data;
  result == null ? redirect("/movieNotFound") : null;
  return {
    title: result.title,
  };
};

type Props = {
  params: {
    omdbId: string;
  };
};

const TicketPage = async ({ params }: Props) => {
  const response = await mainAPI.get(`/ticket/movie/${params.omdbId}`);
  const tickets: TBranchTicket[] = response.data.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Ticket Booking</h1>
      {tickets.length ? (
        <TicketSelect studios={tickets}></TicketSelect>
      ) : (
        <h1>No Ticket Available</h1>
      )}
    </div>
  );
};

export default TicketPage;

{
  /* <div>
        <BranchSelector onSelect={setBranch} />
        <TimeSelector onSelect={setTime} />
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Pilih Kursi
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SeatSelector
            bookedSeats={bookedSeats}
            onSelect={handleSeatsSelect}
          />
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Tutup
          </button>
        </Modal>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>Branch: {branch}</p>
          <p>Time: {time}</p>
          <p>Seats: {seats.join(", ")}</p>
          <p>Total: {formatToRupiah(total)}</p>
          <button
            className="mt-4 p-2 bg-green-500 text-white rounded"
            onClick={handlePayment}
            disabled={!branch || !time || seats.length === 0}
          >
            Bayar
          </button>
        </div>
      </div> */
}
