"use client";
import TicketSelect from "@/app/_components/ticketComponent/ticketSelect";
import { useEffect, useState } from "react";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import mainApi from "@/app/_lib/mainApi";

export default function Page() {
  const [tickets, setTicket] = useState<TBranchTicket[]>([]);
  const [filter, setFilter] = useState<{
    omdbid?: string;
    time?: string;
    branch?: string;
  }>({});
  const ticketFetching = async () => {
    const response = await mainApi.get(`/ticket`, { params: filter });
    const tickets: TBranchTicket[] = response.data.data;
    setTicket(tickets);
  };
  useEffect(() => {
    ticketFetching();
  }, [filter]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ticket list</h1>
      {tickets.length ? (
        <TicketSelect buttonType="adminEdit" studios={tickets} />
      ) : (
        <h1>No Ticket Available</h1>
      )}
    </div>
  );
}
