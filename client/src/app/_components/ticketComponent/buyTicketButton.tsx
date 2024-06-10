"use client";

import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { setSelectTicket } from "@/app/_lib/redux/slices/selectTicket.slice";

type Props = {
  time: string;
  studioId: number;
};

export default function BuyTicketButton({ time, studioId }: Props) {
  const userLocale = navigator.language || "en-US";
  const dispatch = useAppDispatch();
  return (
    <button
      title={`${time}`}
      onClick={(e) => {
        dispatch(setSelectTicket({ time, studioId, selectTicket: [] }));
      }}
      className="p-1 sm:p-2 hover:bg-blue-200 text-white hover:text-black bg-blue-600 border-black border-2 rounded-md"
    >
      {new Date(time).toLocaleTimeString(userLocale, {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </button>
  );
}
