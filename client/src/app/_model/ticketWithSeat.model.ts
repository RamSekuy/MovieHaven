import { ITicket } from "./ticket.model";
import { ISeat } from "./seat.model";

export interface ITicketWithSeat extends ITicket {
  seat: ISeat;
}

export interface ISeatWithTickets extends ISeat {
  tickets: ITicket[];
}
