import Modal from "@/app/_components/ticketComponent/Modal";
import mainAPI from "@/app/_lib/mainApi";
import { Metadata } from "next";
import { formatToRupiah } from "@/app/_utils/formatToRupiah";
import TicketSelect from "@/app/_components/ticketComponent/ticketSelect";
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
        <TicketSelect buttonType="userBuy" studios={tickets}></TicketSelect>
      ) : (
        <h1>No Ticket Available</h1>
      )}
    </div>
  );
};

export default TicketPage;
