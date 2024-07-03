import { User } from "./user";

export interface Event {
  id: number;
  name: string;
  date: string;
  start: string;
  end: string;
  pic: string; //link from cloudinary
  organization: string;
  location: string;
  description: string;
  isFree: boolean;
  category: EventCategory;
  user: User;
  ticketTypes: TicketType[];
  lowestTicketPrice: number; //to be calculated in the backend
  highestTicketPrice: number; //to be calculated in the backend
}

export interface EventCategory {
  id: number;
  name: string;
}

export interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  eventId: number;
}
